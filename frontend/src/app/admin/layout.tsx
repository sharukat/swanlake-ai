import "../globals.css";
import SidebarAdmin from "@/components/client/adminSidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row h-screen w-full overflow-hidden">
      <SidebarAdmin />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
