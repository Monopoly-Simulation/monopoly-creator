import { Game, JobOutput } from '@/types';

export interface DatabaseStructure {
  jobs: JobLine[];
  results: ResultLine[];
}

export enum JobStatus {
  Running,
  Completed,
}

export interface JobLine {
  uid: string;
  startTime: number;
  status: JobStatus;
  gameSettings: Game;
}

export interface ResultLine {
  uid: string;
  output: JobOutput;
}
