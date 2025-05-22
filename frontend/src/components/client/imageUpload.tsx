"use client";

import React, { useRef, useContext } from "react";
import { Button } from "@heroui/button";
import Context from "@/contexts/imageContext";

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
    <>
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
        variant="bordered"
        className="max-w-xs"
        color="primary"
        onPress={handleImageUpload}
      >
        {label}
      </Button>
    </>
  );
}
