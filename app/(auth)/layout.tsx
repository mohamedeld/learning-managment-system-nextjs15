import { ReactNode } from "react"

const AuthLayout = ({children}:Readonly<{
    children:ReactNode
}>) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">{children}</div>
  )
}

export default AuthLayout