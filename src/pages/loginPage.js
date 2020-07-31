const Utility = require('../utility/utility');

const {
  APP_URL,
} = require('../../config/module');

let util = Utility(this);

//locators for login page
const USERNAME = '[name=loginUsername]';
const PASSWORD = '[name=loginPassword]';
const LOGIN = 'button[type=submit]';
const SUCCESS = '.logged-in__success'
const ERROR_USERNAME = '[name=loginUsername] + .form-field__error'
const ERROR_PASSWORD = '[name=loginPassword] + .form-field__error'

module.exports = () => {

  const launchUrl = async () => {
    await global.driver.get(APP_URL);
    await util.captureScreenshot();
  };
  
  const login = async (username, password) => {
    await util.sendKeys(USERNAME, username);
    await util.sendKeys(PASSWORD, password);
    await util.click(LOGIN);
  };

  const verifySuccessPage = async () => {
    const value = await util.getText(SUCCESS);
    await util.assertEqual(value, 'Successfully logged in!');
    await util.captureScreenshot();
  };

  const verifyErrorMsgUsername = async () => {
    const value = await util.getText(ERROR_USERNAME);
    await util.assertEqual(value, 'Error');
    await util.captureScreenshot();
  };

  const verifyErrorMsgPassword = async () => {
    const value = await util.getText(ERROR_PASSWORD);
    await util.assertEqual(value, 'Error');
    await util.captureScreenshot();
  };


  return {
    launchUrl,
    login,
    verifySuccessPage,
    verifyErrorMsgUsername,
    verifyErrorMsgPassword
  };
};
