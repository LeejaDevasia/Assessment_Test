const { test, expect } = require('@playwright/test');
const {openSauceDemo, login} = require('../utilities/login.func');
const {openBackpack, openBikeLight, addProductToCart, goBackToProducts, openCart} = require('../utilities/product.func');
const {removeAllProducts, verifyCartIsEmpty, verifyProductInCart, verifyRemoveButtonForEachProduct, continueShopping} = require('../utilities/cart.func');
const productsLocators = require('../locators/product');
const cartLocators = require('../locators/cart');

test.beforeEach(async ({ page }) => {

  // Open SauceDemo
  await openSauceDemo(page);
  await page.waitForLoadState('load');
  // Login
  await login(page, 'standard_user', 'secret_sauce');

  // Verify Products page
  await expect(page.locator(productsLocators.pageTitle)).toHaveText('Products');

  // Open Cart
  await openCart(page);

  // Verify Cart page
  await expect(page.locator(cartLocators.pageTitle)).toHaveText('Your Cart');

 // Clear existing cart
  await removeAllProducts(page);

  // Verify cart is empty
  await verifyCartIsEmpty(page);

  // Return to Products
  await continueShopping(page);

  await expect(page.locator(productsLocators.pageTitle)).toHaveText('Products');

  // Add Backpack
  await openBackpack(page);

  await expect(page.locator(productsLocators.productName)).toHaveText('Sauce Labs Backpack');

  await addProductToCart(page);

  await expect(page.locator(productsLocators.shoppingCartBadge)).toHaveText('1');

  // Go back to Products
  await goBackToProducts(page);

  await expect(page.locator(productsLocators.pageTitle)).toHaveText('Products');

  // Add Bike Light
  await openBikeLight(page);

  await expect(page.locator(productsLocators.productName)).toHaveText('Sauce Labs Bike Light');

  await addProductToCart(page);

  await expect(page.locator(productsLocators.shoppingCartBadge)).toHaveText('2');

  // Open Cart
  await openCart(page);

  await expect(page.locator(cartLocators.pageTitle)).toHaveText('Your Cart');

});

test('Cart - Verify two products are displayed', async ({ page }) => {

const cartItems = page.locator(cartLocators.cartItems);

  // Verify two products
  await expect(cartItems).toHaveCount(2);

  // Verify Backpack
  await verifyProductInCart(page,'Sauce Labs Backpack');

  // Verify Bike Light
  await verifyProductInCart(page,'Sauce Labs Bike Light');

});

test('Cart - Verify Remove button for each product', async ({ page }) => {

const cartItems = page.locator(cartLocators.cartItems);

// Verify two products
 await expect(cartItems).toHaveCount(2);

// Verify Remove button for each product
 await verifyRemoveButtonForEachProduct(page);

});

test('Cart - Verify Continue Shopping button', async ({ page }) => {

 await expect(page.locator(cartLocators.continueShopping)).toBeVisible();

});

test('Cart - Verify Checkout button', async ({ page }) => {

  await expect(page.locator(cartLocators.checkout)).toBeVisible();

});

test('Cart - Verify all required buttons are displayed', async ({ page }) => {

  // Verify Remove button for each product
  await verifyRemoveButtonForEachProduct(page);

  // Verify Continue Shopping
  await expect(page.locator(cartLocators.continueShopping)).toBeVisible();

   // Verify Checkout
  await expect(page.locator(cartLocators.checkout)).toBeVisible();

});
