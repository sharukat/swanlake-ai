"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Card,
  Button,
  Listbox,
  ListboxItem,
  CardBody,
  Image,
} from "@heroui/react";
import React, { useState, useContext } from "react";
import Context from "@/contexts/context";

interface AppCardProps {
  imagePath: string;
  buttonName: string;
}

export default function AppCard({ imagePath, buttonName }: AppCardProps) {
  const context = useContext(Context);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [collection, setCollection] = useState<string>(() => {
    return "";
  });
  const [button, setButton] = useState<string>(() => {
    return "name";
  });

  const handlePress = async (buttonName: string) => {
    if (buttonName === "Explore Birds") {
      setCollection("birds");
      await context.fetchNames("birds");
    } else if (buttonName === "Explore Plants") {
      setCollection("plants");
      await context.fetchNames("plants");
    } else {
      console.error("Invalid button name");
    }
    onOpen();
  };

  const handleItemPress = async (name: string) => {
    context.setStatus(true);
    context.setResponse([]);
    context.setName("");
    context.setImages([]);
    onClose();
    await context.generate(collection, name);
    context.setName(name);
  };

  return (
    <div className="flex flex-col">
      <Card
        isBlurred
        className="border-none bg-background/60 max-w-[610px]"
        radius="lg"
        isPressable
        onPress={() => handlePress(buttonName)}
      >
        <CardBody className="absolute z-10 flex flex-col items-center justify-center">
          <h4 className="text-white font-medium text-4xl">{buttonName}</h4>
        </CardBody>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 object-cover opacity-50"
          height={200}
          src={imagePath}
          width={200}
        />
      </Card>
      <Drawer backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                <p className="text-2xl font-semibold">Select an Item</p>
                <p className="font-light">
                  Below is a list of {collection} found in Swanlake Park. Click
                  on any to get more information.
                </p>
                <div className="flex flex-row items-center justify-center gap-4 pt-5">
                  <Button
                    color="primary"
                    variant="flat"
                    onPress={() => setButton("name")}
                  >
                    Explore by Name
                  </Button>
                  <Button
                    color="primary"
                    variant="flat"
                    onPress={() => setButton("image")}
                  >
                    Explore by Image
                  </Button>
                </div>
              </DrawerHeader>
              <DrawerBody>
                {button === "name" && (
                  <Listbox aria-label="Actions">
                    {context.names.map((name) => (
                      <ListboxItem
                        key={name}
                        onPress={() => handleItemPress(name)}
                      >
                        {name}
                      </ListboxItem>
                    ))}
                  </Listbox>
                )}

                {button === "image" && (
                  <div className="flex flex-col items-center">
                    {/* <FileUpload onChange={handleFileUpload} /> */}
                    {/* <Button
                      className="max-w-3xl"
                      radius="full"
                      color="primary"
                      isDisabled={files.length === 0}
                    >
                      Upload Image
                    </Button> */}
                  </div>
                )}
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
