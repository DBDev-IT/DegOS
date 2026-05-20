import { useEffect, useRef, useState } from "react";
import "./command-line.css";

const helpLines = [
	"Available commands:",
	"help - show this message",
	"clear - clear the console",
	"echo <text> - print text to console",
	"degos - switch to DegOS"
];

function CommandLine(props) {
	const { addLines, setLines } = window.DIP;
	const [input, setInput] = useState("");
	const containerRef = useRef(null);
	const inputRef = useRef(null);
	const bottomRef = useRef(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({
			behavior: "instant",
			block: "nearest"
		});
	}, [props.lines]);

	function executeCommand(raw) {
		const safe = String(raw || "").trim();
		const splitted = String(raw || "")
			.trim()
			.split(" ");
		const cmd = splitted[0] || "";
		const args = splitted.slice(1);
		if (cmd === "") {
			addLines(["> " + safe]);
			return;
		}

		if (cmd === "help") {
			addLines([`> ${safe}`, ...helpLines]);
			return;
		}

		if (cmd === "clear") {
			setLines([]);
			return;
		}

		if (cmd === "echo") {
			const rest = args.join(" ");
			addLines([`> ${safe}`, rest]);
			return;
		}

		if (cmd === "degos") {
			addLines([`> ${safe}`, "Switching to DegOS..."]);
			props.setMode("degos");
			return;
		}

		addLines([`> ${safe}`, `Unknown command: ${cmd}. Type 'help'.`]);
	}

	function onKeyDown(e) {
		if (e.key === "Enter") {
			e.preventDefault();
			executeCommand(input);
			setInput("");
		}
	}

	function onChange(e) {
		setInput(e.target.value);
	}

	return (
		<div
			className="command-line"
			ref={containerRef}
			onMouseDown={() => inputRef.current?.focus()}
		>
			{props.lines.map((line, index) => (
				<p key={index}>{String(line)}</p>
			))}

			<p className="input-line">
				<span className="prompt">&gt;</span>
				<input
					className="input-text"
					type="text"
					ref={inputRef}
					value={input}
					onChange={onChange}
					onKeyDown={onKeyDown}
					autoCapitalize="off"
					autoCorrect="off"
					spellCheck="false"
					inputMode="text"
				/>
			</p>
			<div ref={bottomRef} />
		</div>
	);
}

export default CommandLine;
