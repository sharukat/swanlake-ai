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
      <div className="flex flex-col gap-5 w-full">
        <div className="grid grid-cols-2 gap-5 w-full">
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
                  mgL
                </p>
              </div>
            }
          />

          <NumberInput
            isRequired
            defaultValue={0}
            name="dissolved_oxygen_percent"
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
                  pH
                </p>
              </div>
            }
          />

          <NumberInput
            isRequired
            defaultValue={0}
            name="conductivity"
            label="Conductivity"
            placeholder="Enter the value"
            endContent={
              <div className="flex items-center">
                <p className="outline-none border-0 bg-transparent text-default-400 text-small">
                  uScm
                </p>
              </div>
            }
          />

          <NumberInput
            isRequired
            defaultValue={0}
            name="turbidity"
            label="Turbidity"
            placeholder="Enter the value"
            endContent={
              <div className="flex items-center">
                <p className="outline-none border-0 bg-transparent text-default-400 text-small">
                  NTU
                </p>
              </div>
            }
          />

          <NumberInput
            isRequired
            defaultValue={0}
            name="secchi_depth"
            label="Secchi Depth"
            placeholder="Enter the value"
            endContent={
              <div className="flex items-center">
                <p className="outline-none border-0 bg-transparent text-default-400 text-small">
                  cm
                </p>
              </div>
            }
          />

          <NumberInput
            isRequired
            defaultValue={0}
            name="salinity"
            label="Salinity"
            placeholder="Enter the value"
            endContent={
              <div className="flex items-center">
                <p className="outline-none border-0 bg-transparent text-default-400 text-small">
                  ppt
                </p>
              </div>
            }
          />
        </div>
        <div className="flex xs:flex-col flex-row gap-5 w-full">
          <div className="flex flex-col gap-5 w-full">
            <Textarea
              required
              label="Observation Note"
              name="observation_note"
              placeholder="Enter a note about the observation"
            />

            <Textarea
              required
              label="Weather Condition"
              name="weather_condition"
              placeholder="Enter a note about the weather condition"
            />

            <NumberInput
              isRequired
              defaultValue={0}
              name="air_temperature"
              label="Air Temperature"
              placeholder="Enter the value"
              endContent={
                <div className="flex items-center">
                  <p className="outline-none border-0 bg-transparent text-default-400 text-small">
                    Celcius
                  </p>
                </div>
              }
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
