import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
// import UrlShortener from "./components/UrlShortener";
import LandingPage from "./components/LandingPage";


function App() {

	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				{/* <Route path="/url-shortener" element={<UrlShortener />} /> */}
			</Routes>
		</Router>
	);
}

export default App;
