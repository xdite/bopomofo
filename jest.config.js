module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: false,
  silent: true,
  reporters: [
    ["default", { "summaryThreshold": 1 }]
  ]
};