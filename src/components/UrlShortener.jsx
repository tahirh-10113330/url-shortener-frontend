// import { useState, useEffect } from "react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { Card, CardContent } from "./ui/card";
// import LogoutButton from "./LogoutButton";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
// import { Copy, Loader2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// const verifyToken = 'http://localhost:5400/api/auth/verify'
// export default function UrlShortener() {

//     const navigate = useNavigate();
//     let token = '';
//     useEffect(() => {

//         const params = new URLSearchParams(window.location.search);
//         token = params.get("token");

//         if (token) {

//             // async function getUser(){
				
// 			// 	let user = await fetch(verifyToken, {method: "GET", headers:{
// 			// 		"Content-Type": "application/json",
//         	// 		"Authorization": `Bearer ${token}` // Include auth token if needed
// 			// 	}});

// 			// 	let data = await user.json();

// 			// 	if(!data?.success){
// 			// 		navigate("/");
//             //         return;
// 			// 	}

//             //     localStorage.setItem("authToken", token);
// 			// 	localStorage.setItem("username", data?.user?.displayName || '');
// 			// 	localStorage.setItem("user_email", data?.user?.email || '');
// 			// 	return user;
// 			// }

// 			// getUser();

//         } else {
//             navigate("/");
//             return
//         }
//     }, []);

//     const [longUrl, setLongUrl] = useState("");
//     const [customAlias, setCustomAlias] = useState("");
//     const [topic, setTopic] = useState("");
//     const [shortUrl, setShortUrl] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const shortenUrl = async () => {

//         if (!longUrl) return;
//         setLoading(true);
//         try {
//             const response = await fetch("http://localhost:5400/api/shorten", {
//                 method: "POST",
//                 headers: { 
//                     "Content-Type": "application/json",
//                     "Authorization": `bearer ${token}`
//                 },
//                 body: JSON.stringify({ longUrl: longUrl, customAlias: customAlias || '', topic })
//             });
//             const data = await response.json();
//             setShortUrl(data.shortUrl);
//         } catch (error) {
//             console.error("Error shortening URL:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
//             <Card className="w-full max-w-md p-4 shadow-lg">
//                 <CardContent>
//                     <h1 className="text-2xl font-bold text-center mb-4">URL Shortener</h1>
//                     <div className="flex flex-col gap-2">
//                         <Input
//                             type="url"
//                             placeholder="Enter long URL"
//                             value={longUrl}
//                             onChange={(e) => setLongUrl(e.target.value)}
//                             className="flex-1"
//                         />
//                         <Input
//                             type="text"
//                             placeholder="Custom Alias (Optional)"
//                             value={customAlias}
//                             onChange={(e) => setCustomAlias(e.target.value)}
//                             className="flex-1"
//                         />
//                         <Select onValueChange={setTopic} defaultValue="">
//                             <SelectTrigger>
//                                 <SelectValue placeholder="Select Topic (Optional)" />
//                             </SelectTrigger>
//                             <SelectContent className="z-50">  {/* Ensure dropdown appears correctly */}
//                                 <SelectItem value="tech">Technology</SelectItem>
//                                 <SelectItem value="news">News</SelectItem>
//                                 <SelectItem value="education">Education</SelectItem>
//                                 <SelectItem value="entertainment">Entertainment</SelectItem>
//                             </SelectContent>
//                         </Select>

//                         <Button onClick={shortenUrl} disabled={loading}>
//                             {loading ? <Loader2 className="animate-spin" /> : "Shorten"}
//                         </Button>
//                     </div>
//                     {shortUrl && (
//                         <div className="mt-4 flex justify-between items-center p-2 bg-gray-200 rounded-lg">
//                             <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 break-all">
//                                 {shortUrl}
//                             </a>
//                             <Button size="icon" onClick={() => navigator.clipboard.writeText(shortUrl)}>
//                                 <Copy size={16} />
//                             </Button>
//                         </div>
//                     )}
//                 </CardContent>
//             </Card>
//             <Card>
//                 <LogoutButton/>
//             </Card>
//         </div>
//     );
// }
