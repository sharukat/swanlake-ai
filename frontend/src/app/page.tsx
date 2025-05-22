import React from "react";
import { ImagesSliderComp } from "@/components/imageSlider";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/server/bento-grid";
import { BENTOGRID_ITEMS } from "@/lib/constants";
import Navigationbar from "@/components/NavigationBar";
import ChatAssistant from "@/components/client/chatAssistant";

export default function Home() {
  return (
    <section
      key="home"
      className="w-full flex flex-col items-center justify-center px-auto mb-10"
    >
      <Navigationbar />

      <ImagesSliderComp />

      <div className="flex flex-col justify-center items-center mx-auto mt-10">
        <Image
          priority
          alt="logos"
          className="m-5 mx-auto"
          src="/logos.png"
          width={2246}
          height={362}
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "600px",
          }}
        />
      </div>

      <div className="flex flex-col max-w-7xl px-auto p-5">
        <p className="text-gray-600 text-2xl text-center">
          Swan Lake Park is home to a rich diversity of wildlife. Over 30 years,
          Swan Lake Park has evolved from an inactive, obscure gravel pit to the
          centre piece of the thriving Greensborough community. Explore the Swan
          Lake wildlife and learn more about the birds and plants. List all the
          birds and plants and click any to get AI assisted information.
        </p>
      </div>

      <p className="mx-auto mt-10 max-w-xl text-center sm:text-3xl font-semibold tracking-tight text-balance text-gray-950 md:text-4xl">
        Swan Lake Meets Technology
      </p>

      <BentoGrid className="mx-auto md:auto-rows-[20rem] mt-10">
        {BENTOGRID_ITEMS.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
            href={item.href}
          />
        ))}
      </BentoGrid>

      <ChatAssistant />
    </section>
  );
}
