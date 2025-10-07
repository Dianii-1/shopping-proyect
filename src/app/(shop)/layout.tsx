import { Sidebar, TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-h-screen">
      <TopMenu />
      <Sidebar />
      <div className="p-0 sm:px-5">{children}</div>
    </main>
  );
}
