"use client";
import { changeUserRole } from "@/actions";
import { User } from "@/interfaces";
import clsx from "clsx";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  users: User[];
}
export const UsersTable = ({ users }: Props) => {
  return (
    <table className="min-w-full">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Email
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Nombre completo
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Rol
          </th>
          {/* <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Actualizar rol
          </th> */}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {user.email}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {user.name}
            </td>
            <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <select
                name=""
                id=""
                value={user.role}
                onChange={(e) => changeUserRole(user.id, e.target.value)}
                className="w-full p-2 text-sm text-gray-900 outline-0 border border-gray-200 rounded-md"
              >
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
              </select>
            </td>
            {/* <td className="text-sm text-gray-900 font-light px-6 ">
              <Link href={`/orders/${order.id}`} className="hover:underline">
                Ver orden
              </Link>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
