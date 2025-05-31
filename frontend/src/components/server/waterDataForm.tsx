import React from "react";
import ImageUpload from "@/components/client/imageUpload";
import { NumberInput, Textarea } from "@heroui/react";
import ImagePicker from "../client/imagePicker";
import FormSubSkelton from "./formSubSkelton";

type Props = {
  image: string;
};

export default function WaterDataForm({ image }: Props) {
  return (
    <FormSubSkelton title="Water Quality Observations">
      <div className="flex xs:flex-col flex-row gap-5 w-full">
        <div className="flex flex-col gap-5 w-full">
          <NumberInput
            isRequired
            defaultValue={0}
            name="water_temperature"
            label="Water Temperature"
            placeholder="Enter the value"
            endContent={
              <div className="flex items-center">
                <p className="outline-none border-0 bg-transparent text-default-400 text-small">
                  Celcius
                </p>
              </div>
            }
          />

          <NumberInput
            isRequired
            defaultValue={0}
            name="dissolved_oxygen_mgl"
            label="Dissolved Oxygen"
            placeholder="Enter the value"
            endContent={
              <div className="flex items-center">
                <p className="outline-none border-0 bg-transparent text-default-400 text-small">
                  Celcius
                </p>
              </div>
            }
          />

          <NumberInput
            isRequired
            defaultValue={0}
            name="dissolved_oxygen_mgl"
            label="Dissolved Oxygen Saturation Percentage"
            placeholder="Enter the value"
            formatOptions={{
              style: "percent",
            }}
          />

          <NumberInput
            isRequired
            defaultValue={0}
            name="ph"
            label="pH Value"
            placeholder="Enter the value"
            endContent={
              <div className="flex items-center">
                <p className="outline-none border-0 bg-transparent text-default-400 text-small">
                  Celcius
                </p>
              </div>
            }
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
