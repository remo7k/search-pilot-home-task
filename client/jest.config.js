module.exports = {
  clearMocks: true,
  moduleFileExtensions: ["js", "ts", "tsx"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.module\\.less$": "identity-obj-proxy",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
  },
  testEnvironment: "jsdom",
  testMatch: [
    "**/*.(integrationTest|a11yTest|test).(ts|tsx)",
    "**/tests/*.(integrationTest|a11yTest|test).(ts|tsx)",
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json",
        diagnostics: true,
      },
    ],
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["./testSetup.ts"],
  modulePaths: ["<rootDir>"],
};
