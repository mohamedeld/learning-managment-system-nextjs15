import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { getCurrentUser } from "@/services/clerk";
import { canAccessAdminPages } from "@/permissions/general";

function Navbar(){
    return (
        <header className="flex h-12 shadow bg-background z-10">
            <nav className="flex gap-4 container">
                <Link href={"/"} className="mr-auto flex items-center text-lg hover:underline px-2">Learning15</Link>
                <SignedIn>
                    <AdminLink/>
                    <Link className="hover:bg-accent/10 flex items-center px-2" href={"/courses"}>My Courses</Link>
                    <Link className="hover:bg-accent/10 flex items-center px-2" href={"/purchases"}>Purchases History</Link>
                    <div className="size-8 self-center">
                        <UserButton appearance={{
                            elements:{
                                userButtonAvatarBox:{
                                    width:"100%",
                                    height:"100%"
                                }
                            }
                        }}/>
                    </div>
                </SignedIn>
                <SignedOut>
                    <Button className="self-center" asChild>
                        <Link href="/sign-in">Sign In</Link>
                    </Button>
                </SignedOut>
            </nav>
        </header>
    )
}

export default Navbar;

export async function AdminLink(){
    const user = await getCurrentUser();
    if(!canAccessAdminPages(user)){
        return null;
    }
    return (
        <Link className="hover:bg-accent/10 flex items-center px-2" href={"/admin"}>Admin</Link>
    )
}