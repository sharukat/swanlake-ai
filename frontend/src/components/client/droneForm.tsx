"use client";

import React, { useState } from "react";
import ImageUpload from "@/components/client/imageUpload";
import Context from "@/contexts/formContext";
import { Camera } from "lucide-react";
import {
  Form,
  Input,
  Button,
  DatePicker,
} from "@heroui/react";
import Image from "next/image";

export default function DroneDataForm() {
  const [image, setImage] = useState<string>("");
  const [userLocation, setUserLocation] = useState<{
      latitude: number;
      longitude: number;
    } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Context.Provider value={{ image, setImage, userLocation, setUserLocation }}>
      <Form
        className="w-full flex flex-col gap-4"
        onReset={() => {
          //   setAction("reset");
          //   setFiles([]);
          //   setSelectedCategory("");
          //   setSelectedNatureGroups([]);
        }}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="flex flex-col gap-5 w-full">

            <Input
              isRequired
              className="max-w-lg"
              errorMessage="Please enter a name"
              label="Footage Identification Name"
              name="footage_name"
              placeholder="Enter the name"
              type="text"
            />

            <DatePicker
              isRequired
              className="max-w-lg"
              label="Captured Date"
              name="captured_date"
            />

          <ImageUpload name="image" label="Upload Image" />

          {/* IMAGE_PICKER */}
          <div className="flex flex-col items-start justify-center">
            <div className="aspect-square xs:w-56 w-80 border border-gray-300 rounded-lg relative overflow-hidden">
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
        </div>

        <div className="flex gap-2 justify-start">
          <Button color="primary" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="flat">
            Reset
          </Button>
        </div>
      </Form>
    </Context.Provider>
  );
}
