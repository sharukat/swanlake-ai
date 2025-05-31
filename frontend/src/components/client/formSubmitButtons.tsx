"use client";

import React, { useEffect } from "react";
import { useFormStatus } from "react-dom";

export default function FormSubmitButtons() {
  const { pending } = useFormStatus();

  useEffect(() => {
    console.log("Form pending status:", pending);
  }, [pending]);

  return (
    <div className="fixed bottom-0 xs:w-[25vw] sm:w-[65vw] w-[75vw] bg-slate-700 shadow-xl/30 border rounded-t-2xl p-4 z-50 ">
      <div className="flex gap-2 items-center justify-end">
        <button
          className="font-semibold bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full"
          type="submit"
          disabled={pending}
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
