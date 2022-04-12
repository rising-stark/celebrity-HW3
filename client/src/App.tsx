import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './component/Login';
import { Game } from './component/Game';
import { Score } from './component/Score';
import { BestScore } from './component/BestScore';

const App = () => (
  <div className="w-full h-full">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/score" element={<Score />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderBoard" element={<BestScore />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export { App };
