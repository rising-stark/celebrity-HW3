import React, { useEffect, useState } from 'react';
import { currentPlayerLS } from '../constants';
import { Header } from './Header';
import { Typography } from 'antd';

const BestScore = () => {
  const [leaderBoard, setleaderBoard] = useState<[string, string][]>([]);
  useEffect(() => {
    const n = 5;
    const dict = { ...localStorage };
    let items: [string, string][] = Object.keys(dict).map((key) => [key, dict[key]]);
    items.sort((first, second) => {
      return (second[1] as unknown as number) - (first[1] as unknown as number);
    });
    items = items.filter((item) => item[0] !== currentPlayerLS).slice(0, n);
    setleaderBoard(items);
  }, []);
  return (
    <>
      <Header />
      <div
        className="h-full text-center items-center"
        style={{
          transform: 'translateY(40%)',
          top: '50%',
        }}
      >
        <Typography.Title data-cy="title-top5">Top 5 Players</Typography.Title>
        {leaderBoard.map((item, index) => {
          return (
            <div key={index}>
              {item[0]} : {item[1]}
            </div>
          );
        })}
      </div>
    </>
  );
};

export { BestScore };
