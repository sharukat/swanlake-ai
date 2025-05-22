import "../globals.css";
import { Button } from "@heroui/react";
import { DASHBOARD_MENU } from "@/lib/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden items-center">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <p className="relative z-20 bg-gradient-to-b from-neutral-500 to-neutral-900 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
        Dashboard
      </p>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-5 mb-10 max-w-7xl px-auto">
        {DASHBOARD_MENU.map((button, index) => (
          <Button
            key={index}
            as={Link}
            href={button.href}
            radius="full"
            className="w-full text-base text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300"
          >
            {button.name}
          </Button>
        ))}
      </div>
      <main className="flex w-full overflow-auto">{children}</main>
    </div>
  );
}
