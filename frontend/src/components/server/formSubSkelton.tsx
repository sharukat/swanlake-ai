import React, { ReactNode } from "react"

type Props = {
    children: ReactNode,
    title: string
}

export default function FormSubSkelton({ children, title }: Props) {
    return (
        <div className="flex flex-col gap-5 border rounded-2xl p-5 relative w-full">
            <span className="absolute -top-3 left-4 px-2 text-sm font-medium bg-white text-gray-600">
                {title}
            </span>
            {children}
        </div>
    );
}