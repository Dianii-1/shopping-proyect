import { auth } from "@/auth";
import { Title } from "@/components";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div>
      <Title title="Perfil" />
      <pre>{JSON.stringify(session!.user, null, 2)}</pre>
      <p className="text-5xl mt-4">{session!.user.role}</p>
    </div>
  );
}
