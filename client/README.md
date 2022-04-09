[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-f059dc9a6f8d3a56e377f745f24479a46679e63a5d9fe6f495e02850cd0d8118.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7147606&assignment_repo_type=AssignmentRepo)
# CIS350 HW3: Guess The Celebrity (Frontend/Backend communication, Testing, CI)

## Instructions:
In this assignment, we will reuse the HW2 code.
We will write a module that will implement the frontend/backend communication (using fetch or axios) and test the entire app. 

## HW2 Code
- Git clone HW3 repository locally
- Locally copy all files in HW 2 App and paste them into newly created HW 3 folder
- Push changes to HW 3 Repository


## JS Module Specifications:
- You will create a module that will implement all the messages between the view and the controller.
- The messages are the HTTP requests listed in your sequence diagrams and the REST API documentation
- Create a separate function for each HTTP request 
- You will use fetch or axios to send HTTP requests


## Testing and CI Specifications: 
- You should thoroughly test your webapp
- Your Jest unit and UI tests should achieve the highest code coverage possible: **>= 70% statements coverage) for full credit** 
- All your tests must pass (delete failing tests)
- Update the **.travis.yml** file accordingly (Travis is down right now. We will let you know when it is back up).
- Run your test on the **unit-tests branch** (with code coverage report)
- Run your UI tests on the **ui-tests branch** (with code coverage report)
- You must use mocking (fetch and/or axios commands) in your unit tests


### Cypress: End-to-End Testing
- You must two of the following scenarios
1. A player enters their username, and the next view is loaded
2. A player answers a question
3. A player displays the leaders
4. A player displays all the players
5. A player deletes their information

It is up to you to decide what test assertions to run for each scenario.
You should create 2 separate test files, one for each scenario.

## GitHub Specifications/Flow: 
- Copy your App (HW2) code into the repository
- You should have a main branch
- You should have a unit-test branch that has your main code + only unit-tests
- You should have a ui-test branch that has your main code + only react tests
- You should have a end-to-end-test branch. Your cypress tests will be run manually by the TAs (should not be linked to Travis)
- You must use a git branching strategy while working on the homework
- In order to run your test, merge your development/feature branches into the unit-test or ui-test branches before merging into main

## Validation:
- Put all the fetching code in a separate module (JS file).
- Your JSX must be clean, readable, and ESLint warning-free. You will use the Airbnb Javascript style. 
- You must implement all the data fetching operations in separate module(s) (not inside the react component file(s)).
- You may not use jQuery or any other JavaScript library package in this assignment. You may, however, use any JavaScript built-in functions and the test libraries covered in class. 

## Submission:
- Do not forget to submit on Gradescope (manual TA submissions carry a 10% penalty).
- Do not forget to regularly commit your work to GitHub.
- Only the last push before the due date will be graded.
- Include a text file in the main branch with the URL to your GitHub repo
- Please add your collaborator on gradescope




