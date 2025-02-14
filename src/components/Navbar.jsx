import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react"; // For mobile menu icon
import { GoogleLogin } from "@react-oauth/google";

export default function Navbar({ user, handleLogout, handleGoogleLogin, showAlert }) {
    
    console.log('user',user);
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md px-6 py-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-2xl font-bold text-gray-900">Mini Url</h1>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    {user ? (
                        <>
                            {/* User Profile */}
                            <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-lg shadow border">
                                <img
                                    src={user.avatar}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border-2 border-gray-300"
                                />
                                <div className="flex flex-col">
                                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                            </div>

                            {/* Logout Button */}
                            <Button variant="danger" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={() => showAlert("Google Login Failed", "error")}
                            theme="outline"
                            size="large"
                            useOneTap
                        />
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-4 flex flex-col items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-md">
                    {user ? (
                        <>
                            <div className="flex flex-col items-center">
                                <img
                                    src={user.avatar}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full border-2 border-gray-300"
                                />
                                <p className="text-sm font-semibold text-gray-800 mt-2">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                            <Button variant="danger" className="w-full" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button className="w-full" onClick={handleGoogleLogin}>
                            Sign in
                        </Button>
                    )}
                </div>
            )}
        </nav>
    );
}
