import * as React from "react";
import { cn } from "../lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});

Input.displayName = "Input";

export { Input };
