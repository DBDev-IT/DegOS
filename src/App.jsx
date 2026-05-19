import { useState, useEffect } from "react";
import "./App.css";
import DegDeathScreen from "./components/deg-death-screen/deg-death-screen";

function App() {
	const [mode, setMode] = useState("dih");
	const [dipContent, setDipContent] = useState(["Deg Dip", "Initializing..."]);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!(mode === "dip" || mode === "degos"))
			setError("Could not determine mode.");
	}, [mode]);

	function reboot() {
		setError(null);
		setMode("dip");
		setDipContent(["Deg Dip", "Rebooting..."]);
	}

	return (
		<DegDeathScreen reboot={reboot} error={error}>
			{mode === "dip" && (
				<div className="dip">
					{dipContent.map((line, index) => (
						<p key={index}>{line}</p>
					))}
				</div>
			)}
			
			{mode === "degos" && (
				<div className="degos">
					<h1>DegOS</h1>
				</div>
			)}
		</DegDeathScreen>
	);
}

export default App;
