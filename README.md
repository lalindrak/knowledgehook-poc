# Knowledgehook POC

##### Project is using a single session to execute all tests. Login setup is run for a teacher and student just one time for the whole test suite making the test execution faster and efficient.
##### Using Page Object models for structuring the framework making it faster to automate tests when number of tests are growing and making it easier to maintain as selectors are grouped by their pages(locations).
##### Data is passed through .env files and json files making it faster to read and making tests data driven according to the scenario(running localization tests for multiple languages in a single test).
##### Integrated with Github Actions and publishing reports to gihub pages, integrating with communication media (Slack,Teams) for faster feedback and generating github actions reports for real time insights.
##### Integrated with applitools AI assertions to verify and identify DOM content changes and snapshots easier and smarter.

## Project Setup

- Node must be installed
- Clone the repository, you can use the same information in the .env file or you can replace the teacher and student usernames and passwords with yours. (I can send the actual credentials too)

```yaml
BASE_URL=https://app.knowledgehook.com/app
TEACHER_USERNAME= teacher_email
TEACHER_PASSWORD= teacher_password

STUDENT_USERNAME=student_username
STUDENT_PASSWORD=student_password

AUTH_FILE_PATH=playwright/.auth
APPLITOOLS_API_KEY=applitools_api_key
```



- Install dependencies with `npm install`
- There are some scripts in the package.json file to execute tests
 - `npm run test` will execute all the tests with headed mode
 - `npm run test-headless` will execute all the tests in headless mode
 - `npm run test-current` will execute a single test case: just add the `@current` tag to the end of a test case name

------------

## Test Scenarios

Out of the 10 tests, below shows three of the most interesting test scenarios I have automated in the POC

1. [tests/student-gameshow-flow/student-completes-gameshow.spec.ts](tests/student-gameshow-flow/student-completes-gameshow.spec.ts) - Teacher and student completes a collaborative game show
   
2. [tests/teacher-localization/teacher-loc.spec.ts](tests/teacher-localization/teacher-loc.spec.ts) - Localization for en, fr and es for teacher's welcome page. Testing all three languages with a single test using a data driven approach
   
3. [tests/teacher-flow-logged-in/verify-basic-information.spec.ts](tests/teacher-flow-logged-in/verify-basic-information.spec.ts) - Using appli tools visual AI assertions to verify DOM content and snapshots for easier and faster defect finding

------------

## Running Tests

This section shows the video recordings of the above three tests.

`tests/student-gameshow-flow/student-completes-gameshow.spec.ts`

Video  https://drive.google.com/file/d/1T-ZVMlR-AaI1ArOSoJaYwQetMfSLjCzJ/view?usp=sharing

`tests/teacher-localization/teacher-loc.spec.ts`

Video https://drive.google.com/file/d/191i_H5fG42Tg5KZQYAn7__Ofccr5mT7K/view?usp=sharing

`tests/teacher-flow-logged-in/verify-basic-information.spec.ts`

Video https://drive.google.com/file/d/1dIDUXfwaOmbvI9DcgZbXz7NXOc7Ozjg2/view?usp=sharing


------------

## Reporting

### HTML reporter<img width="1181" alt="image" src="https://github.com/user-attachments/assets/6f9b267d-fa89-4976-a8e8-1ee5a7cde0d6">


### Allure reporter<img width="1391" alt="Screenshot 2024-08-09 at 12 25 15 PM" src="https://github.com/user-attachments/assets/1605e49c-84fc-4476-8a12-3a65708b1d80">
<img width="2764" alt="Screenshot 2024-08-09 at 12 25 32 PM" src="https://github.com/user-attachments/assets/ca781cee-3dc4-4c6f-bde7-269a2c291e31">


### Github Actions reporter<img width="1701" alt="Screenshot 2024-08-09 at 12 16 46 PM" src="https://github.com/user-attachments/assets/96e2b713-20d5-4517-abdf-8b88977eb5ed">



