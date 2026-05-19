import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import DegDeathScreen from "./components/deg-death-screen/deg-death-screen";

function App() {
	const [mode, setMode] = useState("dip");
	const [dipContent, setDipContent] = useState(["Deg Dip", "Initializing..."]);

	function reboot() {
		setMode("dip");
		setDipContent([]);
	}

	return (
		<DegDeathScreen reboot={reboot}>
			{mode === "dip" ? (
				<div className="dip">
					{dipContent.map((line, index) => (
						<p key={index}>{line}</p>
					))}
				</div>
			) : (mode === "degos" ? (
				<div className="degos">
					<h1>DegOS</h1>
				</div>
			) : <DegDeathScreen reboot={reboot} error="Could not determine mode." />)}
		</DegDeathScreen>
	);
}

export default App;
