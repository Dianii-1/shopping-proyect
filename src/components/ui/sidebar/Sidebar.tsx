"use client";
import { logout } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useUiStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

export const Sidebar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeMenu = useUiStore((state) => state.closeSideMenu);
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  const handleLogout = async () => {
    await logout();
    window.location.reload();
    closeMenu();
  };

  return (
    <div>
      {/* black background */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}
      {/* blur */}
      {isSideMenuOpen && (
        <div
          onClick={() => closeMenu()}
          className="fixed top-0 left-0 w-screen h-screen z-10 backdrop-blur-xs backdrop-filter"
        />
      )}
      {/* sidemenu */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          { "translate-x-full": !isSideMenuOpen }
        )}
      >
        <IoCloseOutline
          size={30}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeMenu()}
        />

        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded px-10 py-1 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menú */}

        {isAuthenticated && (
          <>
            <Link
              href={"/profile"}
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPersonOutline size={30} />
              <span className={`${titleFont.className} ml-3 text-lg`}>
                Perfil
              </span>
            </Link>

            <Link
              href={"/orders"}
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className={`${titleFont.className} ml-3 text-lg`}>
                Ordenes
              </span>
            </Link>

            <button
              // href={"/"}
              className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={() => {
                // logout();
                // closeMenu();
                handleLogout();
              }}
            >
              <IoLogOutOutline size={30} />
              <span className={`${titleFont.className} ml-3 text-lg`}>
                Salir
              </span>
            </button>
          </>
        )}

        {!isAuthenticated && (
          <Link
            href={"/auth/login"}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => closeMenu()}
          >
            <IoLogInOutline size={30} />
            <span className={`${titleFont.className} ml-3 text-lg`}>
              Ingresar
            </span>
          </Link>
        )}

        {isAdmin && (
          <>
            {/* line separator */}

            <div className="w-full h-px bg-gray-200 my-10" />

            <Link
              href={"/"}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoShirtOutline size={30} />
              <span className={`${titleFont.className} ml-3 text-lg`}>
                Productos
              </span>
            </Link>

            <Link
              href={"/admin/orders"}
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className={`${titleFont.className} ml-3 text-lg`}>
                Ordenes
              </span>
            </Link>

            <Link
              href={"/admin/users"}
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPeopleOutline size={30} />
              <span className={`${titleFont.className} ml-3 text-lg`}>
                Usuarios
              </span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
