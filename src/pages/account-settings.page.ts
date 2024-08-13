import { Locator, Page } from "@playwright/test";

export class AccountSettingsPage {

    readonly page: Page
    //locators for account settings page
    readonly displayName: Locator
    readonly email: Locator
    readonly mySchoolName: Locator
    readonly pointerAccountLanguage: Locator
    readonly languageDropDownMenu: Locator

    constructor(page: Page) {
        this.page = page
        //initializing locators for the Account Settings elements
        this.displayName = page.locator('[class="settings-section-container"]').first().locator('div').nth(4)
        this.email = page.locator('.col-lg-6.col-md-5.col-sm-12.d-flex.align-items-center.preserve-line-breaks.ellipsis').nth(3)
        this.mySchoolName = page.locator('[class="settings-section-container"]').nth(1).locator('div').nth(6)
        this.pointerAccountLanguage = page.locator("//kh-settings-value[@label='Account language']//div[contains(@class,'pointer')]").first()
        this.languageDropDownMenu = page.locator("[aria-controls='dropdown-menu']").first()

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
    async changeLanguage(language: string) {
        await this.pointerAccountLanguage.click()
        await this.languageDropDownMenu.click()
        switch (language) {
            case 'en': {
                await this.page.getByRole('button', { name: 'English' }).nth(1).click();
                break;
            }
            case 'es': {
                await this.page.getByRole('button', { name: 'Español' }).click();
                break;
            }
            case 'fr': {
                await this.page.getByRole('button', { name: 'Français' }).click();
                break;
            }
            default:
                console.log("No such language exists!")
        }
        await this.page.waitForTimeout(1000)
    }
    async changeLanguageToEnglish() {
        await this.pointerAccountLanguage.click()
        await this.languageDropDownMenu.click()
        await this.page.getByRole('button', { name: 'English' }).click();
    }
}