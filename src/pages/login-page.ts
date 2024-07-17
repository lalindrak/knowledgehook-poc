import { Locator, Page } from "@playwright/test";

export class LoginPage {

    readonly page: Page
    readonly studentLogin: Locator
    readonly teacherAdminLogin: Locator
    readonly parentLogin: Locator
    readonly inputUsername: Locator
    readonly buttonContinue: Locator
    readonly inputPassword: Locator
    readonly buttonLogin: Locator
    readonly teachersLounge: Locator
    readonly invalidLoginErrorMessage: Locator

    authFile = (key: string) => `${process.env.AUTH_FILE_PATH}/${key}.state.json`;

    constructor(page: Page) {
        this.page = page
        this.studentLogin = page.getByText('Student')
        this.teacherAdminLogin = page.getByText('Teacher / Admin')
        this.parentLogin = page.getByText('Parent')
        this.inputUsername = page.getByRole('textbox', { name: 'Email address or username' })
        this.buttonContinue = page.getByRole('button', { name: 'Continue' })
        this.inputPassword = page.getByRole('textbox', { name: 'Password' })
        this.buttonLogin = page.getByRole('button', { name: 'Log in' })
        this.teachersLounge = page.locator('a').filter({ hasText: /^Teachers’ Lounge$/ })
        this.invalidLoginErrorMessage=page.locator('.kh-small-text.kh-text-error')
    }
    async goto(path: string) {
        await this.page.goto(path)
    }
    async refreshPage() {
        await this.page.reload()
    }

    async loginAsTeacherAdmin(username: string, password: string) {
        await this.teacherAdminLogin.click()
        await this.inputUsername.fill(username)
        await this.buttonContinue.click()
        await this.inputPassword.fill(password)
        await this.buttonLogin.click()
    }
    async loginAsTeacherAdminWrongUsername(username:string){
        await this.teacherAdminLogin.click()
        await this.inputUsername.fill(username)
        await this.buttonContinue.click()
    }
    async waitPageLoad() {
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
    }
    async storeAuthStateForUser(key: string) {
        await this.page.context().storageState({ path: this.authFile(key) });
    }
}