import { test, expect } from '@playwright/test';

test('SauceDemo - Add two products and verify cart buttons', async ({ page }) => {

// Open SauceDemo
await page.goto('https://www.saucedemo.com/');

// Login
await page.locator('[data-test="username"]').fill('standard_user');
await page.locator('[data-test="password"]').fill('secret_sauce');
await page.locator('[data-test="login-button"]').click();

// Verify Products page
await expect(page.locator('[data-test="title"]')).toHaveText('Products');

// --------------------------------------------------
// Clear any existing products from the cart
// --------------------------------------------------

await page.locator('[data-test="shopping-cart-link"]').click();

await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');

const existingCartItems = page.locator('.cart_item');
const existingItemCount = await existingCartItems.count();

for (let i = existingItemCount - 1; i >= 0; i--) {
await existingCartItems.nth(i)
.locator('button[data-test^="remove"]')
.click();
}

// Verify cart is empty
await expect(page.locator('.cart_item')).toHaveCount(0);

// Go back to Products
await page.locator('[data-test="continue-shopping"]').click();

await expect(page.locator('[data-test="title"]')).toHaveText('Products');

// --------------------------------------------------
// Open first product
// --------------------------------------------------

await page.locator('[data-test="item-4-title-link"]').click();

await expect(
page.locator('[data-test="inventory-item-name"]')
).toHaveText('Sauce Labs Backpack');

// Add first product
await page.waitForTimeout(3000);

await page.locator('[data-test="add-to-cart"]').click();

// Verify cart contains 1 product
await expect(
page.locator('[data-test="shopping-cart-badge"]')
).toHaveText('1');

// --------------------------------------------------
// Go back to Products
// --------------------------------------------------

await page.locator('[data-test="back-to-products"]').click();

await expect(page.locator('[data-test="title"]')).toHaveText('Products');

// --------------------------------------------------
// Open second product
// --------------------------------------------------

await page.locator('[data-test="item-0-title-link"]').click();

await expect(
page.locator('[data-test="inventory-item-name"]')
).toHaveText('Sauce Labs Bike Light');

// Add second product
await page.waitForTimeout(3000);

await page.locator('[data-test="add-to-cart"]').click();

// Verify cart contains 2 products
await expect(
page.locator('[data-test="shopping-cart-badge"]')
).toHaveText('2');

// --------------------------------------------------
// Open Cart
// --------------------------------------------------

await page.locator('[data-test="shopping-cart-link"]').click();

// Verify Your Cart page
await expect(
page.locator('[data-test="title"]')
).toHaveText('Your Cart');

// --------------------------------------------------
// Verify both products are in the cart
// --------------------------------------------------

await expect(
page.locator('[data-test="inventory-item-name"]')
.filter({ hasText: 'Sauce Labs Backpack' })
).toBeVisible();

await expect(
page.locator('[data-test="inventory-item-name"]')
.filter({ hasText: 'Sauce Labs Bike Light' })
).toBeVisible();

// --------------------------------------------------
// Verify each product has a Remove button
// --------------------------------------------------

const cartItems = page.locator('.cart_item');

await expect(cartItems).toHaveCount(2);

for (let i = 0; i < await cartItems.count(); i++) {
await expect(
cartItems.nth(i).locator('button[data-test^="remove"]')
).toBeVisible();
}

// --------------------------------------------------
// Verify Continue Shopping button
// --------------------------------------------------

await expect(
page.locator('[data-test="continue-shopping"]')
).toBeVisible();

// --------------------------------------------------
// Verify Checkout button
// --------------------------------------------------

await expect(
page.locator('[data-test="checkout"]')
).toBeVisible();

});