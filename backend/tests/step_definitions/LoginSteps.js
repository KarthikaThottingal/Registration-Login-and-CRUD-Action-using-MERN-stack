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

When('User send a POST request to {string} request with correct credentials', async function (endpoint) {
    try {
        const user = process.env.UsernameValid1;
        const pass = bcrypt.hashSync(process.env.PasswordValid1, 10);
        console.log("User ", user); console.log("Pass", pass);
        response = await request(process.env.URL)
            .post(endpoint)
            .set('Content-Type', 'application/json')
            .send({
                username: user,  // Use actual test user
                password: pass
            });
        console.log("?\n\n After trigering");
        console.log(response.statusCode);
        console.log(response.body);
        this.token = response.body.token;
    } catch (error) {
        console.error("Error occurred during POST request:");
        console.error(error);

        // Optional: assign error to response for further handling
        response = error.response || {};
    }
});

Then('User Validate the response statuscode should be {int}', function (expectedStatusCode) {
    console.log("\n In Validation")
    expect(response.statusCode).to.equal(expectedStatusCode);
});

Then('User Validate response should include a token, status true and message {string}', function (expectedMessage) {
    expect(response.body).to.have.property('token');
    expect(response.body.message).to.equal(expectedMessage);
    expect(response.body).to.have.property('status', true);
});


When('User send a POST request to {string} request with invalid username', async function (endpoint) {
    try {
        const user = process.env.UsernameInvalid;
        const pass = bcrypt.hashSync(process.env.PasswordValid1, 10);
        console.log("User ", user); console.log("Pass", pass);
        response = await request(process.env.URL)
            .post(endpoint)
            .set('Content-Type', 'application/json')
            .send({
                username: user,  // Use actual test user
                password: pass
            });
        console.log("After trigering");
        console.log(response.statusCode);
        console.log(response.body);
    } catch (error) {
        console.error("Error occurred during POST request:");
        console.error(error);

        // Optional: assign error to response for further handling
        response = error.response || {};
    }
});


When('User send a POST request to {string} request with invalid password', async function (endpoint) {
    try {
        const user = process.env.UsernameInvalid;
        const pass = bcrypt.hashSync(process.env.PasswordInvalid, 10);
        console.log("User ", user); console.log("Pass", pass);
        response = await request(process.env.URL)
            .post(endpoint)
            .set('Content-Type', 'application/json')
            .send({
                username: user,  // Use actual test user
                password: pass
            });
        console.log("After trigering");
        console.log(response.statusCode);
        console.log(response.body);
    } catch (error) {
        console.error("Error occurred during POST request:");
        console.error(error);

        // Optional: assign error to response for further handling
        response = error.response || {};
    }
});

When('User send a POST request to {string} request with empty username and password', async function (endpoint) {
    try {
        response = await request(process.env.URL)
            .post(endpoint)
            .set('Content-Type', 'application/json')
            .send({
                username: "",  // Use actual test user
                password: ""
            });
        console.log("After trigering");
        console.log(response.statusCode);
        console.log(response.body);
    } catch (error) {
        console.error("Error occurred during POST request:");
        console.error(error);

        // Optional: assign error to response for further handling
        response = error.response || {};
    }
});

When('User send a POST request to {string} request with No request body', async function (endpoint) {
    try {
        const user = process.env.UsernameInvalid;
        const pass = bcrypt.hashSync(process.env.PasswordValid1, 10);
        console.log("User ", user); console.log("Pass", pass);
        response = await request(process.env.URL)
            .post(endpoint)
            .set('Content-Type', 'application/json')
            .send({

            });
        console.log("After trigering");
        console.log(response.statusCode);
        console.log(response.body);
    } catch (error) {
        console.error("Error occurred during POST request:");
        console.error(error);

        // Optional: assign error to response for further handling
        response = error.response || {};
    }

});

Then('User Validate response should include a status false and message {string}', function (expectedMessage) {
    expect(response.body.errorMessage).to.equal(expectedMessage);
    expect(response.body.status).to.equal(false);
});
