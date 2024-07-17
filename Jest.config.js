// module.exports = {
//     preset: "ts-jest",
//     testEnvironment: "node",
//     testPathIgnorePatterns: ["/node_modules/", "/dist/"],
//     reporters: [
//         "default", 
//         [
//             "jest-junit",
//             { outputDirectory:  "./reports/junit", outputName: "js-test-results.xml" },
//         ],
//     ],
// };

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
      '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  };
  