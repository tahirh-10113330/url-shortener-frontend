import {useEffect} from "react";


export default function AlertBadge({ message, type, onClose }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); // Hide alert after 2 seconds
        }, 2000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`w-64 px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 text-center text-white text-sm font-semibold ${
                type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
        >
            {message}
        </div>
    );
    
}

