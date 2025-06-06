"use client";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import React, { useState } from "react";
import { DASHBOARD_MENU } from "@/lib/constants";

export default function SidebarDashboard() {
  const [open, setOpen] = useState(false);

  return (
    <Sidebar open={open} setOpen={setOpen} animate={true}>
      <SidebarBody className="justify-between gap-10 pl-5 pt-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          <div className="mt-8 flex flex-col gap-5">
            {DASHBOARD_MENU.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

// function SidebarTrigger({
//   className,
//   onClick,
//   ...props
// }: React.ComponentProps<typeof Button>) {
//   const { toggleSidebar } = useSidebar()

//   return (
//     <Button
//       data-sidebar="trigger"
//       data-slot="sidebar-trigger"
//       variant="ghost"
//       size="icon"
//       className={cn("size-7", className)}
//       onClick={(event) => {
//         onClick?.(event)
//         toggleSidebar()
//       }}
//       {...props}
//     >
//       <PanelLeftIcon />
//       <span className="sr-only">Toggle Sidebar</span>
//     </Button>
//   )
// }