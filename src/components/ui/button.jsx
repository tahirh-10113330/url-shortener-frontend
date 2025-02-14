import * as React from "react";
import { cn } from "../lib/utils";

const Button = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
    
    const variants = {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-blue-600 bg-white text-black hover:bg-blue-700",
        danger: "mx-2 bg-red-500 text-white hover:bg-red-600"
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition",
                variants[variant],
                className
            )}
            ref={ref}
            {...props}
        />
    );
});

Button.displayName = "Button";

export { Button };
