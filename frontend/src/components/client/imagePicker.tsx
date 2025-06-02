import React from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

type ImageProps = {
    image: string
}

export default function ImagePicker({ image }: ImageProps) {
    return (
          <div className="flex flex-col justify-start">
            <div className="aspect-square w-72 border border-gray-300 rounded-lg relative overflow-hidden">
              {!image && (
                <div className="flex flex-col items-center justify-center h-full">
                  <Camera className="w-8 h-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    No image picked yet.
                  </p>
                </div>
              )}
              {image && (
                <Image
                  fill
                  alt="Selected image"
                  src={image}
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </div>
          </div>
    );
}