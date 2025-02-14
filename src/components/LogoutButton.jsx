import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Remove token from localStorage
        navigate("/"); // Redirect to login page
    };

    return (
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-md">
            Logout
        </button>
    );
}
