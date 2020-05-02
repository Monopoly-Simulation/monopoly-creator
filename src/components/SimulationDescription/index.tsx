import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { SimulationResult, JobOutput, BaseProps } from '@/types';
import { emptyJobOutput, emptySimulationResult } from '@/constants';
import Subtitle from '@/components/Subtitle';
import SimulationSelect from '@/components/SimulationSelect';
import PlayerSettingsList from '@/components/PlayerSettingsList';
import SimulationAnalysis from '@/components/SimulationAnalysis';
import ResultChart from '@/components/ResultChart';
import db from '@/database';
import styles from './index.module.less';

const cx = classNames.bind(styles);

interface SimulationDescriptionProps extends BaseProps {
  uid: string;
}

const SimulationDescription: React.FC<SimulationDescriptionProps> = ({ className, uid }) => {
  const [, setOutput] = useState<JobOutput>(emptyJobOutput);
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
  return (
    <div className={className}>
      <Subtitle>Result chart</Subtitle>
      <ResultChart result={simulations} />
      <Subtitle>Simulation statistics</Subtitle>
      <SimulationSelect defaultValue={0} length={simulations.length} onChange={handleSimulationChange} />
      <Subtitle>Players</Subtitle>
      <PlayerSettingsList players={selectedSimulation.settings} />
      <SimulationAnalysis className={cx('desc')} result={selectedSimulation.results} />
    </div>
  );
}

export default SimulationDescription

