module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  collectCoverageFrom: ["src/Contexts/**/*.ts"],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/Contexts/Bank/Account/domain/AccountRepository.ts",
    "<rootDir>/src/Contexts/Bank/Shared/domain/Logger.ts",
    "<rootDir>/src/Contexts/Bank/Shared/domain/Nullable.ts",
    "<rootDir>/src/Contexts/Bank/Shared/infrastructure/Persistence/MongoConfig.ts",
  ],
};
