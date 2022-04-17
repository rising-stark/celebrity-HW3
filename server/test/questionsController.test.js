const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

const testSetup = require("./helpers/testSetup");
const {
  testJwt,
  testUsername,
  testUserBestScore,
  testOverallBestScore,
} = require("./helpers/testConstants");

testSetup();

describe("GET /questions. questionsController.getQuestions() tests", () => {
  it("Request with correct credentials. Expect status 200 with a questions object as response", async () => {
    const res = await request
      .get("/questions")
      .set("Cookie", [`jwt=${testJwt}`, `username=${testUsername}`]);

    expect(res.status).toBe(200);

    // Ensuring questions object in response
    const questions = res.body.questions;
    expect(questions).toBeTruthy();
    expect(questions.length).toBe(2);
    for (let i = 0; i < questions.length; i++) {
      expect(questions[i].option1).toBeTruthy();
      expect(questions[i].option2).toBeTruthy();
      expect(questions[i].option3).toBeTruthy();
      expect(questions[i].option4).toBeTruthy();
      expect(questions[i].correct_option).toBeTruthy();
      expect(questions[i].imgUrl).toBeTruthy();
    }
  });

  it("Request without credentials. Expect status 401", async () => {
    const res = await request.get("/questions");

    expect(res.status).toBe(401);
  });
});
