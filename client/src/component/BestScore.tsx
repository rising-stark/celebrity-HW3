import React, { useEffect, useState } from "react";
import { LeaderBoard } from "../constants";
import { Header } from "./Header";
import { Typography } from "antd";
import { fetchLeaderboard } from "../service";

const BestScore = () => {
  const [leaderBoard, setleaderBoard] = useState<LeaderBoard[]>([]);

  useEffect(() => {
    fetchLeaderboard().then((res) => {
      setleaderBoard(res);
    });
  }, []);

  return (
    <>
      <Header />
      <div
        className="h-full text-center items-center"
        style={{
          transform: "translateY(40%)",
          top: "50%",
        }}>
        <Typography.Title data-cy="title-top5">
          Top {leaderBoard.length} Players
        </Typography.Title>
        {leaderBoard.map((item, index) => {
          return (
            <div key={index}>
              {item.username} : {item.bestScore}
            </div>
          );
        })}
      </div>
    </>
  );
};

export { BestScore };
