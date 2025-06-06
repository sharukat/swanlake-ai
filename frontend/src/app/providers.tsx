// app/providers.tsx
"use client";

import { useEffect, useState } from "react";
import {HeroUIProvider} from '@heroui/react'
import {ToastProvider} from "@heroui/toast";
import {ThemeProvider } from "next-themes";

export function Providers({children}: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return ( isClient ?
    <HeroUIProvider>
      <ToastProvider placement="top-right" />
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        {children}
      </ThemeProvider>
    </HeroUIProvider> : <></>
  )
}