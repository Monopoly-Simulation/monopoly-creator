import React from 'react';
import { Descriptions } from 'antd';
import { PlayerSettings } from '@/types';

interface PlayerSettingsItemProps {
  player: PlayerSettings;
}

const PlayerSettingsItem: React.FC<PlayerSettingsItemProps> = ({ player }) => {
  const { start_capital, income, tax } = player;
  return (
    <Descriptions>
      <Descriptions.Item label="Initial funding">{start_capital}</Descriptions.Item>
      <Descriptions.Item label="Salary">{income}</Descriptions.Item>
      <Descriptions.Item label="Tax">{tax}</Descriptions.Item>
    </Descriptions>
  )
}

export default PlayerSettingsItem;
