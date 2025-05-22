"use client";
import React, { useEffect, useState } from "react";
import { useCollections } from "@/hooks/use-collections";
import AppCard from "@/components/client/drawer-cards";
import { Spinner, Chip } from "@heroui/react";
import { LayoutImageGrid } from "@/components/ImageGrid";
import Context from "@/contexts/context";

export default function BirdsDashboard() {
  const {
    names,
    images,
    setImages,
    response,
    setResponse,
    fetchNames,
    generate,
  } = useCollections();

  const [name, setName] = useState<string>(() => {
    return "";
  });
  const [status, setStatus] = useState<boolean>(() => {
    return false;
  });

  useEffect(() => {
    if (response.length > 0) {
      setStatus(false);
    }
  }, [response]);
  return (
    <Context.Provider
      value={{
        names,
        response,
        setResponse,
        fetchNames,
        generate,
        images,
        setImages,
        name,
        setName,
        status,
        setStatus,
      }}
    >
      <section
        className="w-full flex flex-col items-center justify-center px-auto mb-10 z-20"
      >
        <div className="grid gap-5 grid-cols-2">
          <AppCard imagePath="/bird.jpg" buttonName="Explore Birds" />
          <AppCard imagePath="/plant.jpg" buttonName="Explore Plants" />
        </div>

        <div className="flex flex-col overflow-y-auto mt-5">
          {status && (
            <div className="flex flex-col items-center justify-center">
              <Spinner
                classNames={{ label: "text-foreground mt-4" }}
                label="Processing"
                variant="wave"
                size="lg"
              />
            </div>
          )}

          {name !== "" && (
            <h2 className="font-semibold text-center text-2xl p-5 mt-10">
              {name}
            </h2>
          )}
          {response.length > 0 && (
            <div className="flex flex-col max-w-7xl justify-start p-10 bg-gray-100 rounded-2xl w-full">
              <Chip color="primary">Based on Swan Lake Data</Chip>
              <p className="text-gray-600 text-xl font-light text-justify py-5">
                {response[0]}
              </p>
              <Chip color="primary">Based on Web Search</Chip>
              <p className="text-gray-600 text-xl font-light text-justify py-5">
                {response[1]}
              </p>
            </div>
          )}

          {images.length > 0 && (
            <div className="flex w-full mt-10 items-center justify-center px-auto">
              <LayoutImageGrid />
            </div>
          )}
        </div>
      </section>
    </Context.Provider>
  );
}
