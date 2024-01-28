"use client";

import { useFormStatus } from "react-dom";
import { Icons } from "@/components/icnos";
import { Button } from "@/components/ui/button";

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-44 px-2 bg-emerald-500 text-white hover:bg-emerald-600">
      <div className="w-full flex items-center gap-2">
        <div className={`${pending ? '' : 'invisible'}`}>
          <Icons.loaderC size={16} className="animate-spin" />
        </div>
        <p>Create an event</p>
      </div>
    </Button>
  );
};
