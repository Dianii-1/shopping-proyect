// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;

import { getPaginatedOrders, getPaginatedUsers } from "@/actions";
import { Title } from "@/components";
import { UsersTable } from "@/components/users/UsersTable";
import { redirect } from "next/navigation";

export default async function () {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) redirect("/auth/login");

  return (
    <>
      <Title title="Usuarios registrados" />

      <div className="mb-10">
        <UsersTable users={users} />
      </div>
    </>
  );
}
