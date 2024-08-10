import { test, expect } from '../../src/fixtures/pages'
import teacherData from '../../src/data/teacher.test.data.json'



test.describe('teacher and student can complete a live gameshow', async () => {
    test.only('verify teacher and student can conduct the live gameshow and fuctionality is as expected',
        async ({ myClassesPage, curriculumPage, gameShowTeacherPage, gameShowStudentPage }) => {
            await myClassesPage.goto('/')
            await myClassesPage.clickCreateClassButton()

            await expect(myClassesPage.createClassHeading).toBeVisible()

            await myClassesPage.createClass(teacherData.className, teacherData.grade)
            await myClassesPage.waitPageLoad()
            await myClassesPage.clickTryGameShow()
            await curriculumPage.selectActivityTypeByName('AG Solve using Linear Systems')
            await curriculumPage.selectQuestionTypeAndPlayGameShow('Interpret the intersection')

            await expect(gameShowTeacherPage.teacherGameShowLogo).toBeVisible()

            await gameShowTeacherPage.clickInviteStudents()
            const classCode = await gameShowTeacherPage.classCode.innerText()

            await gameShowStudentPage.goto('/')
            await gameShowStudentPage.joinGameShowByClassCode(classCode)

            await gameShowTeacherPage.refreshPage()
            await gameShowTeacherPage.clickPlayGameShow()

            //student and teacher doing the game show from here
            expect(await gameShowStudentPage.verifyStudentIsInQuestionNumber()).toContain('Question 1')

            await gameShowStudentPage.selectAnswerFromMultipleChoice('Super Shape is cheaper if number of visits is fewer than 5 per month.')
            await gameShowTeacherPage.clickContinueGame()

            expect(await gameShowStudentPage.verifyStudentIsInQuestionNumber()).toContain('Question 2')

            await gameShowStudentPage.typeAnswerInTextBox('6')

            await gameShowTeacherPage.clickContinueGame()

            expect(await gameShowStudentPage.verifyStudentIsInQuestionNumber()).toContain('Question 3')

            await gameShowStudentPage.selectAnswerFromMultipleChoice('10')

            await gameShowTeacherPage.clickGameResultsAndFinishGame()

            await gameShowStudentPage.clickFinishGame()

            await expect(gameShowStudentPage.rateThisGame).toBeVisible()

            await gameShowStudentPage.rateGameShow()

            await gameShowTeacherPage.clickDoneGameShowFeedback()

            await expect(myClassesPage.reportsHeading).toBeVisible()

            await myClassesPage.clickKnowledgehookNavigationButton()
            await myClassesPage.clickArchiveCreatedClass()
            await myClassesPage.waitPageLoad()

            await expect(myClassesPage.createdClass).toBeHidden()
        });
})
