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

// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'jest-environment-jsdom',
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//     transform: {
//       '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
//     },
//     moduleNameMapper: {
//       '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//       '^@/(.*)$': '<rootDir>/src/$1',
//     },
//     testPathIgnorePatterns: ['/node_modules/', '/.next/'],
//     transformIgnorePatterns: ['<rootDir>/node_modules/'],
//     // transformIgnorePatterns: [
//     //   'node_modules/(?!(some-es6-package|another-es6-package)/)' 
//     // ],
//   };
  
const nextJest = require('next/jest')

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    preset: 'ts-jest',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@/db$': '<rootDir>/__mocks__/db.ts',
      },
    setupFiles: ['<rootDir>/__mocks__/next.ts'],
    clearMocks: true,
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config)