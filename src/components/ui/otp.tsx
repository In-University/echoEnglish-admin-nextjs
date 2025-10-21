import * as React from "react"
import { OTPInput as OTPInputPrimitive, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

const OTPInput = React.forwardRef<
  React.ElementRef<typeof OTPInputPrimitive>,
  React.ComponentPropsWithoutRef<typeof OTPInputPrimitive>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInputPrimitive
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
OTPInput.displayName = "OTPInput"

const OTPInputGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
))
OTPInputGroup.displayName = "OTPInputGroup"

const OTPInputSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputContext = React.useContext(OTPInputContext) as any
  const { char, hasFakeCaret, isActive } = inputContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-10 h-10 text-sm flex items-center justify-center border-y border-r border-input bg-background first:rounded-l-md first:border-l last:rounded-r-md",
        "transition-all",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-0.5 animate-pulse bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
OTPInputSlot.displayName = "OTPInputSlot"

const OTPInputSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot className="h-4 w-4" />
  </div>
))
OTPInputSeparator.displayName = "OTPInputSeparator"

export { OTPInput, OTPInputGroup, OTPInputSlot, OTPInputSeparator }
