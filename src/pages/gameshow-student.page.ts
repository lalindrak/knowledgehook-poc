import { Locator, Page } from "@playwright/test";

export class GameShowStudentPage {
    readonly page: Page
    //locators for game show student page
    readonly classCode: Locator
    readonly teacherGameShowLogo: Locator
    readonly inviteStudentsButton: Locator
    readonly studentProfileMenu: Locator
    readonly joinClassMenuItem: Locator
    readonly joinClassIdTextBox: Locator
    readonly joinClassButton: Locator
    readonly joinGameShowButton: Locator
    //locators for answering questions
    readonly selectAnswerFromList: Locator
    readonly submitButton: Locator
    readonly submitButtonFreeQuestion: Locator
    readonly yeahCorrectAnswer: Locator
    readonly questionNumber: Locator
    readonly answerTextBox: Locator
    readonly finishGameButton: Locator
    //locators for rating game show and closure
    readonly rateThisGame: Locator
    readonly iCanDoMyOwnButton: Locator
    readonly doneButton: Locator
    readonly youAreInHeading: Locator

    constructor(page: Page) {
        this.page = page
        this.teacherGameShowLogo = page.locator('kh-gameshow-teacher-header').getByRole('link')
        this.inviteStudentsButton = page.getByRole('button', { name: 'Invite Students' })
        this.classCode = page.locator('[class="class-code-text"]').nth(1)
        this.studentProfileMenu = page.getByRole('button', { name: 'Sandali P' })
        this.joinClassMenuItem = page.locator('kh-student-dropdown-menu').getByText('Join a class')
        this.joinClassIdTextBox = page.getByRole('textbox', { name: 'Class Code' })
        this.joinClassButton = page.getByRole('button', { name: 'join class' })
        this.joinGameShowButton = page.locator("[data-icon='chevron-right']").first()
        this.selectAnswerFromList = page.locator('p')
        this.submitButton = page.locator("[id='GameplaySubmitSelected']")
        this.submitButtonFreeQuestion = page.locator("[class='btn btn-primary btn-lg ng-star-inserted']")
        this.yeahCorrectAnswer = page.locator("[data-icon='fire']")
        this.questionNumber = page.locator("[class='GameplayQuestionNumber ng-star-inserted']")
        this.answerTextBox = page.locator("[type='text']")
        this.finishGameButton = page.getByRole('button', { name: 'Finish Game' })
        this.rateThisGame = page.locator("h2").getByText('Rate this')
        this.iCanDoMyOwnButton = page.getByRole('row', { name: 'I can do this on my own!' }).getByRole('button')
        this.doneButton = page.getByRole('link', { name: 'Done' })
        this.youAreInHeading = page.locator("[class='first-heading']")
    }

    async joinGameShowByClassCode(classcode: string) {
        await this.studentProfileMenu.click()
        await this.joinClassMenuItem.click()
        await this.joinClassIdTextBox.fill(classcode)
        await this.joinClassButton.click()
        await this.joinGameShowButton.click({ force: true })
        await this.page.waitForTimeout(3000)
        const pageUrl = this.page.url()
        if (pageUrl.includes('home')) {
            await this.page.locator("[label='Solve']").click()
            await this.page.locator("[label='Main']").click()
            await this.joinGameShowButton.click({ force: true });
        }
        await this.page.waitForTimeout(2000)
    }
    async goto(path: string) {
        await this.page.goto(path)
    }
    async selectAnswerFromMultipleChoice(answer: string) {
        await this.selectAnswerFromList.getByText(answer).click()
        await this.submitButton.click()
        await this.yeahCorrectAnswer.click()
    }
    async verifyStudentIsInQuestionNumber() {
        return await this.questionNumber.innerText()
    }
    async typeAnswerInTextBox(answer: string) {
        await this.answerTextBox.fill(answer)
        await this.submitButtonFreeQuestion.click()
        await this.yeahCorrectAnswer.click()
    }
    async clickFinishGame() {
        await this.finishGameButton.click()
    }
    async rateGameShow() {
        await this.page.waitForTimeout(1000)
        await this.iCanDoMyOwnButton.click()
        await this.doneButton.click()
    }

}
