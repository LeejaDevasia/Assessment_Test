const { test, expect } = require('@playwright/test');

const {openSauceDemo,login} = require('../utilities/login.func');

const productsLocators = require('../locators/product');

test('Login - Verify user can login successfully', async ({ page }) => {

// Open SauceDemo
await openSauceDemo(page);
await page.waitForLoadState('load');
// Login
await login(page, 'standard_user', 'secret_sauce');

// Verify Products page is displayed
await expect(page.locator(productsLocators.pageTitle)).toHaveText('Products');

});