"use client";

import React, { useContext } from "react";
import { LayoutGrid } from "./server/layout-grid";
import Context from "@/contexts/context";

export function LayoutImageGrid() {
  const context = useContext(Context);
  return <LayoutGrid cards={context.images} />;
}
