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
  tax: number;
  initialFunding: number;
}
