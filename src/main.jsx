import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import DegDeathScreen from "./components/deg-death-screen/deg-death-screen";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<DegDeathScreen>
			<App />
		</DegDeathScreen>
	</StrictMode>
);
