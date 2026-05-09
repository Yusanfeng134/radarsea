"use client";

import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";

type ContactSalesButtonProps = Omit<ButtonProps, "onClick" | "children"> & {
  children?: React.ReactNode;
};

export function ContactSalesButton({
  children = "联系销售",
  variant = "secondary",
  size = "md",
  ...props
}: ContactSalesButtonProps) {
  return (
    <Button
      {...props}
      variant={variant}
      size={size}
      onClick={() => console.log("contact-sales")}
    >
      {children}
    </Button>
  );
}
