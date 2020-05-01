import { JobOutput, SimulationResult, Game } from '@/types';

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

export const emptyGame: Game = {
  game: 0,
  player: 0,
  round: 0,
  income: 0,
  tax: 0,
  propertyTax: 0,
  initialFunding: 0,
}
