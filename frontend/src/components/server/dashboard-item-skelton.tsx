import Image from "next/image";

interface SkeltonProps {
  path: string;
}

export default function DashboardItemSkelton({ path }: SkeltonProps) {
  return (
    <div className="flex h-full w-full items-center justify-center text-white">
      <Image
        src={path}
        width={300}
        height={300}
        className="h-full w-full object-cover"
        alt="dashboard item skelton"
        priority
      />
    </div>
  );
}
