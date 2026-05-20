import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import DeathScreen from "./components/death-screen/death-screen";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<DeathScreen>
			<App />
		</DeathScreen>
	</StrictMode>
);
