// @flow
import { By } from 'selenium-webdriver'
import BasePage from './BasePage'

const LOCAL = By.xpath("(//span[@class='add'])[position()=2]");
const SINGLEZIP = By.xpath("(//div[@data-value='range'])");
const ENTERZIPONE = By.xpath("//input[@name='zipStart']");
const ENTERZIPTWO = By.xpath("//input[@name='zipEnd']");
const TAXES = By.xpath("//input[@name='rate']");
const SAVE = By.css('input.saveAndClose');
const EMAIL = By.css('input.username.sc-cvbbAY.bEXeAl');
const PASSWORD = By.css('input.password.sc-cvbbAY.cPzClN');
const LOGIN = By.xpath("//div[@id='renderTarget']/div/div/div/div[2]/div/div/button");
const HOVER = By.css('div.yui3-widget.sqs-widget.sqs-tax-rule');
const CANCEL = By.css('a.cancel');

export default class TaxPage extends BasePage {

  async login() {
    await this.sendKeys(EMAIL, "suntimaco@gmail.com")
    await this.sendKeys(PASSWORD, "Bruce9988")
    await this.click(LOGIN)
  }

  async clickLocal() {
    await this.click(LOCAL)
  }

  async clickZip() {
    await this.click(SINGLEZIP)
  }

  async process (zipcode1 : string, taxrate : string, zipcode2 : string) {

    await this.sendKeys(ENTERZIPONE, zipcode1)
    await this.sendKeys(ENTERZIPTWO, zipcode2)
    await this.sendKeys(TAXES, taxrate * 100)
    await this.click(SAVE)
    // await this.click(CANCEL)
  }

}
