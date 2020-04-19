import { Job, Config } from '@/types';
import { projectDir } from './ssh-client';

class JobConfig implements Config {
  private uid: string;
  private settings: Job;

  constructor(uid: string, settings: Job) {
    this.uid = uid;
    this.settings = settings;
  }

  getCoreParam() {
    const { core = 1 } = this.settings;
    return `#SBATCH -n ${core}`;
  }

  getNodeParam() {
    const { node = 1 } = this.settings;
    return `#SBATCH -N ${node}`;
  }

  getTimeParam() {
    const { hour = 1, minute = 0 } = this.settings;
    return `#SBATCH -t 0-${hour}:${minute}`;
  }

  getMemoryParam() {
    const { memory = 2000 } = this.settings;
    return `#SBATCH --mem=${memory}`;
  }

  getOutputFileParam() {
    return `#SBATCH -o ${projectDir}/output/output-${this.uid}.o`;
  }

  getErrorFileParam() {
    return `#SBATCH -e ${projectDir}/output/error-${this.uid}.e`;
  }

  getEmailParam() {
    const { email } = this.settings;
    return [
      '#SBATCH --mail-type=ALL',
      `#SBATCH --mail-user=${email}`,
    ].join('\n');
  }

  getCommand() {
    const parameters: string[] = [
      this.getCoreParam(),
      this.getNodeParam(),
      this.getTimeParam(),
      this.getMemoryParam(),
      this.getOutputFileParam(),
      this.getErrorFileParam(),
      this.getEmailParam(),
    ];
    return parameters.join('\n');
  }
}

export default function getJobCommand(uid: string, job: Job) {
  return new JobConfig(uid, job).getCommand();
}
