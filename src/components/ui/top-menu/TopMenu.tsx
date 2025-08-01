"use client";
import { titleFont } from "@/config/fonts";
import { useUiStore } from "@/store";
import Link from "next/link";
import React from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* logo */}

      <div>
        <Link href={"/"}>
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span>| Shop</span>
        </Link>
      </div>

      {/* content menu */}

      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href={"/gender/men"}
        >
          Hombres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href={"/gender/women"}
        >
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href={"/gender/kid"}
        >
          Niños
        </Link>
      </div>

      {/* search,cart,menu */}

      <div className="flex items-center gap-2">
        <Link href={"/search"}>
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href={"/cart"}>
          <div className="relative">
            <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
              3
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button
          className="p-2 rounded-md transition-all hover:bg-gray-100"
          onClick={() => openMenu()}
        >
          Menú
        </button>
      </div>
    </nav>
  );
};
