import { Console } from 'console';
import reporter from 'cucumber-html-reporter';
import fs from 'fs';
import path from 'path';

const timestamp = Date.now();
const reportName = 'cucumber-report';
const jsonPath = 'Reports/cucumber.json';
const reportsDir = 'Reports';
const latestHtmlFile = 'Reports/cucumber.html';
const htmlPath = path.join('Reports', `${reportName}_${timestamp}.html`);

console.log("In Update HTML file");
//Get the latest files

const options = {
    theme: 'bootstrap',
    jsonFile: jsonPath,
    output: htmlPath,
    reportSuiteAsScenarios: true,
    launchReport: true,
    storeScreenshots: true,
    screenshotsDirectory: 'Reports/screenshots',
    metadata: {
        "Browser": "Chromium",
        "Platform": process.platform,
        "Executed": "Local"
    }
};
reporter.generate(options);
console.log(" HTML report generated");
