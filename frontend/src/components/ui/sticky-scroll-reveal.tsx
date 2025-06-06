"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type StickyScrollItemProps = {
  item: {
    title: string;
    description: string;
  };
  index: number;
  activeCard: number;
  onInView: (index: number) => void;
};

const StickyScrollItem = ({
  item,
  index,
  activeCard,
  onInView,
}: StickyScrollItemProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, {
    margin: "-50% 0px -50% 0px",
    amount: "some",
  });

  useEffect(() => {
    if (isInView) {
      onInView(index);
    }
  }, [isInView, index, onInView]);

  return (
    <div key={item.title + index} ref={ref} className="my-20">
      <motion.h2
        animate={{ opacity: activeCard === index ? 1 : 0.3 }}
        className="text-2xl md:text-4xl font-bold text-slate-600"
      >
        {item.title}
      </motion.h2>
      <motion.p
        animate={{ opacity: activeCard === index ? 1 : 0.3 }}
        className="text-xl mt-10 text-slate-900"
      >
        {item.description}
      </motion.p>
    </div>
  );
};

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <motion.div
      className="relative flex h-full max-h-[95%] justify-center space-x-10 overflow-y-scroll rounded-md p-10"
      ref={ref}
    >
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <StickyScrollItem
              key={item.title + index}
              item={item}
              index={index}
              activeCard={activeCard}
              onInView={setActiveCard}
            />
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        className={cn(
          "sticky max-w-lg top-[25%] hidden h-80 w-80 overflow-hidden rounded-3xl lg:block",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
