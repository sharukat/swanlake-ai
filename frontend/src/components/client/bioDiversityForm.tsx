"use client";

import React, { useState } from "react";
import Context from "@/contexts/imageContext";
import { Form, Tabs, Tab, Card, CardBody } from "@heroui/react";
import ObserverInfo from "./observerForm";
import BirdForm from "../server/birdForm";
import PlantForm from "../server/plantForm";
import { shareBirdData } from "@/actions/formSubmissions";
import FormSubmitButtons from "./formSubmitButtons";

export default function CrowdDataForm() {
  const [image, setImage] = useState<string>("");
  const [selected, setSelected] = React.useState<string>("birds");

  const handleSelectionChange = (key: any) => {
    setSelected(key as string);
  };

  return (
    <Context.Provider value={{ image, setImage }}>
      <Form
        className="w-full flex flex-col gap-4 items-center justify-center"
        action={shareBirdData}
        onReset={() => {
          //   setAction("reset");
          //   setFiles([]);
          //   setSelectedCategory("");
          //   setSelectedNatureGroups([]);
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

          <Tab key="trees" title="Trees">
            <Card>
              <CardBody>Example</CardBody>
            </Card>
          </Tab>

          <Tab key="plants" title="Plants" className="w-full">
            <PlantForm image={image} />
          </Tab>
        </Tabs>

        <FormSubmitButtons />

      </Form>
    </Context.Provider>
  );
}
