"use client";

import React, { useContext } from "react";
import Context from "@/contexts/formContext";
import { Input, Button, DatePicker } from "@heroui/react";
import { FaLocationArrow } from "react-icons/fa";
import { now, getLocalTimeZone } from "@internationalized/date";
import FormSubSkelton from "@/components/server/formSubSkelton";

export default function ObserverInfo() {
  const { userLocation, setUserLocation } = useContext(Context);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setUserLocation({ latitude, longitude });
        },

        (error) => {
          console.error("Error get user location: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  };

  return (
    <FormSubSkelton title="Observer Details">
      <div className="flex xs:flex-col flex-row gap-5 items-center justify-center">
        <Input
          isRequired
          errorMessage="Please enter the first name"
          label="First Name"
          name="first_name"
          placeholder="Enter your name"
          type="text"
        />
        <Input
          isRequired
          errorMessage="Please enter the last name"
          label="Last Name"
          name="last_name"
          placeholder="Enter your name"
          type="text"
        />
      </div>

      <div className="flex flex-row gap-5 items-center justify-center">
        <DatePicker
          hideTimeZone
          showMonthAndYearPickers
          visibleMonths={2}
          defaultValue={now(getLocalTimeZone())}
          label="Observation Date & Time"
          name="observed_date"
          errorMessage="Please select a date"
        />
      </div>

      <div className="flex xs:flex-col flex-row gap-5 items-center justify-center">
        <Input
          readOnly
          label="Latitude"
          name="latitude"
          value={userLocation?.latitude?.toString() || ""}
        />
        <Input
          readOnly
          label="Longitude"
          name="longitude"
          value={userLocation?.longitude?.toString() || ""}
        />
        <Button
          variant="flat"
          radius="full"
          color="primary"
          className="px-10"
          startContent={<FaLocationArrow />}
          onPress={getUserLocation}
        >
          Get Location
        </Button>
      </div>
    </FormSubSkelton>
  );
}
