import { test, expect } from '../../src/fixtures/pages'


test.describe('Invalid login attempts are handled successfully', async () => {

    let invalidUsernames = ['lalindra.kawshika1', 'lalindra.kawshika']
    for (let username of invalidUsernames) {
        test(`perform invalid login attempts with invalid ${username}`, async ({ loginPage }) => {
            await loginPage.goto('/app/login')
            await loginPage.loginAsTeacherAdminWrongUsername(username)

            await expect(loginPage.invalidLoginErrorMessage).toBeVisible()
            await expect(loginPage.invalidLoginErrorMessage).toHaveText(/Account not found/)
        })
    }
})
