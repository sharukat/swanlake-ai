"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@heroui/react";

export default function FormSubmitButtons() {
  const { pending } = useFormStatus();
  return (
    <div className="fixed bottom-0 w-[75vw] bg-slate-700 shadow-xl/30 border rounded-t-2xl p-4 z-50">
      <div className="flex gap-2 items-center justify-end">
        <Button
          color="warning"
          type="submit"
          radius="full"
          isLoading={pending}
          isDisabled={pending}
        >
          {pending ? "Submitting..." : "Submit"}
        </Button>
        <Button type="reset" variant="faded" radius="full">
          Reset
        </Button>
      </div>
    </div>
  );
}
