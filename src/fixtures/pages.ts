import { test as base, expect } from '@playwright/test';
import { IUserData } from '../config/users';
import {
    LoginPage,
    MyClassesPage,
    AccountSettingsPage,
    CurriculumPage,
    GameShowTeacherPage,
    GameShowStudentPage
} from "../pages";



interface PageFixtures {
    loginPage: LoginPage;
    myClassesPage: MyClassesPage;
    accountSettingsPage: AccountSettingsPage
    curriculumPage: CurriculumPage
    gameShowTeacherPage: GameShowTeacherPage
    gameShowStudentPage: GameShowStudentPage
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
    },
    curriculumPage: async ({ page }, use) => {
        const curriculumPage = new CurriculumPage(page)
        await use(curriculumPage)
    },
    gameShowTeacherPage: async ({ page }, use) => {
        const gameShowTeacherPage = new GameShowTeacherPage(page)
        await use(gameShowTeacherPage)
    },
    gameShowStudentPage: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: 'playwright/.auth/STUDENT.state.json' });
        const gameShowStudentPage = new GameShowStudentPage(await context.newPage());
        await use(gameShowStudentPage);
    },
});
export { test, expect };
