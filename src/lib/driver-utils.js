// change baseUrl based on your site info
const baseUrl = 'https://potato-beagle.squarespace.com/config/settings/taxes'

export default {
  async goToHome (driver: WebDriverClass): Promise<void> {
    return driver.get(baseUrl)
  }
}
