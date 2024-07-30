import { Locator, Page } from "@playwright/test";

export class CurriculumPage {
    readonly page: Page
    readonly activityName: Locator
    readonly question: Locator
    readonly playGameShowButton: Locator

    constructor(page: Page) {
        this.page = page
        this.activityName = page.locator('[class="card-title branch-group-title"]')
        this.question = page.locator('kh-activity-box-content')
        this.playGameShowButton = page.locator('a').filter({ hasText: 'Play GameShowLive group' })
    }

    async selectActivityTypeByName(activityName: string) {
        await this.activityName.getByText(activityName).click()
    }
    async selectQuestionTypeAndPlayGameShow(question: string) {
        await this.question.filter({ hasText: question }).getByRole('button').first().click()
        await this.playGameShowButton.click()
    }
}