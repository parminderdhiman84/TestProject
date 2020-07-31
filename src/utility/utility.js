const webdriver = require('selenium-webdriver');
const fs = require('fs');
const dateFormat = require('dateformat');
const path = require('path');
const assert = require('assert');
const {logger} = require('../utility/logger');


// driver comes from global.driver defined in Before hook from initTest
const {
  By,
  until,
} = webdriver;

module.exports = () => {
  const initElementFromLocatorString = (elementLocator, selectorType) => {
    const selector = By[selectorType];
    return selector
      ? selector(elementLocator)
      : logger.info(
        'Element Selector type is unknown! Please use xpath, css or id',
      );
  };

  const convertToOneline = multilineString => multilineString.replace(/(\r\n\t|\n|\r\t)/gm, ' ');

  const assertEqual = (actual, expected, type = 'hard') => {
    const actualTxt = typeof actual === 'string' ? convertToOneline(actual) : actual;
    try {
      assert.equal(actualTxt, expected);
      logger.info(
        `Assertion passed: Expected: ${expected}  && Actual: ${actualTxt}`,
      );
    } catch (err) {
      if (type === 'hard') {
        logger.error(
          `Assertion failed: Expected: ${expected}  && Actual: ${actualTxt}`,
        );
        throw err;
      } else {
        logger.error(
          `Assertion failed: Expected: ${expected}  && Actual: ${actualTxt}`,
        );
      }
    }
  };

  const findElement = async (
    elementLocator,
    selectorType = 'css',
    timeOut = 5000,
  ) => {
    const elementSelector = initElementFromLocatorString(
      elementLocator,
      selectorType,
    );
    const element = await driver.wait(
      until.elementLocated(elementSelector),
      timeOut,
    );
    return element;
  };

  const click = async (elementLocator, selectorType = 'css', timeOut = 5000) => {
    const element = initElementFromLocatorString(
      elementLocator,
      selectorType,
    );
    await driver.wait(until.elementLocated(element), timeOut).click();
  };

  const sendKeys = async (
    elementLocator,
    text,
    selectorType = 'css',
    timeOut = 5000,
  ) => {
    const element = initElementFromLocatorString(
      elementLocator,
      selectorType,
    );
    await driver.wait(until.elementLocated(element), timeOut).sendKeys(text);
  };

  const getText = async (elementLocator, selectorType = 'css', timeOut = 5000) => {
    const element = initElementFromLocatorString(
      elementLocator,
      selectorType,
    );
    return driver.wait(until.elementLocated(element), timeOut).getText();
  };


  const captureScreenshot = async (
    outputPath = 'reports',
  ) => driver.takeScreenshot().then((data) => {
    const scenarioName = 'TestScenario'
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath);
    }
    if (!fs.existsSync(`${outputPath}/screenshots`)) {
      fs.mkdirSync(`${outputPath}/screenshots`);
    }
    const d = new Date();
    const datewithformat = dateFormat(d, 'isoDateTime').replace(/:/gi, '_');
    const fileName = `${scenarioName}${datewithformat}.png`;

    fs.writeFileSync(
      path.join(outputPath, 'screenshots', fileName),
      data,
      'base64',
    );
  });


  return {
    initElementFromLocatorString,
    findElement,
    click,
    sendKeys,
    captureScreenshot,
    assertEqual,
    getText,
  };
} 