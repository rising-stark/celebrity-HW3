import axios from "axios";
import { CelebDatum, LeaderBoard } from "./constants";

const host = "http://localhost:5000";

function fetchAllCeleb(): Promise<CelebDatum[]> {
  return new Promise<CelebDatum[]>((resolve) => {
    axios.get(`${host}/game`).then((res) => {
      resolve(res.data.questions);
    });
  });
}

function fetchLeaderboard(): Promise<LeaderBoard[]> {
  return new Promise<LeaderBoard[]>((resolve) => {
    axios.get(`${host}/leaderboard`).then((res) => {
      resolve(res.data.leaderboard);
    });
  });
}

function fetchScore(username: String): Promise<any> {
  return new Promise<any>((resolve) => {
    axios.get(`${host}/users/${username}`).then((res) => {
      resolve(res.data);
    });
  });
}

function updateScore(username: String, bestScore: Number): Promise<Number> {
  return new Promise<Number>((resolve) => {
    axios.put(`${host}/users/${username}`, { bestScore }).then((res) => {
      resolve(res.status);
    });
  });
}

function login(username: String): Promise<any> {
  return new Promise<any>((resolve) => {
    axios.post(`${host}/login`, { username }).then((res) => {
      resolve(res);
    });
  });
}

function deleteAccount(username: String): Promise<Number> {
  return new Promise<Number>((resolve) => {
    axios.delete(`${host}/users/${username}`).then((res) => {
      resolve(res.status);
    });
  });
}

export {
  fetchAllCeleb,
  fetchLeaderboard,
  login,
  deleteAccount,
  fetchScore,
  updateScore,
};
