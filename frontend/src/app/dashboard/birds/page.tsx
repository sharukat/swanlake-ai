"use client";
import React, { useEffect, useState } from "react";
import { useCollections } from "@/hooks/use-collections";
import DrawerButton from "@/components/client/drawer-cards";
import { Spinner, Chip } from "@heroui/react";
import { LayoutImageGrid } from "@/components/ImageGrid";
import Context from "@/contexts/context";
import { SubHeader } from "@/components/server/subHeader";

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
      <section className="w-full flex flex-col items-center justify-center">
        <SubHeader header="Explore with AI" />
        <div className="sticky flex flex-row gap-10 my-5">
          <DrawerButton buttonName="Birds" />
          <DrawerButton buttonName="Plants" />
          <DrawerButton buttonName="Trees" />
        </div>

        <div className="flex flex-col overflow-hidden border rounded-3xl border-gray-300 w-full max-w-[95%] h-[calc(100vh-260px)] p-5 justify-center">
          <div className="flex-1 overflow-y-auto">
            {!status && name === "" && response.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center h-full">
                <div className="text-gray-400 text-6xl mb-2">🔍</div>
                <p className="text-gray-800 font-semibold text-xl">
                  Choose a category above to start exploring
                </p>
                <p className="text-gray-500 text-lg mt-2">
                  Click on Birds, Plants, or Trees to begin
                </p>
              </div>
            )}

            {status && (
              <div className="flex flex-col items-center justify-center h-full">
                <Spinner
                  classNames={{ label: "text-foreground mt-4" }}
                  label="Processing"
                  variant="wave"
                  size="lg"
                />
              </div>
            )}

            {response.length > 0 && images.length > 0 && name !== "" && (
              <div className="flex h-full">
                {/* Left side - Fixed images */}
                <div className="flex flex-col w-1/3 p-5 border-r border-gray-200">
                  <h2 className="font-semibold text-center text-2xl mb-5">
                    {name}
                  </h2>
                  <div className="flex-1 flex items-center justify-center">
                    <LayoutImageGrid />
                  </div>
                </div>

                {/* Right side - Scrollable text */}
                <div className="flex flex-col w-2/3 overflow-y-auto px-10 justify-center">
                  <div className="space-y-6">
                    <div>
                      <Chip color="primary" className="mb-3">
                        Based on Swan Lake Data
                      </Chip>
                      <p className="text-gray-600 text-lg font-light text-justify">
                        {response[0]}
                      </p>
                    </div>

                    <div>
                      <Chip color="primary" className="mb-3">
                        Based on Web Search
                      </Chip>
                      <p className="text-gray-600 text-lg font-light text-justify">
                        {response[1]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Context.Provider>
  );
}
