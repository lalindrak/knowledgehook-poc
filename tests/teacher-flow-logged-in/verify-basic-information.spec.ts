import { test, expect } from '../../src/fixtures/pages'
import { users } from '../../src/config/users';
import teacherData from '../../src/data/teacher.test.data.json'


test.describe('classroom components should be loaded properly', async () => {
  test('verify classroom components are loaded as expected', async ({ myClassesPage }) => {
    await myClassesPage.goto('/')

    await expect(myClassesPage.teachersLounge).toBeVisible()
    await expect(myClassesPage.exploreActivites).toBeVisible()
    await expect(myClassesPage.myClassroom).toBeVisible()
    await expect(myClassesPage.createClassButton).toBeVisible()
  });
})

test.describe('Account settings should display correct information', async () => {
  test('verify account settings are loaded as expected', async ({ myClassesPage, accountSettingsPage }) => {
    await myClassesPage.goto('/')
    await myClassesPage.waitPageLoad()
    await myClassesPage.clickProfileToggleButton()
    await myClassesPage.clickAccountSettings()

    await expect(accountSettingsPage.displayName).toHaveText(teacherData.name)
    await expect(accountSettingsPage.email).toHaveText(users.TEACHER.username)
    await expect(accountSettingsPage.mySchoolName).toHaveText(teacherData.school)
  });
})