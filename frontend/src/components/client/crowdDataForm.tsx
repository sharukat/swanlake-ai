"use client";

import React, { useState } from "react";
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
  DatePicker,
} from "@heroui/react";
import Image from "next/image";

export default function CrowdDataForm() {
  const [image, setImage] = useState<string>("");

  // const getNatureGroup = (category: string) => {
  //   switch (category) {
  //     // case "plants":
  //     //     return natureGroup.plant;
  //     case "birds":
  //       return NATURE_GROUPS.birds || [];
  //     // case "animals":
  //     //     return natureGroup.animal;
  //     default:
  //       return [];
  //   }
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Context.Provider value={{ image, setImage }}>
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
          <div className="grid sm-grid-cols-1 grid-cols-2 gap-5">
            <Select
              isRequired
              label="Input Category"
              placeholder="Select a category"
              name="category"
              //   value={selectedCategory}
              //   onChange={handleCategoryChange}
            >
              {CATEGORIES.map((category) => (
                <SelectItem key={category.key}>{category.label}</SelectItem>
              ))}
            </Select>

            <Input
              isRequired
              errorMessage="Please enter a name"
              label="Bird/Plant/Animal Name"
              name="common_name"
              placeholder="Enter the name"
              type="text"
            />
          </div>

          <div className="grid sm-grid-cols-1 grid-cols-2 gap-5">
            <Input
              label="Scientific Name"
              name="scientific_name"
              placeholder="Enter the scientific name (if known)"
              type="text"
            />

            <DatePicker
              isRequired
              label="Observed date"
              name="observed_date"
            />
          </div>

          <div className="grid sm-grid-cols-1 grid-cols-2 gap-5">
            <NumberInput
              isRequired
              defaultValue={1}
              label="Count observed"
              placeholder="Enter the amount"
            />
          </div>

          <ImageUpload name="image" label="Upload Image" />

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
        </div>

        {/* <div className="flex flex-col gap-2 w-full pt-5">
          <Accordion variant="shadow">
            <AccordionItem
              key="1"
              aria-label="Advanced"
              subtitle="Add more details if known (optional)"
              title="Advanced Data"
            >
              <div className="flex flex-col gap-2">
                <Select
                  isRequired
                  className="max-w-xs"
                  selectionMode="multiple"
                  label="Nature Counts Grouping"
                  placeholder="Select a category"
                  labelPlacement="outside"
                  name="nature_group"
                  value={selectedNatureGroups}
                  isDisabled={!getNatureGroup(selectedCategory).length}
                  onChange={handleNatureGroupChange}
                >
                  {getNatureGroup(selectedCategory).map((category) => (
                    <SelectItem key={category.key}>{category.label}</SelectItem>
                  ))}
                </Select>
              </div>
            </AccordionItem>
          </Accordion> */}
        {/* </div> */}

        <div className="flex gap-2">
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
