import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import { Header } from "./Header";
import { useCookies } from "react-cookie";

interface StateProps {
  score?: number;
  best?: number;
}

const Score = () => {
  const state = useLocation().state as StateProps;
  const [cookies] = useCookies();
  const navigate = useNavigate();

  if (state.best === undefined || state.score === undefined) {
    navigate("/");
  }

  if (state.best === state.score || state.best === 0) {
    message.success("New High Score!\nCongratulations!");
  }

  if (state === null || state === undefined) {
    navigate("/");
    return <></>;
  } else {
    return (
      <>
        <Header />
        <div
          style={{
            transform: "translateY(50%)",
            top: "50%",
          }}
          className="h-full text-center items-center">
          <div>Player: {cookies.username}</div>
          <div>Score : {state.score}</div>
          {<div>Best : {state.best}</div> && state.best !== state.score}
          <Link style={{ color: "blue" }} to="/game">
            Play Again
          </Link>
        </div>
      </>
    );
  }
};

export { Score };
