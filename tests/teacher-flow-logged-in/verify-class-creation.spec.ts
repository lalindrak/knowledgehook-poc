import { test, expect } from '../../src/fixtures/pages'
import teacherData from '../../src/data/teacher.test.data.json'


test.describe('create class functionality', async () => {
    test('verify teacher can create a class and functionality is as expected', async ({ myClassesPage }) => {
        await myClassesPage.goto('/')
        await myClassesPage.clickCreateClassButton()

        await expect(myClassesPage.createClassHeading).toBeVisible()

        await myClassesPage.createClass(teacherData.className, teacherData.grade)
        await myClassesPage.waitPageLoad()
        await myClassesPage.clickKnowledgehookNavigationButton()
        await myClassesPage.refreshPage()

        await expect(myClassesPage.className).toHaveText(teacherData.className)
        await expect(myClassesPage.grade).toHaveText(teacherData.grade)

        await myClassesPage.clickArchiveCreatedClass()
        await myClassesPage.waitPageLoad()

        await expect(myClassesPage.createdClass).toBeHidden()
    });
})