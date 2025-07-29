import { loginpage } from '../Pages/loginpage.js';
import { homepage } from '../Pages/homepage.js';
import { expect } from '@playwright/test';

export class loginPageOperations {
    constructor(page) {
        this.page = page;
        this.loginPage = new loginpage(page);
        this.homepage = new homepage(page);
    }


    async enterUserName(usernameValue) {
        try {
            await expect(this.loginPage.LoginHeader).toBeVisible();
            const usernameString = String(usernameValue);
            await this.loginPage.userName.fill(usernameString);
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in enterUserName:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async enterPassword(passwordValue) {
        try {
            const passwordString = String(passwordValue);
            await this.loginPage.password.fill(passwordValue);
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in enterPassword:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async clickLoginButton() {
        try {
            await this.loginPage.loginButton.click();
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in clickLoginButton:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async logIntoApp(usernameValue, passwordValue) {
        try {
            await expect(this.loginPage.LoginHeader).toBeVisible();
            const usernameString = String(usernameValue);
            await this.loginPage.userName.fill(usernameString);
            const passwordString = String(passwordValue);
            await this.loginPage.password.fill(passwordValue);
            await this.loginPage.loginButton.click();
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in logIntoApp:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }


    async validateErrorLoginMessage() {
        try {
            // capturing popup
            console.log("before capturing error");
            await this.loginPage.loginButton.click();
            await expect(this.loginPage.incorrectWrong).toBeVisible();
            await expect(this.loginPage.errormessageText).toBeVisible();
            await expect(this.loginPage.okButton).toBeVisible();
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in validateErrorLoginMessage:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');
            }
            throw error;
        }
    }

    async checkLoginDisabled() {
        try {
            await expect(this.loginPage.loginButton).toBeDisabled();
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in checkLoginDisabled:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }


}