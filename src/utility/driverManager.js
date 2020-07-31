const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const ie = require('selenium-webdriver/ie');
const {logger} = require('../utility/logger');

const opts = {
  chrome: new chrome.Options(),
  firefox: new firefox.Options(),
  ie: new ie.Options()
};

/**
 * Manages driver implementation
 * @constructor
 * @param  {String} browserName Taken from module.json
 *                              must be 'remote' if using sauce
 *                              anything else in opts otherwise
 */

module.exports = class DriverManager {
  constructor(browserName) {
    this.browserName = browserName;
    this.driver = new Builder();
    this.options = opts[browserName];
  }
  
  initLocalDriver() {
    this.driver.forBrowser(this.browserName);
  }

  build() {
    switch (this.browserName) {
      case 'chrome':
        logger.info(`Launching Chrome browser :`);
        return this.driver.setChromeOptions(this.options).build();
      case 'firefox':
        logger.info(`Launching Firefox  browser :`);
        return this.driver.setFirefoxOptions(this.options).build();
      case 'ie':
        logger.info(`Launching IE  browser :`);
        return this.driver.setIeOptions(this.options).build();
      default:
        throw new Error(`Please double check your config, the browser you selected is ${this.browserName}`);
    }
  }
}
