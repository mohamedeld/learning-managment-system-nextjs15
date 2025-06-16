
import { env } from "@/data/env/server"
import { deleteUser, insertUser, updateUser } from "@/features/users/db/users"
import { syncClerkUserMetadata } from "@/services/clerk"
import { WebhookEvent } from "@clerk/nextjs/server"
import { headers } from "next/headers"
import { Webhook } from "svix"

export async function POST(req: Request) {
  const headerPayload = await headers()
  const svixId = headerPayload.get("svix-id")
  const svixTimestamp = headerPayload.get("svix-timestamp")
  const svixSignature = headerPayload.get("svix-signature")

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(env.CLERK_WEBHOOKS_SECRET_KEY);

  let event: WebhookEvent

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error occurred", {
      status: 400,
    })
  }
  console.log("event ",event)
  switch (event.type) {
    case "user.created":
    case "user.updated": {
      const email = event.data.email_addresses.find(
        email => email.id === event.data.primary_email_address_id
      )?.email_address
      const name = `${event.data.first_name} ${event.data.last_name}`.trim()
      if (email == null) return new Response("No email", { status: 400 })
      if (name === "") return new Response("No name", { status: 400 })
console.log("📥 Creating user in DB with Clerk ID:", event.data.id);
      if (event.type === "user.created") {
          console.log("📥 Creating user in DB with Clerk ID:", event.data.id);

        const user = await insertUser({
          clerkUserId: event.data.id,
          email,
          name,
          imageUrl: event.data.image_url,
          role: event.data.public_metadata?.role ?? "user"
,
        })
        if (user) {
          await syncClerkUserMetadata(user)
        }
      } else {
        await updateUser(
          { clerkUserId: event.data.id },
          {
            email,
            name,
            imageUrl: event.data.image_url,
            role: event.data.public_metadata.role,
          }
        )
      }
      break;
    }
    case "user.deleted": {
      if (event.data.id != null) {
        await deleteUser({ clerkUserId: event.data.id })
      }
      break
    }
  }

  return new Response("User added", { status: 200 })
}