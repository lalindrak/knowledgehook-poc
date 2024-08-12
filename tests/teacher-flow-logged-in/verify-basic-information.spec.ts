import { test, expect } from '../../src/fixtures/pages'
import { users } from '../../src/config/users';
import teacherData from '../../src/data/teacher.test.data.json'
import { Eyes, Target } from '@applitools/eyes-playwright'
const projectName = 'Knowledgehook POC'


test.beforeAll(async () => {
  //setting up the applitools eyes api key
  const eyes = new Eyes();
  eyes.setApiKey(process.env.APPLITOOLS_API_KEY!);
})

test.describe('classroom components should be loaded properly', async () => {
  test('verify classroom components are loaded as expected', async ({ myClassesPage }) => {
    await myClassesPage.goto('/')
    await myClassesPage.waitPageLoad()

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

    const eyes = new Eyes();
    await eyes.open(myClassesPage.page, projectName, test.name);
    await eyes.check('My classes page', Target.window().fully());
    await eyes.close();
  });
})