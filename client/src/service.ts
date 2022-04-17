import axios from "axios";
import { CelebDatum, LeaderBoard } from "./constants";

const host = "http://localhost:5000";
const nonLoggedinMsg = "You need to be loggedin to access this page";

function fetchAllCeleb(): Promise<CelebDatum[]> {
  return new Promise<CelebDatum[]>((resolve) => {
    axios
      .get(`${host}/questions`, { withCredentials: true })
      .then((res) => {
        resolve(res.data.questions);
      })
      .catch((e) => {
        console.error(e);
        if (e.response.status === 401) {
          alert(nonLoggedinMsg);
          window.location.href = "/login";
        } else {
          alert(e.response.data);
        }
      });
  });
}

function fetchLeaderboard(): Promise<LeaderBoard[]> {
  return new Promise<LeaderBoard[]>((resolve) => {
    axios
      .get(`${host}/leaderboard`, { withCredentials: true })
      .then((res) => {
        return resolve(res.data.leaderboard);
      })
      .catch((e) => {
        console.error(e);
        if (e.response.status === 401) {
          alert(nonLoggedinMsg);
          window.location.href = "/login";
        } else {
          alert(e.response.data);
        }
      });
  });
}

function fetchScore(username: String): Promise<any> {
  return new Promise<any>((resolve) => {
    axios
      .get(`${host}/users/${username}`, { withCredentials: true })
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        console.error(e);
        if (e.response.status === 401) {
          alert(nonLoggedinMsg);
          window.location.href = "/login";
        } else {
          alert(e.response.data);
        }
      });
  });
}

function updateScore(username: String, bestScore: Number): Promise<Number> {
  return new Promise<Number>((resolve) => {
    axios
      .put(
        `${host}/users/${username}`,
        { bestScore },
        { withCredentials: true }
      )
      .then((res) => {
        resolve(res.status);
      })
      .catch((e) => {
        console.error(e);
        if (e.response.status === 401) {
          alert(nonLoggedinMsg);
          window.location.href = "/login";
        } else {
          alert(e.response.data);
        }
      });
  });
}

function login(username: String): Promise<any> {
  return new Promise<any>((resolve) => {
    axios.post(`${host}/login`, { username }).then((res) => {
      resolve(res);
    });
  }).catch((e) => {
    console.error(e);
    alert(e.response.data);
  });
}

function deleteAccount(username: String): Promise<Number> {
  return new Promise<Number>((resolve) => {
    axios
      .delete(`${host}/users/${username}`, { withCredentials: true })
      .then((res) => {
        resolve(res.status);
      })
      .catch((e) => {
        console.error(e);
        if (e.response.status === 401) {
          alert(nonLoggedinMsg);
          window.location.href = "/login";
        } else {
          alert(e.response.data);
        }
      });
  });
}

function authorise(): Promise<Number> {
  return new Promise<Number>((resolve) => {
    axios
      .post(`${host}/auth`, { withCredentials: true })
      .then((res) => {
        resolve(res.status);
      })
      .catch((e) => {
        console.error(e);
        if (e.response.status === 401) {
          alert(nonLoggedinMsg);
        } else {
          alert(e.response.data);
        }
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
  authorise,
};
