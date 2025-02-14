import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Select, SelectItem } from "./ui/select";
import AlertBadge from "./ui/AlertBadge";
import { Copy, Loader2, Menu, X } from "lucide-react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";

const verifyToken = "http://localhost:5400/api/auth/verify";
// const GOOGLE_CLIENT_ID = "991579762722-7es581odaeovoufo4r3ik3vc18rgk4sg.apps.googleusercontent.com"

export default function UrlShortener() {

    const navigate = useNavigate();
    const [longUrl, setLongUrl] = useState("");
    const [customAlias, setCustomAlias] = useState("");
    const [topic, setTopic] = useState("");
    const [shortUrl, setShortUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const showAlert = (message, type) => {
        setAlert({ message, type });
    };

    const handleGoogleLogin = async (credentialResponse) => {

        try {

            const { credential } = credentialResponse;
            const response = await axios.post(verifyToken, {
                token: credential,
            });

            if (response.data.success) {
                localStorage.setItem("authToken", response?.data?.token);
                localStorage.setItem("user", JSON.stringify(response?.data?.user));
                showAlert("Login successful!", "success");

            } else {
                showAlert("Login failed!", "error");
            }
        } catch (error) {
            showAlert("Google Login Error!", "error");
        }

    };

    const authToken = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user"));

    const shortenUrl = async () => {

        if(!user) return showAlert("You must Login first!", "error");
        if (!longUrl) return showAlert("Long Url Required", "error");
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5400/api/shorten", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
                body: JSON.stringify({ longUrl: longUrl, customAlias: customAlias || "", topic: topic }),
            });
            const data = await response.json();
            setShortUrl(data.shortUrl);

        } catch (error) {
            console.error("Error shortening URL:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleLogout = () => {
        googleLogout();
        localStorage.clear();
        showAlert("Logout Successfully!", "error");
        return navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Navbar */}

            <div className="relative">

                <nav className="bg-white shadow-md px-6 py-4">
                    <div className="container mx-auto flex justify-between items-center">
                        {/* Logo */}
                        <h1 className="text-2xl font-bold text-gray-900">Mini Url</h1>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-6">
                            {user ? (
                                <>
                                    {/* User Profile */}
                                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg shadow border">
                                        <img
                                            src={user.avatar}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full border-2 border-gray-300"
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-sm font-semibold text-gray-800">{user.displayName}</p>
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
                        <div className="md:hidden mt-4 flex flex-col items-center gap-4 p-4">
                            {user ? (
                                <>
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={user.avatar}
                                            alt="Profile"
                                            className="w-12 h-12 rounded-full border-2 border-gray-300"
                                        />
                                        <p className="text-sm font-semibold text-gray-800 mt-2">{user.displayName}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                    <Button variant="danger" className="w-full" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <GoogleLogin
                                    onSuccess={handleGoogleLogin}
                                    onError={() => showAlert("Google Login Failed", "error")}
                                    theme="outline"
                                />
                            )}
                        </div>
                    )}
                </nav>

                {/* Alert Badge Positioned Below Navbar */}
                {alert && (
                    <div className="absolute top-full py-2 right-1 z-50">
                        <AlertBadge message={alert.message} type={alert.type} onClose={() => setAlert(null)} />
                    </div>
                )}
            </div>

            {/* Main Content */}
            {/* Alert Badge */}
            {/* {alert && <AlertBadge message={alert.message} type={alert.type} onClose={() => setAlert(null)} />} */}
            <div className="flex flex-col items-center justify-center flex-grow p-6">
                <Card className="w-full max-w-md p-4 shadow-lg">

                    <CardContent>

                        <h2 className="text-2xl font-bold text-center mb-4">Keep it short!</h2>
                        <div className="flex flex-col gap-2">
                            <Input
                                type="url"
                                placeholder="Enter long URL"
                                value={longUrl}
                                onChange={(e) => setLongUrl(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="Custom Alias (Optional)"
                                value={customAlias}
                                onChange={(e) => setCustomAlias(e.target.value)}
                            />
                            <Select onValueChange={setTopic} value={topic}>
                                <SelectItem value="">Select Topic (Optional)</SelectItem>
                                <SelectItem value="tech">Technology</SelectItem>
                                <SelectItem value="news">News</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="entertainment">Entertainment</SelectItem>
                            </Select>

                            <Button onClick={shortenUrl} disabled={loading}>
                                {loading ? <Loader2 className="animate-spin" /> : "Shorten"}
                            </Button>

                        </div>
                        {shortUrl && (

                            <div className="mt-4 flex justify-between items-center p-2 bg-gray-200 rounded-lg">
                                <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 break-all">
                                    {shortUrl}
                                </a>

                                <Button
                                    size="icon"
                                    onClick={() => {
                                        navigator.clipboard.writeText(shortUrl)
                                        showAlert("Short Link Copied!", "success")
                                    }}>
                                    <Copy size={16} />
                                </Button>

                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
