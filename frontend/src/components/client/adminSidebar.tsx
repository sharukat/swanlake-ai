"use client";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ADMIN_LINKS } from "@/lib/constants";
import { IconHome } from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Card, CardHeader, CardBody, PressEvent } from "@heroui/react";

export default function SidebarAdmin() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (e: PressEvent, href: string) => {
    // e.preventDefault();
    router.push(href);
  };

  return (
    <Sidebar open={open} setOpen={setOpen} animate={false}>
      <SidebarBody className="justify-between gap-10 pl-5 pt-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          <Logo />
          <div className="mt-8 flex flex-col gap-2">
            {ADMIN_LINKS.map((link) => (
              <Card
                key={link.href}
                onPress={(e) => handleNavigation(e, link.href)}
                isPressable
              >
                <CardHeader>
                  <SidebarLink key={link.href} link={link} />
                </CardHeader>
                <CardBody>Hello World</CardBody>
              </Card>
            ))}
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <IconHome />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-extrabold whitespace-pre text-black dark:text-white"
      >
        Home Page
      </motion.span>
    </Link>
  );
};
