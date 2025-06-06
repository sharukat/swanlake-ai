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
          <div className="mt-8 flex flex-col gap-5">
            {ADMIN_LINKS.map((link) => (
              <Card
                key={link.href}
                onPress={(e) => handleNavigation(e, link.href)}
                isPressable
                className="bg-slate-600"
              >
                <CardHeader>
                  <SidebarLink key={link.href} link={link} />
                </CardHeader>
                <CardBody className="text-sm text-white">{link.body}</CardBody>
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
      className="relative flex items-center space-x-3 py-1 justify-center"
    >
      <IconHome className="text-lg text-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold text-white text-lg"
      >
        Home Page
      </motion.span>
    </Link>
  );
};
