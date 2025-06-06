import React from "react";

type Props = {
  title: string;
  children?: React.ReactNode;
};

export default function HeaderText({ title, children }: Props) {
  return (
    <>
      <header className="relative z-10 flex items-center justify-center pb-3 pt-10">
        <h1 className="bg-gradient-to-b from-neutral-600 to-neutral-900 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl">
          {title}
        </h1>
      </header>
      {children}
    </>
  );
}
