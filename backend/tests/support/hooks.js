const { Before, AfterStep, AfterAll } = require('@cucumber/cucumber');

Before(function (scenario) {
  console.log(`🔍 Starting scenario: ${scenario.pickle.name}`);
});

AfterStep(async function ({ result }) {
  if (result.status === 'FAILED' || result.status === 'failed') {
    const errorMessage = result.exception?.stack || result.exception?.message || 'Unknown error';
    await this.attach(`❌ Step failed:\n\n${errorMessage}`, 'text/plain');
  }
});

AfterAll(function () {
  console.log('✅ All tests finished. You can now generate the HTML report separately.');
});
