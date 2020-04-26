import React, { useState, useEffect } from 'react';
import { Descriptions } from 'antd';
import { SimulationResult, JobOutput } from '@/types';
import { emptyJobOutput, emptySimulationResult } from '@/constants';
import SimulationSelect from '@/components/SimulationSelect';
import db from '@/database';

interface SimulationDescriptionProps {
  className?: string;
  uid: string;
}

const SimulationDescription: React.FC<SimulationDescriptionProps> = ({ className, uid }) => {
  const [output, setOutput] = useState<JobOutput>(emptyJobOutput);
  const [simulations, setSimulations] = useState<SimulationResult[]>([]);
  const [selectedSimulation, setSelectedSimulation] = useState<SimulationResult>(emptySimulationResult);
  useEffect(() => {
    (async () => {
      const { output, output: { simulations } } = await db.getResult(uid);
      setOutput(output);
      setSimulations(simulations);
      setSelectedSimulation(simulations[0]);
    })();
  }, [uid]);
  const handleSimulationChange = (value: number) => {
    setSelectedSimulation(simulations[value]);
  }
  const { avg_round } = selectedSimulation.results;
  return (
    <div className={className}>
      <SimulationSelect defaultValue={0} length={simulations.length} onChange={handleSimulationChange} />
      <Descriptions title="Simulation result" bordered>
        <Descriptions.Item label="Average round number">{avg_round}</Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default SimulationDescription

