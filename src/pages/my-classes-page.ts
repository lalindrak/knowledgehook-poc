import { Locator, Page } from "@playwright/test";

export class MyClassesPage {

    readonly page: Page
    readonly teachersLounge: Locator
    readonly exploreActivites: Locator
    readonly myClassroom: Locator
    readonly createClassArea: Locator
    readonly profileToggle: Locator
    readonly accountSettingsMenuItem: Locator
    readonly createClassButton: Locator
    readonly createClassHeading: Locator
    readonly inputClassName: Locator
    readonly selectGradeDropDown: Locator
    readonly createClassSubmit: Locator
    readonly knowledgehookNavigationButton: Locator
    readonly className: Locator
    readonly grade: Locator
    readonly classSettingsButton: Locator
    readonly archiveClassOption: Locator
    readonly createdClass: Locator
    readonly yesOptionFromArchive: Locator
    readonly tryGameShow: Locator
    readonly studentNavBar: Locator
    readonly gameShowPendingExitButton: Locator
    readonly reportsHeading: Locator
    readonly teacherLoungeLoc: Locator
    readonly accountSettingsLoc: Locator
    readonly createClassBanner: Locator

    constructor(page: Page) {
        this.page = page
        this.teachersLounge = page.locator('a').filter({ hasText: /^Teachers’ Lounge$/ })
        this.exploreActivites = page.locator('a').filter({ hasText: /^Explore Activities$/ })
        this.myClassroom = page.locator('a').filter({ hasText: /^My Classroom$/ })
        this.createClassArea = page.locator('div').filter({ hasText: /^Create Class$/ }).first()
        this.profileToggle = page.locator('.toggle-group.d-flex.align-items-center').nth(1)
        this.accountSettingsMenuItem = page.getByRole('button', { name: 'Account settings' })
        this.createClassButton = page.getByText('Create Class')
        this.createClassHeading = page.getByText('CREATE CLASS', { exact: true })
        this.inputClassName = page.locator('[type="text"]')
        this.selectGradeDropDown = page.locator('[aria-label="Select Grade"]').nth(1)
        this.createClassSubmit = page.getByRole('button', { name: 'Create Class' })
        this.knowledgehookNavigationButton = page.locator('.logo.d-none.d-tablet-block.mr-small')
        this.className = page.locator('#ClassMgmtClassPremium').locator('[class="labelName"]')
        this.grade = page.locator('.class-box__course.kh-black')
        this.classSettingsButton = page.locator('.btn.btn-default.ClassMgmtMenuBtn')
        this.archiveClassOption = page.getByText('Archive Class')
        this.createdClass = page.locator('.class-box').locator('#ClassMgmtClassPremium')
        this.yesOptionFromArchive = page.getByRole('button', { name: 'Yes' })
        this.tryGameShow = page.getByRole('cell', { name: 'Try a GameShow' })
        this.studentNavBar = page.locator("[class='bottom-nav student-game-navbar']")
        this.gameShowPendingExitButton = page.locator("[class='btn btn-lg btn-default spacer-md']")
        this.reportsHeading = page.locator("h1").getByText('Reports')
        this.teacherLoungeLoc = page.locator("//span[@class='nav-item-label medium-title-text grey-accessible d-none d-default-block']")
        this.accountSettingsLoc = page.locator("//kh-dropdown-menu-item[contains(@class,'first-account-menu-section')]").first()
        this.createClassBanner = page.locator("[class='popover-content popover-body']")

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
    async clickProfileToggleButton() {
        await this.profileToggle.click()
    }
    async clickAccountSettings() {
        await this.accountSettingsMenuItem.click()
    }
    async clickCreateClassButton() {
        await this.createClassButton.click()
    }
    async createClass(className: string, grade: string) {
        await this.inputClassName.fill(className)
        await this.selectGradeDropDown.selectOption(grade)
        await this.createClassSubmit.click()
    }
    async clickKnowledgehookNavigationButton() {
        await this.knowledgehookNavigationButton.click()
        await this.waitPageLoad()
    }
    async clickArchiveCreatedClass() {
        await this.classSettingsButton.click()
        await this.archiveClassOption.click()
        await this.yesOptionFromArchive.click()
    }
    async clickTryGameShow() {
        await this.tryGameShow.click()
    }
    async clickExitFromGameShowIfAlreadyPending() {
        await this.page.waitForTimeout(8000)
        if (await this.gameShowPendingExitButton.isVisible()) {
            await this.gameShowPendingExitButton.click()
        }
    }
    async textContent(selector: string) {
        return await this.page.textContent(selector)
    }
    async clickAccountSettingsLoc() {
        await this.accountSettingsLoc.click()
    }
    async 
}