"use client";

import React from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import SignInPage from "@/components/server/login";
import { useUser } from "@clerk/nextjs";

export default function Navigationbar() {
  const { isSignedIn } = useUser();

  return (
    <div className="flex justify-center w-full fixed top-0 z-20">
      <Navbar className=" max-w-7xl mt-5 rounded-full bg-background/40 backdrop-blur-xl">
        <NavbarBrand>
          <p className="font-bold text-inherit md:text-lg text-base">
            <Link href="/">Swan Lake</Link>
          </p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem className="text-semibold">
            <Link color="foreground" href="/dashboard">
              Dashboard
            </Link>
          </NavbarItem>

          {isSignedIn && (
            <NavbarItem className="text-semibold">
              <Link color="foreground" href="/admin">
                Admin Panel
              </Link>
            </NavbarItem>
          )}

          <NavbarItem>
            <SignInPage />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
