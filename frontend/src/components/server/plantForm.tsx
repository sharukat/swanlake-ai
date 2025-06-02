import React from "react";
import ImageUpload from "@/components/client/imageUpload";
import {
    Input,
    Textarea,
    Select,
    SelectItem,
    NumberInput,
} from "@heroui/react";
import { PLANT_TYPES, TREE_CONDITIONS } from "@/lib/constants";
import ImagePicker from "../client/imagePicker";
import FormSubSkelton from "./formSubSkelton";

type Props = {
    image: string;
};

export default function PlantForm({ image }: Props) {
    return (
        <FormSubSkelton title="Plants Observation">
            <div className="flex flex-col gap-5 w-full">
                <div className="grid grid-cols-2 gap-5 w-full">
                    <Input
                        isRequired
                        errorMessage="Please enter a name"
                        label="Plant Name"
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

                    <Input
                        label="Plant Type"
                        name="plant_type"
                        placeholder="Enter the plant type"
                        type="text"
                    />

                    <Select
                        isRequired
                        label="Plant Stage"
                        placeholder="Select the plant stage"
                        name="plant_stage"
                    >
                        {PLANT_TYPES.map((category) => (
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

                    <Select
                        isRequired
                        label="Plant Condition"
                        placeholder="Select the plant condition"
                        name="plant_condition"
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
                        name="plant_height"
                        label="Plant Height"
                        placeholder="Enter the height"
                        formatOptions={{
                            style: "unit",
                            unit: "meter",
                            unitDisplay: "short",
                        }}
                    />
                </div>
                <div className="flex xs:flex-col flex-row gap-5 w-full">
                    <div className="flex flex-col gap-5 w-full">
                        <Input
                            label="Flower Color"
                            name="flower_color"
                            placeholder="Enter the color of the flower"
                            type="text"
                        />

                        <Input
                            label="Leaf Shape"
                            name="leaf_shape"
                            placeholder="Enter the shape of the leaf"
                            type="text"
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
