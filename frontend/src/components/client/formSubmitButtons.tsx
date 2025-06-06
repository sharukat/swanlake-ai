"use client";

import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { addToast } from "@heroui/react";

export default function FormSubmitButtons() {
  const { pending } = useFormStatus();

  return (
    <div className="w-full bg-slate-700 shadow-xl/30 border border-slate-700 rounded-3xl p-4 z-50 ">
      <div className="flex gap-2 items-center justify-end">
        <button
          className="font-semibold bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full"
          type="submit"
          disabled={pending}
          onClick={() => {
            if (!pending) {
              addToast({
                title: "Success",
                description: "Data stored successfully",
                color: "success",
                radius: "full",
              });
            }
          }}
        >
          {pending ? "Submitting.." : "Submit"}
        </button>
        <button
          type="reset"
          className="font-semibold bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-full"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
