// @flow
import { assert } from 'chai'
import { By } from 'selenium-webdriver'
import TaxPage from './../src/pageobjects/TaxPage'
import BasePage from './../src/pageobjects/BasePage'

import DriverBuilder from './../src/lib/DriverBuilder'
import driverutils from './../src/lib/driver-utils'

var taxArray = new Array();
var taxArrayEfficient = new Array();
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(__dirname + '/taxes.txt')
});

lineReader.on('line', async function (line) {
  let splitted = line.split("\t");
  taxArray.push(splitted);
});

var firstDiff;

describe('Acceptance Tests', function () {
  let driverBuilder
  let driver

  beforeEach(async function () {
    driverBuilder = new DriverBuilder()
    driver = driverBuilder.driver
    await driverutils.goToHome(driver)
    
  })
  
  it('Automates Tax Info', async function () {
    const taxPage = new TaxPage(driver)
    for (var i = 0; i < taxArray.length - 1; i ++) {
      if (i === 0) {
        firstDiff = taxArray[0];
      }
      else if (taxArray[i][1] !== taxArray [i + 1][1]) {
        firstDiff.push(taxArray[i][0]);
        taxArrayEfficient.push(firstDiff);
        firstDiff = taxArray[i + 1];
      }
    }
    await taxPage.login();
    await driver.sleep(5000);
    for (var i = 0; i < taxArray.length; i ++) {
      await taxPage.clickLocal();
      await taxPage.clickZip();
      await taxPage.process(taxArrayEfficient[i][0], taxArrayEfficient[i][1], taxArrayEfficient[i][2])
      await driver.navigate().refresh();
    }
  })

  afterEach(async function () {
    await driverBuilder.quit()
  })
})
