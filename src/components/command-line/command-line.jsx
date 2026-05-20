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
	const { getLines, addLines, setLines } = window.DIP;
	const [input, setInput] = useState("");
	const containerRef = useRef(null);
	const hiddenInputRef = useRef(null);

	useEffect(() => {
		hiddenInputRef.current?.focus();
	}, []);

	function focusHiddenInput() {
		hiddenInputRef.current?.focus();
	}

	function executeCommand(raw) {
		const splitted = String(raw || "")
			.trim()
			.split(" ");
		const cmd = splitted[0] || "";
		const args = splitted.slice(1);
		if (cmd === "") {
			addLines(["> " + cmd]);
			return;
		}

		if (cmd === "help") {
			addLines([`> ${cmd}`, ...helpLines]);
			return;
		}

		if (cmd === "clear") {
			setLines([]);
			return;
		}

		if (cmd === "echo") {
			const rest = args.join(" ");
			addLines([`> ${cmd}`, rest]);
			return;
		}

		if (cmd === "degos") {
			addLines([`> ${cmd}`, "Switching to DegOS..."]);
			props.setMode("degos");
			return;
		}

		addLines([`> ${cmd}`, `Unknown command: ${cmd}. Type 'help'.`]);
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
			onPointerDown={focusHiddenInput}
			onMouseDown={focusHiddenInput}
			onTouchStart={focusHiddenInput}
		>
			<input
				ref={hiddenInputRef}
				className="command-line-hidden-input"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={onKeyDown}
				autoCapitalize="none"
				autoComplete="off"
				autoCorrect="off"
				spellCheck="false"
				aria-hidden="true"
			/>
			{getLines().map((line, index) => (
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
