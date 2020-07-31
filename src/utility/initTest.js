const {
  setDefaultTimeout, Status,
} = require('cucumber');
const config = require('../../config/module');
const DriverManager = require('./driverManager');

const browserName = config.BROWSER.toLowerCase();
const dm = new DriverManager(browserName);

let driver = null;

const initDriver = async() => {
    dm.initLocalDriver();
    driver = await dm.build();
    global.driver = driver;
    setDefaultTimeout(config.CUCUMBER_STEP_TIMEOUT);
    await driver.manage().deleteAllCookies();
    await driver.manage().window().maximize();
}

const quitDriver = async function saveFailedScenarioScreenshot(statusLogs, scenario) {
  if (scenario.result.status === Status.FAILED) {
    const buffer = await driver.takeScreenshot();
    await statusLogs.attach(buffer, 'image/png');
  }
  driver.quit();
}

module.exports = {
  initDriver,
  quitDriver
};