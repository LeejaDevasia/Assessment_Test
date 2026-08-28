const { test, expect } = require('@playwright/test');

const {openSauceDemo, login} = require('../utilities/login.func');

const {openBackpack, openBikeLight, addProductToCart, goBackToProducts} = require('../utilities/product.func');

const productsLocators = require('../locators/product');

test.beforeEach(async ({ page }) => {

// Open SauceDemo
await openSauceDemo(page);
await page.waitForLoadState('load');
// Login
await login(page,'standard_user','secret_sauce');

// Verify Products page
await expect(page.locator(productsLocators.pageTitle)).toHaveText('Products');

});

test('Product - Add Backpack to cart', async ({ page }) => {

// Open Backpack
await openBackpack(page);

// Verify product
await expect(page.locator(productsLocators.productName)).toHaveText('Sauce Labs Backpack');

// Add Backpack
await addProductToCart(page);

// Verify cart count
await expect(page.locator(productsLocators.shoppingCartBadge)).toHaveText('1');

});

test('Product - Add Bike Light to cart', async ({ page }) => {

// Open Bike Light
await openBikeLight(page);

// Verify product
await expect(page.locator(productsLocators.productName)).toHaveText('Sauce Labs Bike Light');

// Add Bike Light
await addProductToCart(page);

// Verify cart count
await expect(page.locator(productsLocators.shoppingCartBadge)).toHaveText('1');

});

test('Product - Add two products to cart', async ({ page }) => {

// Open Backpack
await openBackpack(page);

await expect(page.locator(productsLocators.productName)).toHaveText('Sauce Labs Backpack');

// Add Backpack
await addProductToCart(page);

await expect(page.locator(productsLocators.shoppingCartBadge)).toHaveText('1');

// Go back to Products
await goBackToProducts(page);

await expect(page.locator(productsLocators.pageTitle)).toHaveText('Products');

// Open Bike Light
await openBikeLight(page);

await expect(page.locator(productsLocators.productName)).toHaveText('Sauce Labs Bike Light');

// Add Bike Light
await addProductToCart(page);

// Verify cart contains two products
await expect(page.locator(productsLocators.shoppingCartBadge)).toHaveText('2');

});
