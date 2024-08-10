import { test, expect } from '../../src/fixtures/pages'
import localizationData from '../../src/data/localization.data.json'




test.describe('localization tests for teacher welcome page', async () => {
    test('verify localization is working as expected for teacher home page @localization', async ({ myClassesPage, accountSettingsPage }) => {
        await myClassesPage.goto('/')

        for (const [lang, textFeilds] of Object.entries(localizationData)) {

            await myClassesPage.clickProfileToggleButton()
            await myClassesPage.clickAccountSettingsLoc()
            await accountSettingsPage.changeLanguage(lang)
            await myClassesPage.clickKnowledgehookNavigationButton()

            const teachersLounge = await myClassesPage.teacherLoungeLoc.nth(0).textContent()
            expect(teachersLounge).toStrictEqual(textFeilds.teacherLounge)

            const exploreActivites = await myClassesPage.teacherLoungeLoc.nth(1).textContent()
            expect(exploreActivites).toStrictEqual(textFeilds.exploreActivities)

            const myClassroom = await myClassesPage.teacherLoungeLoc.nth(2).textContent()
            expect(myClassroom).toStrictEqual(textFeilds.myClassroom)

            const createClassBanner = await myClassesPage.createClassBanner.textContent()
            expect(createClassBanner).toStrictEqual(textFeilds.createClassBanner)

            console.log(`Success for ${lang}: Localization is working as expected`);
        }

        await myClassesPage.clickProfileToggleButton()
        await myClassesPage.clickAccountSettingsLoc()
        await accountSettingsPage.changeLanguageToEnglish()
        await myClassesPage.clickKnowledgehookNavigationButton()
    });
})
