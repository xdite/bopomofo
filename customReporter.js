class CustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(contexts, results) {
    console.log(
      results.numFailedTests > 0
        ? `Failed Tests: ${results.numFailedTests}`
        : 'All tests passed!'
    );
    results.testResults.forEach(testResult => {
      testResult.testResults.forEach(result => {
        if (result.status === 'failed') {
          console.log(`\n${result.fullName}`);
          result.failureMessages.forEach(message => console.log(message));
        }
      });
    });
  }
}

module.exports = CustomReporter;