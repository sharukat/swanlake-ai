import "../globals.css";
import SidebarAdmin from "@/components/client/adminSidebar";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col h-screen overflow-hidden bg-slate-700 md:flex-row"
      )}
    >
      <SidebarAdmin />
      <main
        className={cn(
          "relative flex-1 my-5 rounded-3xl w-full overflow-y-auto bg-white",
        )}
      >
        {children}
      </main>
    </div>
  );
}
