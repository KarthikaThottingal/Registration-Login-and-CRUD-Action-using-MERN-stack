export class registerpage {
    constructor(page) {
        this.page = page;
        this.RegisterHeader = page.locator("//h2[contains(text(), 'Register')]");
        this.userName = page.getByPlaceholder('User Name');
        this.password = page.getByPlaceholder('Password');
        this.confirmPassword = page.getByPlaceholder('Confirm Password');
        this.registerButton = page.locator("//button[@type = 'button']/span[text() = 'Register']");
        this.loginButton = page.locator("//button[text() = 'Login']");
    }
}