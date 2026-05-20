import { useState, useEffect } from "react";
import "./App.css";
import CommandLine from "./components/command-line/command-line";
import DeathScreen from "./components/death-screen/death-screen";
import DIP from "./lib/dip";

function App() {
	const [mode, setMode] = useState("dip");
	const [commandLineContent, setCommandLineContent] = useState([
		"Deg Dip",
		"Initializing..."
	]);
	const [error, setError] = useState(null);

	useEffect(() => {
		DIP.initialize(setCommandLineContent, [
			"Deg Dip",
			"Initialized.",
			"Welcome to Deg Dip! Use 'help' for commands."
		]);
		window.DIP = DIP;
	}, []);

	function reboot() {
		setError(null);
		setMode("dip");
		setCommandLineContent(["Deg Dip", "Rebooting... (0/2)"]);
		if (window.DIP && typeof window.DIP.initialize === "function") {
			window.DIP.initialize(setCommandLineContent, [
				"Deg Dip",
				"Rebooting... (1/2)"
			]);
			window.DIP.setLines(["Deg Dip", "Rebooted (2/2)"]);
		} else if (DIP && typeof DIP.initialize === "function") {
			DIP.initialize(setCommandLineContent, [
				"Deg Dip",
				"Rebooting... (1/2)"
			]);
			window.DIP = DIP;
			window.DIP.setLines(["Deg Dip", "Rebooted (2/2)"]);
		} else setError("DIP SDK is not available.");
	}

	return (
		<DeathScreen reboot={reboot} error={error}>
			{mode === "dip" && (
				<CommandLine
					content={commandLineContent}
					setContent={setCommandLineContent}
				/>
			)}

			{mode === "degos" && (
				<div className="degos">
					<h1>DegOS</h1>
				</div>
			)}
		</DeathScreen>
	);
}

export default App;
