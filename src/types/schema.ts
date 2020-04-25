export interface Job {
  core?: number;
  node?: number;
  hour?: number;
  minute?: number;
  memory?: number;
  email: string;
}

export interface Game {
  game: number;
  player: number;
  round: number;
  income: number;
  incomeStep?: number;
  incomeStepNumber?: number;
  tax: number;
  taxStep?: number;
  taxStepNumber?: number;
  initialFunding: number;
  initialFundingStep?: number;
  initialFundingStepNumber?: number;
}

export interface PlayerSettings {
  buy_s: number;
  buy_para: number;
  trade_s: number;
  trade_para: number;
  upgrade_para: number;
  income: number;
  tax: number;
  start_capital: number;
}

export interface GameResult {
  bankrupt_turn: Record<number, number>;
  winner: number;
  end: number;
}

export interface GameAnalysis {
  avg_time: number;
  avg_round: number;
  total_time: number;
}

export interface SimulationResult {
  settings: PlayerSettings[];
  details: Record<number, GameResult>;
  results: GameAnalysis;
}

export interface JobOutput {
  simulations: SimulationResult[];
}


