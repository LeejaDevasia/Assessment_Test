
const loginLocators = require('../locators/login');

async function openSauceDemo(page) {
await page.goto('https://www.saucedemo.com/');
}

async function login(page, username, password) {

await page.locator(loginLocators.username)
.fill(username);

await page.locator(loginLocators.password)
.fill(password);

await page.locator(loginLocators.loginButton)
.click();
}

module.exports = {
openSauceDemo,
login
};