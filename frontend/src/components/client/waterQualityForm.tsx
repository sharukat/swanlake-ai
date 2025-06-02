"use client";

import React, { useState } from "react";
import Context from "@/contexts/formContext";
import ObserverInfo from "./observerForm";
import WaterDataForm from "../server/waterDataForm";
import { shareWaterQualityData } from "@/actions/formSubmissions";
import FormSubmitButtons from "./formSubmitButtons";

export default function WaterQualityForm() {
  const [image, setImage] = useState<string>("");
  const [selected, setSelected] = React.useState<string>("birds");
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // const handleSelectionChange = (key: React.Key) => {
  //   setSelected(key as string);
  // };

  return (
    <Context.Provider
      value={{ image, setImage, userLocation, setUserLocation }}
    >
      <div className="min-h-screen flex flex-col w-full">
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          <form
            className="w-full flex flex-col gap-4 items-center justify-center p-4"
            action={shareWaterQualityData}
            onReset={() => {
              setImage("");
              setUserLocation(null);
            }}
          >
            <ObserverInfo />
            <WaterDataForm image={image} />
            <div className="h-24 w-full"></div>
            <FormSubmitButtons />
          </form>
        </div>
      </div>
    </Context.Provider>
  );
}
