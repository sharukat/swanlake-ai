"use client";

import React, { useState } from "react";
import Context from "@/contexts/imageContext";
import {
  Form,
  Button,
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@heroui/react";
import ObserverInfo from "./observerForm";
import BirdForm from "./birdForm";

export default function CrowdDataForm() {
  const [image, setImage] = useState<string>("");
  const [selected, setSelected] = React.useState("birds");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Context.Provider value={{ image, setImage }}>
      <Form
        className="w-full flex flex-col gap-4 items-center justify-center"
        onReset={() => {
          //   setAction("reset");
          //   setFiles([]);
          //   setSelectedCategory("");
          //   setSelectedNatureGroups([]);
        }}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <ObserverInfo />

        <Tabs
          aria-label="Options"
          selectedKey={selected}
          // onSelectionChange={setSelected}
          radius="full"
          color="primary"
          variant="bordered"
        >
          <Tab key="birds" title="Birds" className="w-full">
            <BirdForm />
          </Tab>

          <Tab key="trees" title="Trees">
            <Card>
              <CardBody>
                Example
              </CardBody>
            </Card>
          </Tab>

          <Tab key="plants" title="Plants">
            <Card>
              <CardBody>
                Example
              </CardBody>
            </Card>
          </Tab>
        </Tabs>

        <div className="fixed inset-x-0 bottom-0 w-screen bg-slate-100 shadow-xl/30 border rounded-t-2xl p-4 z-50">
          <div className="flex gap-2 items-center justify-end">
            <Button color="warning" type="submit" radius="full">
              Submit
            </Button>
            <Button type="reset" variant="faded" radius="full">
              Reset
            </Button>
          </div>
        </div>
      </Form>
    </Context.Provider>
  );
}
