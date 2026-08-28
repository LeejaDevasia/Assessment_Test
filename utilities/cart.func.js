const { expect } = require('@playwright/test');
const cartLocators = require('../locators/cart');

async function removeAllProducts(page) {

const cartItems = page.locator(cartLocators.cartItems);

const itemCount = await cartItems.count();

// Remove products from last to first
for (let i = itemCount - 1; i >= 0; i--) {

await cartItems.nth(i).locator(cartLocators.removeButton).click();
}
}

async function verifyCartIsEmpty(page) {

await expect(page.locator(cartLocators.cartItems)).toHaveCount(0);
}

async function verifyProductInCart(page, productName) {

const product = page.locator(cartLocators.cartItems).filter({hasText: productName});

await expect(product).toBeVisible();
}

async function verifyRemoveButtonForEachProduct(page) {

const cartItems = page.locator(cartLocators.cartItems);

const itemCount = await cartItems.count();

 for (let i = 0; i < itemCount; i++) {

  await expect(cartItems.nth(i).locator(cartLocators.removeButton)).toBeVisible();

 }
}

async function continueShopping(page) {

await page.locator(cartLocators.continueShopping).click();
}

async function checkout(page) {

await page.locator(cartLocators.checkout).click();
}

module.exports = {
removeAllProducts,
verifyCartIsEmpty,
verifyProductInCart,
verifyRemoveButtonForEachProduct,
continueShopping,
checkout
};