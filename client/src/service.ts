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

export { fetchAllCeleb, fetchLeaderboard };
