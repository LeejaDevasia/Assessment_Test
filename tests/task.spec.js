const { test, expect } = require('@playwright/test');

const {openSauceDemo,login} = require('../utilities/login.func');

const {
openBackpack,
openBikeLight,
addProductToCart,
goBackToProducts,
openCart
} = require('../utilities/product.func');

const {
removeAllProducts,
verifyCartIsEmpty,
verifyProductInCart,
verifyRemoveButtonForEachProduct,
continueShopping
} = require('../utilities/cart.func');

const productsLocators = require('../locators/product');
const cartLocators = require('../locators/cart');

test('SauceDemo - Add two products and verify cart buttons', async ({ page }) => {

// --------------------------------------------------
// Login
// --------------------------------------------------

await openSauceDemo(page);

await login(
page,
'standard_user',
'secret_sauce'
);

await expect(
page.locator(productsLocators.pageTitle)
).toHaveText('Products');

// --------------------------------------------------
// Clear existing cart
// --------------------------------------------------

await openCart(page);

await expect(
page.locator(cartLocators.pageTitle)
).toHaveText('Your Cart');

await removeAllProducts(page);

await verifyCartIsEmpty(page);

// --------------------------------------------------
// Return to Products
// --------------------------------------------------

await continueShopping(page);

await expect(
page.locator(productsLocators.pageTitle)
).toHaveText('Products');

// --------------------------------------------------
// Add Backpack
// --------------------------------------------------

await openBackpack(page);

await expect(
page.locator(productsLocators.productName)
).toHaveText('Sauce Labs Backpack');

await addProductToCart(page);

await expect(
page.locator(productsLocators.shoppingCartBadge)
).toHaveText('1');

// --------------------------------------------------
// Go back to Products
// --------------------------------------------------

await goBackToProducts(page);

await expect(
page.locator(productsLocators.pageTitle)
).toHaveText('Products');

// --------------------------------------------------
// Add Bike Light
// --------------------------------------------------

await openBikeLight(page);

await expect(
page.locator(productsLocators.productName)
).toHaveText('Sauce Labs Bike Light');

await addProductToCart(page);

await expect(
page.locator(productsLocators.shoppingCartBadge)
).toHaveText('2');

// --------------------------------------------------
// Open Cart
// --------------------------------------------------

await openCart(page);

await expect(
page.locator(cartLocators.pageTitle)
).toHaveText('Your Cart');

// --------------------------------------------------
// Verify products
// --------------------------------------------------

const cartItems = page.locator(cartLocators.cartItems);

await expect(cartItems).toHaveCount(2);

await verifyProductInCart(
page,
'Sauce Labs Backpack'
);

await verifyProductInCart(
page,
'Sauce Labs Bike Light'
);

// --------------------------------------------------
// Verify Remove button for each product
// --------------------------------------------------

await verifyRemoveButtonForEachProduct(page);

// --------------------------------------------------
// Verify Continue Shopping
// --------------------------------------------------

await expect(
page.locator(cartLocators.continueShopping)
).toBeVisible();

// --------------------------------------------------
// Verify Checkout
// --------------------------------------------------

await expect(
page.locator(cartLocators.checkout)
).toBeVisible();

});