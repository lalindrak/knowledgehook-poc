import { Locator, Page } from "@playwright/test";

export class GameShowTeacherPage {
    readonly page: Page
    //locators for gameshow teacher page
    readonly teacherGameShowLogo: Locator
    readonly inviteStudentsButton: Locator
    readonly classCode: Locator
    //locators for live gameshow 
    readonly playButton: Locator
    readonly continuteButton: Locator
    readonly nextQuestion: Locator
    readonly gameResultsButton: Locator
    readonly finishGameButton: Locator
    readonly doneButton: Locator

    constructor(page: Page) {
        this.page = page
        this.teacherGameShowLogo = page.locator('kh-gameshow-teacher-header').getByRole('link')
        this.inviteStudentsButton = page.getByRole('button', { name: 'Invite Students' })
        this.classCode = page.locator('[class="class-code-text"]').nth(1)
        this.playButton = page.getByRole('button', { name: 'Play' })
        this.continuteButton = page.getByRole('button', { name: 'Continue' })
        this.nextQuestion = page.getByRole('button', { name: 'Next Question' })
        this.finishGameButton = page.getByRole('button', { name: 'Finish Game' })
        this.doneButton = page.getByRole('button', { name: 'Done' })
        this.gameResultsButton = page.getByRole('button', { name: 'Game Results' })
    }

    async clickInviteStudents() {
        await this.inviteStudentsButton.click({ force: true })
    }
    async clickPlayGameShow() {
        await this.playButton.click({ force: true, timeout: 5000 })
    }
    async refreshPage() {
        await this.page.reload()
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.waitForTimeout(5000)
    }
    async clickContinueGame() {
        await this.continuteButton.click({ force: true })
        await this.page.waitForTimeout(1000)
        await this.nextQuestion.click({ force: true })
    }
    async clickGameResultsAndFinishGame() {
        await this.gameResultsButton.click()
        await this.finishGameButton.click()
    }
    async clickDoneGameShowFeedback() {
        await this.doneButton.click()
    }
}
