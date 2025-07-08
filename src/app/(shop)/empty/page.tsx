import Link from "next/link";
import { IoCartOutline } from "react-icons/io5"

export default function () {
  return (
    <div className="flex gap-5 justify-center items-center h-[800px]">
      <IoCartOutline size={80} />
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-xl font-semibold">Tu carrito está vacío</h1>
        <Link href={'/'} className="text-blue-500 text-4xl">Regresar</Link>
      </div>
    </div>
  );
}