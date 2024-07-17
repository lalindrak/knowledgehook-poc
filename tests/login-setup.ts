import { test as setup, expect } from '../src/fixtures/pages'
import { users } from '../src/config/users';

setup.describe('Save auth state for teacher login', async () => {

  setup('perform successful login as a teacher admin as save auth state', async ({ loginPage, myClassesPage }) => {
    await setup.step('navigate to app and perform login', async () => {
      await loginPage.goto('/app/login')
      await loginPage.loginAsTeacherAdmin(users.TEACHER.username, users.TEACHER.password)
      await loginPage.waitPageLoad()
    })
    await setup.step('verify the user is logged as as teacher', async () => {
      await expect(myClassesPage.teachersLounge).toBeVisible()
    })
    await setup.step('save login state', async () => {
      await loginPage.storeAuthStateForUser('TEACHER');
    })
  });
})
