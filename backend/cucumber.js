module.exports = {
  default: [
    'tests/features/*.feature',
    '--require tests/step_definitions/*.js',
    '--require tests/support/*.js',
    '--tags @api',
    '--format json:Reports/cucumber.json'
  ].join(' ')
};