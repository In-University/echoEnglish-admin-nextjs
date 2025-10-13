import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "success" | "destructive" | "secondary" }) {
  const variants = {
    default: "bg-indigo-100 text-indigo-700",
    success: "bg-green-100 text-green-700",
    destructive: "bg-red-100 text-red-700",
    secondary: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
