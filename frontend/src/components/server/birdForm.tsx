import React from "react";
import ImageUpload from "@/components/client/imageUpload";
import { Input, NumberInput, Textarea } from "@heroui/react";
import ImagePicker from "../client/imagePicker";
import FormSubSkelton from "./formSubSkelton";

type Props = {
  image: string;
};

export default function BirdForm({ image }: Props) {
  return (
    <FormSubSkelton title="Birds Observation">
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
            name="bird_count"
            label="Count observed"
            placeholder="Enter the amount"
          />

          <Textarea
            required
            label="Observation Note"
            name="observation_note"
            placeholder="Enter a note about the observation"
          />
        </div>

        <div className="flex flex-col gap-5 w-full items-center justify-center">
          <ImagePicker image={image} />
          <ImageUpload name="image" label="Upload Image" />
        </div>
      </div>
    </FormSubSkelton>
  );
}
