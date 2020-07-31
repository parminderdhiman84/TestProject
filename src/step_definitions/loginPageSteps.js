const { Before, After, Given, Then, When } = require('cucumber');
const initTest = require('../utility/initTest')
const loginPage = require('../pages/loginPage');

let devQAPage;

Before({}, async () => {
  await initTest.initDriver();
  devQAPage = loginPage(this);
});

After(async function quit(scenario) {
  const statusLogs = this;
  await initTest.quitDriver(statusLogs, scenario);
});

Given('I have launched the dev-qa portal', async () => {
  await devQAPage.launchUrl();
});

When('I login using credentials', async dataTable => {
  const data = dataTable.hashes();
  for (let row = 0; row < data.length; row += 1) {
    let userName = Object.values(data[row])[0];
    let password = Object.values(data[row])[1];
    await devQAPage.login(userName, password);
  }
});

Then('I should be successfully logged in', async () => {
  await devQAPage.verifySuccessPage();
});

Then('I should get error for username', async () => {
  await devQAPage.verifyErrorMsgUsername();
});

Then('I should get error for password', async () => {
  await devQAPage.verifyErrorMsgPassword();
});
