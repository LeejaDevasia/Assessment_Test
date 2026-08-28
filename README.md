Project is based on page object model. 
All the locators are in the locators folder and the locators are stacked in appropriate js files. 
All the functions are in utility folder which will help to reduce the duplication and save time and space
All the functions are written in tests folder and the tests are seperated based on thier functionality
Login function covered in login.spec.js, Cart functionalities tests are covered in cart.spec.js and product functionalities related test cases are added in product.spec.js
For local run of a spec file , npx playwright test file name, ex: npx playwright test cart 
Project is now working with the headed mode so the tests run will show up in browser.
If it needs to be run in headless mode please go to playwright.config.js file and comment headless: false
The login and product functions are covered user journeys, cart is covering the visibility check of buttons in cart and remove button functionality in cart
Making sure the cart is empty or if any items exists already in the cart it gets removed before test. 
