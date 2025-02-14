import * as React from "react";

const Select = ({ children, onValueChange, value }) => {
    return (
        <select
            className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
        >
            {children}
        </select>
    );
};

const SelectItem = ({ value, children }) => (
    <option value={value}>{children}</option>
);

export { Select, SelectItem };
