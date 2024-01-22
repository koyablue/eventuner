import { useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icnos";
import Link from "next/link";

export const EventCreated = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const shareUrlInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = async () => {
    if (!shareUrlInputRef.current) return;

    const text = shareUrlInputRef.current.value;
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);

      // Change icon copied -> copy
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      console.error(error);
      // TODO: error handling
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <div className="pb-4 sm:pt-16">
        <h1 className="text-center text-xl font-semibold text-emerald-500 whitespace-nowrap sm:text-3xl">
          Event Successfully Created!
        </h1>
      </div>

      <div className="flex flex-col text-sm text-muted-foreground sm:items-center sm:text-md lg:flex-row lg:text-lg">
        <p>The event page is ready to be shared!&nbsp;</p>
        <p>You can start inviting people<br className="block sm:hidden" />by sharing the link below.</p>
      </div>

      <div className="w-full sm:w-2/3">
        <div className="flex flex-col space-y-4">
          <div className="relative w-full">
            <Input
              readOnly
              value="https://example.com/events/u/f1357807-b484-45af-a65d-357985b7cfa0"
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              ref={shareUrlInputRef}
            />
            <button
              onClick={handleCopy}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm bg-inherit text-muted-foreground px-2 py-1 rounded hover:bg-muted focus:outline-none"
            >
              {isCopied ? <Icons.check className="text-emerald-500" size={16} /> : <Icons.copy size={16} />}
            </button>
          </div>
        </div>
      </div>
      <Button
        className="bg-emerald-500 hover:bg-emerald-500/85 active:bg-emerald-500/85"
      >
        <Link href="#" className="w-full h-full flex items-center justify-center">Visit event page</Link>
      </Button>
    </div>
  );
};
