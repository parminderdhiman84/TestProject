#!/usr/bin/env node

'use scrict';

const path = require('path');
const commandLineArgs = require('command-line-args');

const generator = require('../utility/htmlReportGenerator');

const relativeToCwd = p => path.resolve(process.cwd(), p);

const commandArguments = commandLineArgs([
  {
    name: 'input', alias: 'i', type: String, multiple: false, defaultValue: 'cucumberOutput.json',
  },
  {
    name: 'output', alias: 'o', type: String, multiple: false, defaultValue: 'cucumber_report.html',
  },
]);

generator({
  inputPath: relativeToCwd(commandArguments.input),
  outputPath: relativeToCwd(commandArguments.output),
});

process.exit(0);
