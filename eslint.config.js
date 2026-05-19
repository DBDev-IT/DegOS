import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier/recommended";

export default js.config(
	{ ignores: ["dist"] },
	{
		extends: [js.configs.recommended, prettier],
		files: ["**/*.{json,js,jsx,css,md}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true }
			],
			"prettier/prettier": [
				"error",
				{
					semi: true,
					singleQuote: false,
					trailingComma: "none",
					tabWidth: 4,
					useTabs: true
				}
			]
		}
	}
);
