"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  onClickHandler: () => void
  children?: ReactNode
};

export const ReloadButton = ({ onClickHandler, children }: Props) => {
  return (
    <Button
      onClick={onClickHandler}
      className="bg-emerald-500 hover:bg-emerald-500/85 active:bg-emerald-500/85"
    >
      {children}
    </Button>
  );
};
