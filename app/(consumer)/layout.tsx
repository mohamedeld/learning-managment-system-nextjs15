import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { ReactNode } from "react"


const ConsumerLayout = ({children}:Readonly<{children:ReactNode}>) => {
  return (
    <>
    <Navbar/>
    {children}</>
  )
}

export default ConsumerLayout;


function Navbar(){
    return (
        <header className="flex h-12 shadow bg-background z-10">
            <nav className="flex gap-4 container">
                <Link href={"/"} className="mr-auto flex items-center text-lg hover:underline px-2">Learning15</Link>
                <SignedIn>
                    <Link className="hover:bg-accent/10 flex items-center px-2" href={"/courses"}>My Courses</Link>
                    <Link className="hover:bg-accent/10 flex items-center px-2" href={"/purchases"}>Purchases History</Link>
                </SignedIn>
            </nav>
        </header>
    )
}