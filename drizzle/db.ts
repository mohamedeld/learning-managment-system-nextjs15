import { env } from "@/data/env/server";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres"
export const db = drizzle({
  schema,
  connection: {
    host: "localhost",
    port: 5432,
    database: "lms",
    user: "postgres",
    password: env.DB_PASSWORD,
  },
});
