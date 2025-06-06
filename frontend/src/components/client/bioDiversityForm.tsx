"use client";

import React, { useState } from "react";
import Context from "@/contexts/formContext";
import { Tabs, Tab } from "@heroui/react";
import ObserverInfo from "./observerForm";
import BirdForm from "../server/birdForm";
import PlantForm from "../server/plantForm";
import TreeForm from "../server/treeForm";
import { shareBioDiversityData } from "@/actions/formSubmissions";
import FormSubmitButtons from "./formSubmitButtons";

export default function CrowdDataForm() {
  const [image, setImage] = useState<string>("");
  const [selected, setSelected] = React.useState<string>("birds");
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const handleSelectionChange = (key: React.Key) => {
    setSelected(key as string);
  };

  return (
    <Context.Provider
      value={{ image, setImage, userLocation, setUserLocation }}
    >
      <div className="min-h-screen flex flex-col w-full">
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          <form
            className="w-full flex flex-col gap-4 items-center justify-center p-4"
            action={async (formData) => {
              await shareBioDiversityData(formData)

              setImage("");
              setUserLocation(null);
            }}
            onReset={() => {
              setImage("");
              setUserLocation(null);
            }}
          >
            <ObserverInfo />
            <input hidden name="type" defaultValue={selected} />
            <Tabs
              aria-label="Options"
              selectedKey={selected}
              onSelectionChange={handleSelectionChange}
              radius="full"
              color="primary"
              variant="bordered"
            >
              <Tab key="birds" title="Birds" className="w-full">
                <BirdForm image={image} />
              </Tab>

              <Tab key="trees" title="Trees" className="w-full">
                <TreeForm image={image} />
              </Tab>

              <Tab key="plants" title="Plants" className="w-full">
                <PlantForm image={image} />
              </Tab>
            </Tabs>
            <div className="h-24 w-full"></div>
            <FormSubmitButtons />
          </form>
        </div>
      </div>
    </Context.Provider>
  );
}
