const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

const testSetup = require("./helpers/testSetup");

testSetup();

describe("questionsController.getQuestions() tests", () => {
  it("GET /game. Expect status 200 with a questions object returned", async () => {
    const res = await request.get("/game");

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
});
