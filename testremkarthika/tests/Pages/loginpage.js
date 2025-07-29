export class loginpage {
    constructor(page) {
        this.page = page;
        this.LoginHeader = page.locator("//h2[contains(text(), 'Login')]");
        this.userName = page.getByPlaceholder('User Name');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.locator("//button[@type = 'button']/span[text() = 'Login']");
        this.registerButton = page.locator("//button[text() = 'Register']");



        // LoginPage error box
        this.incorrectWrong = page.locator("//div[contains(@class, 'swal-icon swal-icon--error')]");
        this.errormessageText = page.locator("//div[text()='Username or password is incorrect!']");
        this.okButton = page.locator("//button[text()='OK']");

    }
}