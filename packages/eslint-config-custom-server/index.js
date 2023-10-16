module.exports = {
	"parser": "@typescript-eslint/parser",
	"extends": [
		"plugin:@typescript-eslint/recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript"
	],
	"env": {
		"node": true,
		"es6": true
	},
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	}
};
