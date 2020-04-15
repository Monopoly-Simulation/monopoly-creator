export interface DatabaseStructure {
  jobs: Job[];
  results: Result[];
}

export enum JobStatus {
  Running,
  Completed,
}

export interface Job {
  uid: string;
  startTime: number;
  status: JobStatus;
}

export interface Result {
  uid: string;
  output: string;
}
