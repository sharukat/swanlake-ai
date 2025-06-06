import React from "react";
import Image from "next/image";


export const LayoutGrid = ({ cards }: { cards: string[] }) => {

  return (
    <div className="w-full p-5 flex flex-col mx-auto gap-4 relative">
      {cards.map((card, i) => (
        <div key={i} className="w-full aspect-square">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={card}
              alt="thumbnail"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-xl"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
