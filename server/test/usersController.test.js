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

describe("POST /login. usersController.login() tests", () => {
  it("Expect status 200 for a new user with username and jwt objects as response", async () => {
    const res = await request.post("/login").send({
      username: "test_new_username",
    });

    expect(res.status).toBe(200);

    // Ensuring username object in response
    const username = res.body.username;
    expect(username).toBe("test_new_username");

    // Ensuring jwt object in response
    const jwt = res.body.jwt;
    expect(jwt).toBeTruthy();
  });

  it("Expect status 200 for a user that is already present with username and jwt objects as response", async () => {
    const res = await request.post("/login").send({
      username: testUsername,
    });

    expect(res.status).toBe(200);

    // Ensuring username object in response
    const username = res.body.username;
    expect(username).toBe(testUsername);

    // Ensuring jwt object in response
    const jwt = res.body.jwt;
    expect(jwt).toBeTruthy();
  });

  it("Expect status 400 for sending the request without the username", async () => {
    const res = await request.post("/login");

    expect(res.status).toBe(400);
  });
});

describe("GET /leaderboard. usersController.getLeaderboard() tests", () => {
  it("Request with correct credentials. Expect status 200 with a leaderboard object as response", async () => {
    const res = await request
      .get("/leaderboard")
      .set("Cookie", [`jwt=${testJwt}`, `username=${testUsername}`]);

    expect(res.status).toBe(200);

    // Ensuring leaderboard object in response
    const leaderboard = res.body.leaderboard;
    expect(leaderboard).toBeTruthy();
    for (let i = 0; i < leaderboard.length; i++) {
      expect(leaderboard[i].username).toBeTruthy();
      expect(leaderboard[i].bestScore).toBeGreaterThanOrEqual(0);
      expect(leaderboard[i]._id).toBeFalsy();
      expect(leaderboard[i].tokens).toBeFalsy();
    }
  });

  it("Request without credentials. Expect status 401", async () => {
    const res = await request.get("/leaderboard");

    expect(res.status).toBe(401);
  });
});

describe("GET /users/:username. usersController.getScore() tests", () => {
  it("Request with correct credentials. Expect status 200 for a user that is present with myScore & bestScore objects as response.", async () => {
    const res = await request
      .get(`/users/${testUsername}`)
      .set("Cookie", [`jwt=${testJwt}`, `username=${testUsername}`]);

    expect(res.status).toBe(200);
    // Ensuring myScore object in response
    const myScore = res.body.myScore;
    expect(myScore).toBeTruthy();
    expect(myScore.bestScore).toBe(testUserBestScore);
    expect(myScore._id).toBeFalsy();
    expect(myScore.tokens).toBeFalsy();
    expect(myScore.username).toBeFalsy();

    // Ensuring bestScore object in response
    const bestScore = res.body.bestScore[0];
    expect(bestScore).toBeTruthy();
    expect(bestScore.bestScore).toBe(testOverallBestScore);
    expect(bestScore.username).toBeTruthy();
    expect(bestScore._id).toBeFalsy();
    expect(bestScore.tokens).toBeFalsy();
  });

  it("Request with wrong credentials. Expect status 401 for a user that is NOT present.", async () => {
    const res = await request
      .get("/users/not_present_username")
      .set("Cookie", [`jwt=${testJwt}`, `username=not_present_username`]);

    expect(res.status).toBe(401);
  });

  it("Request without credentials. Expect status 401", async () => {
    const res = await request.get(`/users/${testUsername}`);

    expect(res.status).toBe(401);
  });
});

describe("PUT /users/:username. usersController.updateScore() tests", () => {
  it("Request with correct credentials. Expect status 200 for a user that is present", async () => {
    const res = await request
      .put(`/users/${testUsername}`)
      .set("Cookie", [`jwt=${testJwt}`, `username=${testUsername}`])
      .send({
        bestScore: 4,
      });

    expect(res.status).toBe(200);
  });

  it("Request with wrong credentials. Expect status 401 for a user that is NOT present.", async () => {
    const res = await request
      .put("/users/not_present_username")
      .set("Cookie", [`jwt=${testJwt}`, `username=not_present_username`])
      .send({
        bestScore: 4,
      });

    expect(res.status).toBe(401);
  });

  it("Request without credentials. Expect status 401", async () => {
    const res = await request.put(`/users/${testUsername}`).send({
      bestScore: 4,
    });

    expect(res.status).toBe(401);
  });
});

describe("DELETE /users/:username. usersController.deleteUser() tests", () => {
  it("Request with correct credentials. Expect status 200 for a user that is present.", async () => {
    const res = await request
      .delete(`/users/${testUsername}`)
      .set("Cookie", [`jwt=${testJwt}`, `username=${testUsername}`]);

    expect(res.status).toBe(200);
  });

  it("Request with wrong credentials. Expect status 401 trying to delete the same user again or a user that is not present", async () => {
    const res = await request
      .delete(`/users/${testUsername}`)
      .set("Cookie", [`jwt=${testJwt}`, `username=${testUsername}`]);

    expect(res.status).toBe(401);
  });

  it("Request without credentials. Expect status 401", async () => {
    const res = await request.delete(`/users/${testUsername}`);

    expect(res.status).toBe(401);
  });
});
