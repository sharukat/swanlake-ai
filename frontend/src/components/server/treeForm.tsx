import React from "react";
import ImageUpload from "@/components/client/imageUpload";
import {
  Input,
  Textarea,
  Select,
  SelectItem,
  NumberInput,
} from "@heroui/react";
import { TREE_CONDITIONS } from "@/lib/constants";
import ImagePicker from "../client/imagePicker";
import FormSubSkelton from "./formSubSkelton";

type Props = {
  image: string;
};

export default function TreeForm({ image }: Props) {
  return (
    <FormSubSkelton title="Plants Observation">
      <div className="flex xs:flex-col flex-row gap-5 w-full">
        <div className="flex flex-col gap-5 w-full">
          <Input
            isRequired
            errorMessage="Please enter a name"
            label="Tree Name"
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

          <Select
            isRequired
            label="Plant Type"
            placeholder="Select the plant type"
            name="plant_type"
          >
            {TREE_CONDITIONS.map((category) => (
              <SelectItem key={category.key} textValue={category.label}>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-sm">{category.label}</h3>
                  <p className="text-sm text-gray-700">
                    {category.description}
                  </p>
                </div>
              </SelectItem>
            ))}
          </Select>

          <NumberInput
            isRequired
            defaultValue={0}
            name="tree_height"
            label="Tree Height"
            placeholder="Enter the height"
            formatOptions={{
              style: "unit",
              unit: "meter",
              unitDisplay: "short",
            }}
          />

          <NumberInput
            isRequired
            defaultValue={0}
            name="trunk_diameter"
            label="Trunk Diameter"
            placeholder="Enter the diameter"
            formatOptions={{
              style: "unit",
              unit: "centimeter",
              unitDisplay: "short",
            }}
          />

          <Select
            isRequired
            label="Tree Condition"
            placeholder="Select condition of the tree"
            name="tree_condition"
          >
            {TREE_CONDITIONS.map((category) => (
              <SelectItem key={category.key} textValue={category.label}>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-sm">{category.label}</h3>
                  <p className="text-sm text-gray-700">
                    {category.description}
                  </p>
                </div>
              </SelectItem>
            ))}
          </Select>

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
