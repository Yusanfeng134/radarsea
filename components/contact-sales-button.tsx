"use client";

import * as React from "react";

import { useContactSales } from "@/components/contact-sales-modal";
import { Button, type ButtonProps } from "@/components/ui/button";

type ContactSalesButtonProps = Omit<ButtonProps, "onClick" | "children"> & {
  children?: React.ReactNode;
  /** Where this button lives — passed to analytics on submit */
  source?: string;
};

export function ContactSalesButton({
  children = "联系销售",
  variant = "secondary",
  size = "md",
  source,
  ...props
}: ContactSalesButtonProps) {
  const { open } = useContactSales();
  return (
    <Button
      {...props}
      variant={variant}
      size={size}
      onClick={() => open({ source })}
    >
      {children}
    </Button>
  );
}
