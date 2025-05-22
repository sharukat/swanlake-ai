"use client";

import React, { useContext } from "react";
import { LayoutGrid } from "./ui/layout-grid";
import Context from "@/contexts/context";


export function LayoutImageGrid() {
    const context = useContext(Context);
    return (
        <div className="w-full max-w-5xl">
            <LayoutGrid cards={context.images} />
        </div>
    );
}

