const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

const testSetup = require('./helpers/testSetup');
const {
  testJwt,
  testUsername,
} = require('./helpers/testConstants');

testSetup();

describe('GET /questions. questionsController.getQuestions() tests', () => {
  it('Request with correct credentials. Expect status 200 with a questions object as response', async () => {
    const res = await request
      .get('/questions')
      .set('Cookie', [`jwt=${testJwt}`, `username=${testUsername}`]);

    expect(res.status).toBe(200);

    // Ensuring questions object in response
    const { questions } = res.body;
    expect(questions).toBeTruthy();
    questions.forEach((q) => {
      expect(q.option1).toBeTruthy();
      expect(q.option2).toBeTruthy();
      expect(q.option3).toBeTruthy();
      expect(q.option4).toBeTruthy();
      expect(q.correct_option).toBeTruthy();
      expect(q.imgUrl).toBeTruthy();
    });
  });

  it('Request without credentials. Expect status 401', async () => {
    const res = await request.get('/questions');

    expect(res.status).toBe(401);
  });
});
