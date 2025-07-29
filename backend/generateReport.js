const reporter = require('cucumber-html-reporter');
const fs = require('fs');

const jsonFile = 'Reports/cucumber.json';
const htmlFile = 'Reports/cucumber_report.html';

if (!fs.existsSync(jsonFile)) {
  console.error(`❌ JSON file not found: ${jsonFile}`);
  process.exit(1);
}

const data = fs.readFileSync(jsonFile, 'utf8');
if (!data.trim()) {
  console.error(`❌ JSON file is empty: ${jsonFile}`);
  process.exit(1);
}

try {
  JSON.parse(data);
} catch (e) {
  console.error(`❌ JSON file invalid: ${e.message}`);
  process.exit(1);
}

const options = {
  theme: 'bootstrap',
  jsonFile,
  output: htmlFile,
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "LOCAL",
    "Browser": "Postman/REST",
    "Platform": process.platform,
    "Executed": "Automated"
  }
};

reporter.generate(options);
console.log(`✅ HTML report generated: ${htmlFile}`);
