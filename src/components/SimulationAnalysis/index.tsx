import React from 'react';
import { Descriptions } from 'antd';
import { GameAnalysis, BaseProps } from '@/types';

interface SimulationResultProps extends BaseProps {
  result: GameAnalysis;
}

const SimulationAnalysis: React.FC<SimulationResultProps> = ({ result, className }) => {
  const { avg_round, total_time, avg_time } = result;
  return (
    <Descriptions className={className} title="Simulation result" bordered>
      <Descriptions.Item label="Average round number">{avg_round}</Descriptions.Item>
      <Descriptions.Item label="Running time">{total_time}</Descriptions.Item>
      <Descriptions.Item label="Average running time">{avg_time}</Descriptions.Item>
    </Descriptions>
  );
}

export default SimulationAnalysis;
