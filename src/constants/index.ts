import { JobOutput, SimulationResult } from '@/types';

export const emptyJobOutput: JobOutput = {
  simulations: [],
}

export const emptySimulationResult: SimulationResult = {
  settings: [],
  details: {},
  results: {
    avg_time: 0,
    avg_round: 0,
    total_time: 0,
  }
}
