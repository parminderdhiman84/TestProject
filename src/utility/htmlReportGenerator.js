const reporter = require('cucumber-html-reporter');

module.exports = ({ inputPath, outputPath }) => {
  const options = {
    theme: 'bootstrap',
    jsonFile: inputPath,
    output: outputPath,
    reportSuiteAsScenarios: true,
    launchReport: true,
    metadata: {
      'App Version': '0.0.1',
      'Test Environment': 'STAGING',
      Browser: 'Chrome',
      Platform: 'Mac',
      Parallel: 'Scenarios',
      Executed: 'Remote',
    },
  };

  reporter.generate(options);
};
