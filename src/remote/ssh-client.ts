import { v4 as uuid } from 'uuid';
import { Job, Game } from '@/types';
import getGameCommand from './game';
import getJobCommand from './job';
import credential from './credential';

const NodeSSH = window.require('node-ssh');

const ssh = new NodeSSH();
export const projectDir = `/gpfsnyu/home/${credential.username}/monopoly`;

export default class SSHClient {
  private uid = '';

  private async readFile(filePath: string) {
    await this.connect();
    const { stdout } = await ssh.execCommand(`cat ${filePath}`);
    return stdout;
  }

  async connect() {
    return ssh.connect(credential);
  }

  getUid() {
    return this.uid;
  }

  createJobConfig(jobProps: Job) {
    const jobConfigList = [
      '#!/bin/bash',
      getJobCommand(this.uid, jobProps),
    ];
    return jobConfigList.join('\n');
  }

  createGameConfig(gameProps: Game) {
    const gameConfigList = [
      'module purge',
      'module load python/gnu/3.7.3',
      `SRCDIR=${projectDir}/code`,
      'cd $SRCDIR',
      getGameCommand(gameProps),
    ];
    return gameConfigList.join('\n');
  }

  async createJob(job: Job, game: Game) {
    this.uid = uuid();
    const { incomeStepNumber, initialFundingStepNumber, propertyTaxStepNumber, taxStepNumber } = game;
    const coreNumber = incomeStepNumber || initialFundingStepNumber || propertyTaxStepNumber || taxStepNumber || 1;
    job.core = coreNumber;
    const jobConfig = this.createJobConfig(job);
    const gameConfig = this.createGameConfig(game);
    const script = [jobConfig, gameConfig].join('\n');
    await this.connect();
    const scriptPath = `${projectDir}/jobs/job-${this.uid}.sh`;
    await ssh.execCommand(`echo '${script}' >> ${scriptPath}`);
    await ssh.execCommand(`sbatch ${scriptPath}`);
    ssh.dispose();
    return this.uid;
  }

  async retrieveJob(uid = this.uid) {
    return this.readFile(`${projectDir}/output/output-${uid}.o`);
  }

  async retrieveError(uid = this.uid) {
    return this.readFile(`${projectDir}/output/error-${uid}.e`);
  }
}
