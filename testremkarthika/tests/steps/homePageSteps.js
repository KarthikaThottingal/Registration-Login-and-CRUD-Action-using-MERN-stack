import { Given, When, Then, } from "@cucumber/cucumber";
import dotenv from 'dotenv';
import { homePageOperations } from '../pageMethods/homePageOperations.js';
import { loginPageOperations } from '../pageMethods/loginPageOperations.js';

dotenv.config();

Given('User logs into the app dashboard', async function () {
    this.loginPageOperations_Object = new loginPageOperations(this.page);
    this.homePageOperations_Object = new homePageOperations(this.page);
    console.log("navigate to url :", process.env.URL);
    await this.page.goto(process.env.URL);
    await this.loginPageOperations_Object.logIntoApp(process.env.UsernameValid1, process.env.PasswordValid1);
    await this.homePageOperations_Object.validateInHomePage();
    this.initialTableData = await this.homePageOperations_Object.getTableData();
    console.log(this.initialTableData);

});

Then('User click on logout', async function () {
    await this.homePageOperations_Object.logOut();
});

// Add Product Functions
When('User clicks on Add product', async function () {
    await this.homePageOperations_Object.clickAddProduct();
});

When('User enters product details: name, description, price, discount, and upload an image', async function () {
    await this.homePageOperations_Object.enterDetails();
});

When('User clicks on the Add Product button and confirm success message', async function () {
    await this.homePageOperations_Object.clickAddProductButton();
});

Then('User confirms the product data is present in the dashboard', async function () {
    //updated TableData
    console.log("Before getting data in update table");
    this.updatedTableData = await this.homePageOperations_Object.getTableData();
    console.log("After getting data in update table");
    await this.homePageOperations_Object.dashboardVerificationAfterAdd(this.initialTableData, this.updatedTableData);
});

Then('User enters product details without a product name: description, price, discount, and uploads an image', async function () {
    await this.homePageOperations_Object.enterDetailsWithoutName();
});

Then('User enters product details without a product description: product name, price, discount, and uploads an image', async function () {
    await this.homePageOperations_Object.enterDetailsWithoutDescription();
});

Then('User verifies that the Add Product button is disabled and click on cancel button', async function () {
    await this.homePageOperations_Object.verifyAddProdDisabledDoCancel();
});

Then('User enters product details without a price: product name, description, discount, and uploads an image', async function () {
    await this.homePageOperations_Object.enterDetailsWithoutPrice();
});

Then('User enters product details without a discount: product name, description, price, and uploads an image', async function () {
    await this.homePageOperations_Object.enterDetailsWithoutDiscount();
});

Then('User enters product details without a image: product name, description, price, and discount', async function () {
    await this.homePageOperations_Object.enterDetailsWithoutImage();
});




// Edit Product Functions
When('User clicks on Edit product', async function () {
    this.toChangeTableData = await this.homePageOperations_Object.clickEditProduct();
    console.log(this.toChangeTableData);

});

When('User changes all  product details: name, description, price, discount, and upload an image', async function () {
    await this.homePageOperations_Object.editProductDetailsChange();
});

Then('User clicks on the Edit Product button and confirm success message', async function () {
    await this.homePageOperations_Object.clickEditProductAndSuccessMessage();
});

Then('User confirms the product data is present in the dashboard after edit', async function () {
    this.updatedTableData = await this.homePageOperations_Object.getTableData();
    await this.homePageOperations_Object.dashboardVerificationAfterEdit(this.updatedTableData);
});


When('User remove the Product Name', async function () {
    await this.homePageOperations_Object.removeProductName();
});

Then('User change only  Product Name', async function () {
    await this.homePageOperations_Object.changeProductName();
});

Then('User verifies that the Edit Product button is disabled and cancel button Enabled', async function () {
    await this.homePageOperations_Object.verifyChangeProdDisabledDoCancel();
});

Then('User confirms the product data is present in the dashboard after name', async function () {
    this.updatedTableData = await this.homePageOperations_Object.getTableData();
    await this.homePageOperations_Object.dashboardVerificationAfterEditName(this.updatedTableData);

});

When('User remove the Product Description', async function () {
    await this.homePageOperations_Object.removeProductDescription();
});

Then('User change only  Product Description', async function () {
    await this.homePageOperations_Object.changeProductDescription();
});

Then('User confirms the product data is present in the dashboard after description', async function () {
    this.updatedTableData = await this.homePageOperations_Object.getTableData();
    await this.homePageOperations_Object.dashboardVerificationAfterEditDescription(this.updatedTableData);
});


When('User remove the Product Price', async function () {
    await this.homePageOperations_Object.removeProductPrice();
});

Then('User change only  Product Price', async function () {
    await this.homePageOperations_Object.changeProductPrice();
});

Then('User confirms the product data is present in the dashboard after price', async function () {
    this.updatedTableData = await this.homePageOperations_Object.getTableData();
    await this.homePageOperations_Object.dashboardVerificationAfterEditPrice(this.updatedTableData);
});

When('User remove the Product Discount', async function () {
    await this.homePageOperations_Object.removeProductDiscount();
});


Then('User change only  Product Discount', async function () {
    await this.homePageOperations_Object.changeProductDiscount();
});

Then('User confirms the product data is present in the dashboard after discount', async function () {
    this.updatedTableData = await this.homePageOperations_Object.getTableData();
    await this.homePageOperations_Object.dashboardVerificationAfterEditDiscount(this.updatedTableData);
});

// Delete Product
When('User clicks on Delete product', async function () {
   await this.homePageOperations_Object.clickDeleteProduct();
});



Then('User verify popup message', async function () {
    await this.homePageOperations_Object.clickDeleteProductAndSuccessMessage();

});





