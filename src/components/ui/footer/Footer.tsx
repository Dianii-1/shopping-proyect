import { titleFont } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
  return (
    <div className="flex gap-4 justify-center text-xs mb-10">
       <Link href={'/'}>
        <span className={`${titleFont.className} antialiased font-bold`}>Teslo </span>
        <span>| shop </span>
        <span>© {new Date().getFullYear()}</span>
       </Link>

       <Link href={'/'}>
       Privacidad & legal
       </Link>

       <Link href={'/'}>
       Ubicaciones
       </Link>
    </div>
  )
}
