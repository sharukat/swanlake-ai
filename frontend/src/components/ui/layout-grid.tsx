"use client";

import React from "react";
import Image from "next/image";


export const LayoutGrid = ({ cards }: { cards: string[] }) => {

  return (
    <div className="w-[80%] p-10 grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto gap-4 relative">
      {cards.map((card, i) => (
        <div key={i} className="w-full h-64 md:h-80">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={card}
              alt="thumbnail"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
