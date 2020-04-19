import React, { useState, useEffect } from 'react';
import { Descriptions } from 'antd';
import { Game } from '@/types';
import db from '@/database';

interface GameSettingsDescriptionProps {
  uid: string;
}

const GameSettingsDescription: React.FC<GameSettingsDescriptionProps> = ({ uid }) => {
  const [{
    game, player, round, income, tax, initialFunding,
  }, setGame] = useState<Game>({
    game: 0,
    player: 0,
    round: 0,
    income: 0,
    tax: 0,
    initialFunding: 0
  });
  useEffect(() => {
    (async () => {
      const { gameSettings } = await db.getJob(uid);
      setGame(gameSettings);
    })();
  }, [uid]);
  return (
    <Descriptions title="Game settings" bordered>
      <Descriptions.Item label="Number of games">{game}</Descriptions.Item>
      <Descriptions.Item label="Number of players">{player}</Descriptions.Item>
      <Descriptions.Item label="Maximum round limit">{round}</Descriptions.Item>
      <Descriptions.Item label="Salary">{income}</Descriptions.Item>
      <Descriptions.Item label="Tax">{tax}%</Descriptions.Item>
      <Descriptions.Item label="Initial funding">{initialFunding}</Descriptions.Item>
    </Descriptions>
  )
}

export default GameSettingsDescription;
