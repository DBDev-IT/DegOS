import { useEffect, useRef, useState } from "react";
import "./command-line.css";

const helpLines = [
	"Available commands:",
	"help - show this message",
	"clear - clear the console",
	"echo <text> - print text to console"
];

function CommandLine(props) {
	const { content, setContent } = props;
	const [input, setInput] = useState("");
	const containerRef = useRef(null);

	useEffect(() => {
		containerRef.current?.focus();
	}, []);

	function executeCommand(raw) {
		const splitted = String(raw || "").trim().split(" ");
		const cmd = splitted[0] || "";
		const args = splitted.slice(1);
		if (cmd === "") {
			setContent([...content, "> " + cmd]);
			return;
		}

		if (cmd === "help") {
			setContent([...content, `> ${cmd}`, ...helpLines]);
			return;
		}

		if (cmd === "clear") {
			setContent([]);
			return;
		}

		if (cmd === "echo") {
			const rest = args.join(" ");
			setContent([...content, `> ${cmd}`, rest]);
			return;
		}

		setContent([...content, `> ${cmd}`, `Unknown command: ${cmd}. Type 'help'.`]);
	}

	function onKeyDown(e) {
		if (e.key === "Enter") {
			e.preventDefault();
			executeCommand(input);
			setInput("");
			return;
		}

		if (e.key === "Backspace") {
			e.preventDefault();
			setInput((s) => s.slice(0, -1));
			return;
		}

		if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
			e.preventDefault();
			setInput((s) => s + e.key);
		}
	}

	return (
		<div
			className="command-line"
			tabIndex={0}
			ref={containerRef}
			onKeyDown={onKeyDown}
			onMouseDown={() => containerRef.current?.focus()}
		>
			{content.map((line, index) => (
				<p key={index}>{String(line)}</p>
			))}

			<p className="input-line">
				<span className="prompt">&gt;</span>
				<span className="input-text">{String(input)}</span>
				<span className="cursor" aria-hidden="true" />
			</p>
		</div>
	);
}

export default CommandLine;
