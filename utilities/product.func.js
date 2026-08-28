const { expect } = require('@playwright/test');
const productsLocators = require('../locators/product');

async function openBackpack(page) {

await page.locator(productsLocators.backpack)
.click();
}

async function openBikeLight(page) {

await page.locator(productsLocators.bikeLight)
.click();
}

async function addProductToCart(page) {

// Wait 3 seconds so the action can be observed during execution
await page.waitForTimeout(3000);

await page.locator(productsLocators.addToCart)
.click();
}

async function goBackToProducts(page) {

await page.locator(productsLocators.backToProducts)
.click();
}

async function openCart(page) {

await page.locator(productsLocators.shoppingCartLink)
.click();
}

module.exports = {
openBackpack,
openBikeLight,
addProductToCart,
goBackToProducts,
openCart
};