import { Given, When, Then, } from "@cucumber/cucumber";
import dotenv from 'dotenv';
import { homePageOperations } from '../pageMethods/homePageOperations.js';
import { loginPageOperations } from '../pageMethods/loginPageOperations.js';

dotenv.config();

Given('User navigates to the login page', async function () {
    // Write code here that turns the phrase above into concrete actions
    this.loginPageOperations_Object = new loginPageOperations(this.page);
    this.homePageOperations_Object = new homePageOperations(this.page);
    console.log("navigate to url :", process.env.URL);
    await this.page.goto(process.env.URL);
});

When('User enters a valid username', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.loginPageOperations_Object.enterUserName(process.env.UsernameValid1);
});

When('User enters a valid password', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.loginPageOperations_Object.enterPassword(process.env.PasswordValid1);
});


When('User clicks the Login button', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.loginPageOperations_Object.clickLoginButton();
});


Then('User should be redirected to the homepage', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.homePageOperations_Object.validateInHomePage();
});

When('User enters an invalid username', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.loginPageOperations_Object.enterUserName(process.env.UsernameInvalid);
});


Then('User clicks the Login button and capture error message', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.loginPageOperations_Object.validateErrorLoginMessage();
});


When('User enters an invalid password', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.loginPageOperations_Object.enterPassword(process.env.PasswordInvalid);
});

When('the username field is left empty', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.loginPageOperations_Object.enterUserName(process.env.UsernameEmpty);
});

When('the password field is left empty', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.loginPageOperations_Object.enterPassword(process.env.PasswordEmpty);
});

Then('the Login button should be disabled', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.loginPageOperations_Object.checkLoginDisabled();
});


