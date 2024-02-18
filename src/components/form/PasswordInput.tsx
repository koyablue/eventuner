"use client";

import { LucideProps } from "lucide-react";
import { Input, InputProps } from "@/components/ui/input";
import { Icons } from "@/components/icnos";
import { useToggle } from "@/hooks/useToggle";

type Props = {
  inputProps?: Omit<InputProps, "type">
  iconProps?: LucideProps
};

export const PasswordInput = ({ inputProps, iconProps }: Props) => {
  const { state: isRevealed, toggle } = useToggle();

  return (
    <div className="flex items-center relative">
      <Input
        type={isRevealed ? "text" : "password"}
        className="pr-10 focus-visible:border-emerald-500 focus-visible:ring-0 focus-visible:ring-offset-0"
        {...inputProps}
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-2 text-zinc-500 hover:text-zinc-400"
      >
        {isRevealed ? <Icons.eyeOff {...iconProps} /> : <Icons.eye {...iconProps} />}
      </button>
    </div>
  );
};