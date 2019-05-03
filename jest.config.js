const tsConfig = require('./tsconfig.json')

module.exports = {
	testRegex: "/__tests__/(.*\\.|/)(test|spec)\\.tsx?$",
	transform: {
		".(ts|tsx)": "ts-jest"
	},
	moduleFileExtensions: [
		"ts",
		"tsx",
		"js",
		"json",
		"less"
	],
	modulePaths: [
		tsConfig.compilerOptions.baseUrl
	],
	moduleNameMapper: {
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.ts",
		"\\.(css|less|pcss)$": "<rootDir>/__mocks__/styleMock.ts"
	}
}