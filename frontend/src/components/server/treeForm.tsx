import React from "react";
import ImageUpload from "@/components/client/imageUpload";
import {
  Input,
  Textarea,
  Select,
  SelectItem,
  NumberInput,
} from "@heroui/react";
import { TREE_CONDITIONS, TREE_TYPES } from "@/lib/constants";
import ImagePicker from "../client/imagePicker";
import FormSubSkelton from "./formSubSkelton";

type Props = {
  image: string;
};

export default function TreeForm({ image }: Props) {
  return (
    <FormSubSkelton title="Trees Observation">
      <div className="flex flex-col gap-5 w-full">
        <div className="grid grid-cols-2 gap-5 w-full">
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
            label="Tree Type"
            placeholder="Select the tree type"
            name="tree_type"
          >
            {TREE_TYPES.map((category) => (
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

          <Input
            label="Tree Crown Shape"
            name="tree_crown_shape"
            placeholder="Enter the tree crown shape"
            type="text"
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

          <Input
            label="Presence of Fruits/Nuts"
            name="fruits_nuts_presence"
            placeholder="Fruits or Nuts presence"
            type="text"
          />
        </div>
        <div className="flex xs:flex-col flex-row gap-5 w-full">
          <div className="flex flex-col gap-5 w-full">
            <Textarea
              label="Bark Characteristics"
              name="tree_bark_characteristics"
              placeholder="Enter the tree crown shape"
            />

            <Textarea
              required
              label="Leaf Needle Notes"
              name="leaf_needle_note"
              placeholder="Enter a note about the leaf and needle"
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
