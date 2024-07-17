import { test as base, expect } from '@playwright/test';
import { IUserData } from '../config/users';
import {
    LoginPage,
    MyClassesPage,
    AccountSettingsPage
} from "../pages";



interface PageFixtures {
    loginPage: LoginPage;
    myClassesPage: MyClassesPage;
    accountSettingsPage: AccountSettingsPage
}
export interface TestOptions {
    targetUser: IUserData;
}

const test = base.extend<PageFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await use(loginPage)
    },
    myClassesPage: async ({ page }, use) => {
        const myClassesPage = new MyClassesPage(page)
        await use(myClassesPage)
    },
    accountSettingsPage: async ({ page }, use) => {
        const accountSettingsPage = new AccountSettingsPage(page)
        await use(accountSettingsPage)
    }
});
export { test, expect };
