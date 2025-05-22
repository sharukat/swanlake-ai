import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { DASHBOARD_CONTENT } from "@/lib/constants";

export default function Home() {
  return (
    <section
      key="home"
      className="w-full flex flex-col items-center justify-center px-auto mb-10"
    >
      <div className="h-screen w-full max-w-[90%] relative overflow-y-auto">
        <StickyScroll content={DASHBOARD_CONTENT} />
      </div>
    </section>
  );
}
