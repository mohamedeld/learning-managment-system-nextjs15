
import Navbar from "@/components/Navbar";
import { ReactNode } from "react"


const ConsumerLayout = ({children}:Readonly<{children:ReactNode}>) => {
  return (
    <>
    <Navbar/>
    {children}</>
  )
}

export default ConsumerLayout;


