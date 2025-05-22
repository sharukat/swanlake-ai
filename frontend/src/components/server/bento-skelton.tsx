import Image from "next/image";

interface SkeltonProps {
  path: string;
}

export const SKELTON = ({ path }: SkeltonProps) => (
  <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
    <Image
      priority
      alt="Image dropdown card"
      className="object-cover"
      fill
      src={path}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  </div>
);
