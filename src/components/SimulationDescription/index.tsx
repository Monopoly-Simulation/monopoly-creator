import React, { useState, useEffect } from 'react';
import { Descriptions } from 'antd';
import { SimulationResult, JobOutput } from '@/types';
import { emptyJobOutput, emptySimulationResult } from '@/constants';
import db from '@/database';

interface SimulationDescriptionProps {
  className?: string;
  uid: string;
}

const SimulationDescription: React.FC<SimulationDescriptionProps> = ({ className, uid }) => {
  const [, setOutput] = useState<JobOutput>(emptyJobOutput);
  const [selectedSimulation, setSelectedSimulation] = useState<SimulationResult>(emptySimulationResult);
  useEffect(() => {
    (async () => {
      const { output, output: { simulations } } = await db.getResult(uid);
      setOutput(output);
      setSelectedSimulation(simulations[0]);
    })();
  }, [uid]);
  const { avg_round } = selectedSimulation.results;
  return (
    <Descriptions className={className} title="Simulation result" bordered>
      <Descriptions.Item label="Average round number">{avg_round}</Descriptions.Item>
    </Descriptions>
  )
}

export default SimulationDescription

