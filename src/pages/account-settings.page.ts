import { Locator, Page } from "@playwright/test";

export class AccountSettingsPage {

    readonly page: Page
    readonly displayName: Locator
    readonly email: Locator
    readonly mySchoolName: Locator

    constructor(page: Page) {
        this.page = page
        this.displayName = page.locator('[class="settings-section-container"]').first().locator('div').nth(4)
        this.email = page.locator('.col-lg-6.col-md-5.col-sm-12.d-flex.align-items-center.preserve-line-breaks.ellipsis').nth(3)
        this.mySchoolName=page.locator('[class="settings-section-container"]').nth(1).locator('div').nth(6)
    }
    async goto(path: string) {
        await this.page.goto(path)
    }
    async refreshPage() {
        await this.page.reload()
    }
    async waitPageLoad() {
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
    }
}