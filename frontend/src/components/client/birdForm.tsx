"use client";

import React, { useContext } from "react";
import { CATEGORIES } from "@/lib/constants";
import ImageUpload from "@/components/client/imageUpload";
import Context from "@/contexts/imageContext";
import { Camera } from "lucide-react";
import {
  Form,
  Input,
  Button,
  Select,
  SelectItem,
  NumberInput,
  Textarea,
} from "@heroui/react";
import Image from "next/image";

export default function BirdForm() {
  const { image, setImage } = useContext(Context);

  return (
    <div className="flex flex-col gap-5 border rounded-2xl p-5 relative w-full">
      <span className="absolute -top-3 left-4 px-2 text-sm font-medium bg-white text-gray-600">
        Bird Observation
      </span>
      <div className="flex flex-row gap-5 w-full">
        <div className="flex flex-col gap-5 w-full">
          <Input
            isRequired
            errorMessage="Please enter a name"
            label="Bird Name"
            name="common_name"
            placeholder="Enter the name"
            type="text"
          />

          <Input
            label="Scientific Name"
            name="scientific_name"
            placeholder="Enter the scientific name (if known)"
            type="text"
          />

          <NumberInput
            isRequired
            defaultValue={1}
            label="Count observed"
            placeholder="Enter the amount"
          />

          <Textarea
            required
            label="Bird Behavior"
            placeholder="Briefly explain the behavior of the bird"
          />
        </div>

        <div className="flex flex-col gap-5 w-full items-center justify-center">
          {/* IMAGE_PICKER */}
          <div className="flex flex-col justify-start">
            <div className="aspect-square w-64 border border-gray-300 rounded-lg relative overflow-hidden">
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

          <ImageUpload name="image" label="Upload Image" />
        </div>
      </div>
    </div>
  );
}
