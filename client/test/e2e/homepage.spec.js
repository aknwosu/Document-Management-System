const config = require('../../../nightwatch.conf.js');

module.exports = {

  'Home page': (browser) => {
    browser
  .url('http://localhost:4000')
  .waitForElementVisible('body')
  .assert.title('Document Management System')
  .end();
  }
};
