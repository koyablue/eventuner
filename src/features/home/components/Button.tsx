import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type Props = {
  href: string
  className?: string
  children?: ReactNode
};

export const LinkButton = ({ href, className, children }: Props) => {
  return (
    <Button className={`w-32 p-0 flex items-center justify-center ${className}`}>
      <Link
        href={href}
        className="flex items-center justify-center p-4 w-full h-full"
      >
        {children}
      </Link>
    </Button>
  );
};
