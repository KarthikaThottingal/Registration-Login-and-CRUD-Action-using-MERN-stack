const { Given, When, Then, And } = require('@cucumber/cucumber');
const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');
const User1 = require('C:/Users/karth/Registration-Login-and-CRUD-Action-using-MERN-stack/backend/model/user.js');
const Product = require('C:/Users/karth/Registration-Login-and-CRUD-Action-using-MERN-stack/backend/model/product.js');
dotenv.config();
let response;

// Add Product

When('User send a POST request to {string} request with name, desciption, price, discount, file', async function (endpoint) {
    console.log("IN function");
    try {
        console.log("Token is ", this.token);
        addProductResponse = await request(process.env.URL)
            .post(endpoint)
            .set('token', this.token)  // Use token from previous step
            .field('name', process.env.ValidPName)
            .field('desc', process.env.ValidPDescription)
            .field('price', process.env.ValidPPrice)
            .field('discount', process.env.ValidPDiscount)
            .attach('image', process.env.ValidImagePath);

        console.log("After trigering");
        console.log(addProductResponse.statusCode);
        console.log(addProductResponse.body);
    } catch (addProductError) {
        console.error("Error occurred during POST request:");
        console.error(addProductError);
        addProductResponse = error.addProductResponse || {};
    }
});
Then('User Validate the addProductResponse statuscode should be {int}, status true and message {string}', function (expectedStatusCode, expectedMessage) {
    expect(addProductResponse.statusCode).to.equal(expectedStatusCode);
    expect(addProductResponse.body).to.have.property('title', expectedMessage);
    expect(addProductResponse.body).to.have.property('status', true);
});

When('User send a POST request to {string} request with desciption, price, discount, file', async function (endpoint) {
    console.log("IN function");
    try {
        console.log("Token is ", this.token);
        addProductResponse = await request(process.env.URL)
            .post(endpoint)
            .set('token', this.token)  // Use token from previous step
            .field('name', "")
            .field('desc', process.env.ValidPDescription)
            .field('price', process.env.ValidPPrice)
            .field('discount', process.env.ValidPDiscount)
            .attach('image', process.env.ValidImagePath);

        console.log("After trigering");
        console.log(addProductResponse.statusCode);
        console.log(addProductResponse.body);
    } catch (addProductError) {
        console.error("Error occurred during POST request:");
        console.error(addProductError);
        addProductResponse = error.addProductResponse || {};
    }
});

Then('User Validate the response statuscode for product activities should be {int}', async function (expectedStatusCode) {
    console.log("\n In product related Validation")
    expect(this.productResponseCode).to.equal(expectedStatusCode);
});


When('User send a POST request to {string} request with name, price, discount, file', async function (endpoint) {
    console.log("IN function");
    try {
        console.log("Token is ", this.token);
        addProductResponse = await request(process.env.URL)
            .post(endpoint)
            .set('token', this.token)  // Use token from previous step
            .field('name', process.env.ValidPName)
            .field('desc', "")
            .field('price', process.env.ValidPPrice)
            .field('discount', process.env.ValidPDiscount)
            .attach('image', process.env.ValidImagePath);

        console.log("After trigering");
        console.log(addProductResponse.statusCode);
        console.log(addProductResponse.body);
    } catch (addProductError) {
        console.error("Error occurred during POST request:");
        console.error(addProductError);
        addProductResponse = error.addProductResponse || {};
    }
});
When('User send a POST request to {string} request with name, desciption, discount, file', async function (endpoint) {
    console.log("IN function");
    try {
        console.log("Token is ", this.token);
        addProductResponse = await request(process.env.URL)
            .post(endpoint)
            .set('token', this.token)  // Use token from previous step
            .field('name', process.env.ValidPName)
            .field('desc', process.env.ValidPDescription)
            .field('price', "")
            .field('discount', process.env.ValidPDiscount)
            .attach('image', process.env.ValidImagePath);

        console.log("After trigering");
        console.log(addProductResponse.statusCode);
        console.log(addProductResponse.body);
    } catch (addProductError) {
        console.error("Error occurred during POST request:");
        console.error(addProductError);
        addProductResponse = error.addProductResponse || {};
    }
});

When('User send a POST request to {string} request with name, desciption, price, file', async function (endpoint) {
    console.log("IN function");
    try {
        console.log("Token is ", this.token);
        addProductResponse = await request(process.env.URL)
            .post(endpoint)
            .set('token', this.token)  // Use token from previous step
            .field('name', process.env.ValidPName)
            .field('desc', process.env.ValidPDescription)
            .field('price', process.env.ValidPPrice)
            .field('discount', "")
            .attach('image', process.env.ValidImagePath);

        console.log("After trigering");
        console.log(addProductResponse.statusCode);
        console.log(addProductResponse.body);
    } catch (addProductError) {
        console.error("Error occurred during POST request:");
        console.error(addProductError);
        addProductResponse = error.addProductResponse || {};
    }
});

When('User send a POST request to {string} request with name, desciption, price, discount', async function (endpoint) {
    console.log("IN function");
    try {
        console.log("Token is ", this.token);

        addProductResponse = await request(process.env.URL)
            .post(endpoint)
            .set('token', this.token)  // Use token from previous step
            .field('name', process.env.ValidPName)
            .field('desc', process.env.ValidPDescription)
            .field('price', process.env.ValidPPrice)
            .field('discount', process.env.ValidPDiscount)
            .attach('image', "");

        console.log("After trigering");
        console.log(addProductResponse.statusCode);
        console.log(addProductResponse.body);
    } catch (addProductError) {
        console.error("Error occurred during POST request:");
        console.error(addProductError);
        addProductResponse = error.addProductResponse || {};
    }
});

Then('User Validate the addProductResponse statuscode for product activities should be {int}, status false and message {string}', function (expectedStatusCode, expectedMessage) {
    expect(addProductResponse.statusCode).to.equal(expectedStatusCode);
    expect(addProductResponse.body).to.have.property('errorMessage', expectedMessage);
    expect(addProductResponse.body).to.have.property('status', false);
});


//get Request

When('User send a GET request to {string} to fetch all data', async function (endpoint) {
    console.log("IN get function");
    try {
        console.log("Token is ", this.token);
        getProductResponse = await request(process.env.URL)
            .get(endpoint)
            .set('token', this.token);  // Use token from previous step
        console.log("After trigering");
        console.log(getProductResponse.statusCode);
        console.log(getProductResponse.body);

        // to have product id for delete purpose

        const products = getProductResponse.body.products || [];

        if (products.length) {
        this.productId = products[0]._id;
        console.log("The ID of the first product is:", this.productId);
            }
    

    } catch (getProductError) {
        console.error("Error occurred during get request:");
        console.error(getProductError);
        getProductResponse = error.getProductResponse || {};
    }
});

Then('User Validate the getProductResponse statuscode for product activities should be {int}, status true, with data and title {string}', async function (expectedStatusCode, expectedMessage) {
    expect(getProductResponse.statusCode).to.equal(expectedStatusCode);
    expect(getProductResponse.body).to.have.property('title', expectedMessage);
    expect(getProductResponse.body).to.have.property('status', true);
    expect(getProductResponse.body.products).to.be.an('array').that.is.not.empty;

});


Then('User Validate the getProductResponse statuscode for product activities should be {int}, status false, without data and title {string}', async function (expectedStatusCode, expectedMessage) {
    expect(getProductResponse.statusCode).to.equal(expectedStatusCode);
    expect(getProductResponse.body).to.have.property('errorMessage', expectedMessage);
    expect(getProductResponse.body).to.have.property('status', false);
});



When('User send a POST request to {string} to the first element in the get product list', async function (endpoint) {
    console.log("IN delete function");
    try {
        console.log("Token is ", this.token);
        deleteProductResponse = await request(process.env.URL)
            .post(endpoint)
            .set('token', this.token)
            .send({ id: this.productId });
        // Use token from previous step
        console.log("After trigering");
        console.log(deleteProductResponse.statusCode);
        console.log(deleteProductResponse.body);

    } catch (deleteProductError) {
        console.error("Error occurred during get request:");
        console.error(deleteProductError);
        deleteProductResponse = error.deleteProductResponse || {};
    }

});

Then('User Validate the deleteProductResponse statuscode for product activities should be {int}, status true and title {string}', async function (expectedStatusCode, expectedMessage) {
    expect(deleteProductResponse.statusCode).to.equal(expectedStatusCode);
    expect(deleteProductResponse.body).to.have.property('title', expectedMessage);
    expect(deleteProductResponse.body).to.have.property('status', true);
});


Then('User Validate the deleteProductResponse statuscode for product activities should be {int}, status false and title {string}', async function (expectedStatusCode, expectedMessage) {
    expect(deleteProductResponse.statusCode).to.equal(expectedStatusCode);
    expect(deleteProductResponse.body).to.have.property('errorMessage', expectedMessage);
    expect(deleteProductResponse.body).to.have.property('status', false);
});


When('User send a POST request to {string}  without  product id', async function (endpoint) {
    console.log("In delete function");
    try {
        console.log("Token is ", this.token);
        deleteProductResponse = await request(process.env.URL)
            .post(endpoint)
            .set('token', this.token)
            .send({ id: "" });
        // Use token from previous step
        console.log("After trigering");
        console.log(deleteProductResponse.statusCode);
        console.log(deleteProductResponse.body);

    } catch (deleteProductError) {
        console.error("Error occurred during get request:");
        console.error(deleteProductError);
        deleteProductResponse = error.deleteProductResponse || {};
    }

});

When('User send a POST request to {string} with invalid ID', async function (endpoint) {
    console.log("In delete function");
    try {
        console.log("Token is ", this.token);
        deleteProductResponse = await request(process.env.URL)
            .post(endpoint)
            .set('token', this.token)
            .send({ id: "68889e7ea8006b36a837a007" });
        // Use token from previous step
        console.log("After trigering");
        console.log(deleteProductResponse.statusCode);
        console.log(deleteProductResponse.body);

    } catch (deleteProductError) {
        console.error("Error occurred during get request:");
        console.error(deleteProductError);
        deleteProductResponse = error.deleteProductResponse || {};
    }


});
