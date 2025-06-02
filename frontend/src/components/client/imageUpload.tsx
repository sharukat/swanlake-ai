"use client";

import React, { useRef, useContext } from "react";
import { Button } from "@heroui/button";
import Context from "@/contexts/formContext";

interface ImageProps {
  name: string;
  label: string;
}

export default function ImageUpload({ name, label }: ImageProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const context = useContext(Context);

  function handleImageUpload() {
    imageInputRef.current?.click();
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      context.setImage(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <input
        type="file"
        id={name}
        name={name}
        accept="image/png, image/jpeg, image/jpg"
        ref={imageInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      <Button
        type="button"
        className="w-2/4 max-w-sm"
        color="primary"
        radius="full"
        onPress={handleImageUpload}
      >
        {label}
      </Button>
    </div>
  );
}
