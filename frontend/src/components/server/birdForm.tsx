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
      <div className="flex flex-col gap-5 w-full">
        <div className="grid grid-cols-2 gap-5 w-full">
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
        </div>
        <div className="flex xs:flex-col flex-row gap-5 w-full">
          <div className="flex flex-col gap-5 w-full">
            <NumberInput
              isRequired
              defaultValue={1}
              name="bird_count"
              label="Count observed"
              placeholder="Enter the amount"
            />

            <Textarea
              label="Bird Behavior"
              name="bird_behavior"
              placeholder="Enter the bird behavior"
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
          </div>
        </div>
      </div>
      <ImageUpload name="image" label="Upload Image" />
    </FormSubSkelton>
  );
}
