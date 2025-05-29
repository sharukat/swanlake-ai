import React from "react";
import ImageUpload from "@/components/client/imageUpload";
import { Input, Textarea, Select, SelectItem } from "@heroui/react";
import { PLANT_TYPES } from "@/lib/constants";
import ImagePicker from "../client/imagePicker";
import FormSubSkelton from "./formSubSkelton";

type Props = {
    image: string
}

export default function PlantForm({ image }: Props) {
    return (
        <FormSubSkelton title="Plants Observation">
            <div className="flex flex-row gap-5 w-full">
                <div className="flex flex-col gap-5 w-full">
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

                    <Select
                        isRequired
                        label="Plant Type"
                        placeholder="Select the plant type"
                        name="plant_type"
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
