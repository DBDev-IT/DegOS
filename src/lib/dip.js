import bindAll from "bindAll";

const DIP = {
	_setContent: null,
	_lines: [],

	initialize(setContent, initialLines = []) {
		if (typeof setContent !== "function") {
			throw new Error("DIP.initialize expects content setter function.");
		}

		this._setContent = setContent;
		this._lines = Array.isArray(initialLines) ? [...initialLines] : [];
		this._setContent(this._lines);
		return this;
	},

	_addLines(lines) {
		this._lines = [...this._lines, ...lines];
	},

	setLines(lines) {
		this._ensureInitialized();
		this._lines = Array.isArray(lines) ? [...lines] : [];
		this._setContent(this._lines);
		return this;
	},

	addLine(line) {
		this._ensureInitialized();
		this._addLines([String(line)]);
		this._setContent(this._lines);
		return this;
	},

	addLines(lines) {
		this._ensureInitialized();
		if (!Array.isArray(lines))
			throw new Error("DIP.addLines expects an array.");
		this._addLines(lines.map(String));
		this._setContent(this._lines);
		return this;
	},

	clear() {
		this._ensureInitialized();
		this._lines = [];
		this._setContent(this._lines);
		return this;
	},

	getLines() {
		return [...this._lines];
	},

	_ensureInitialized() {
		if (!this._setContent) {
			throw new Error("DIP SDK is not initialized.");
		}
	}
};

bindAll(DIP);

export default DIP;
