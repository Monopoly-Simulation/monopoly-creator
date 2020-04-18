import { v4 as uuid } from 'uuid';
import credential from './credential';

const NodeSSH = window.require('node-ssh');

const ssh = new NodeSSH();
const projectDir = `/gpfsnyu/home/${credential.username}/monopoly`;

interface JobProps {
  core?: number;
  node?: number;
  hour?: number;
  minute?: number;
  memory?: number;
  email: string;
}

interface GameProps {
  game: number;
  player: number;
  round: number;
  income: number;
  tax: number;
  initialFunding: number;
}

export default class SSHClient {
  private uid = '';

  async connect() {
    return ssh.connect(credential);
  }

  getUid() {
    return this.uid;
  }

  createJobConfig(jobProps: JobProps) {
    const {
      core = 4,
      node = 4,
      hour = 1,
      minute = 0,
      memory = 2000,
      email,
    } = jobProps;
    const jobConfigList = [
      '#!/bin/bash',
      `#SBATCH -n ${core}`,
      `#SBATCH -N ${node}`,
      `#SBATCH -t 0-${hour}:${minute}`,
      `#SBATCH --mem=${memory}`,
      `#SBATCH -o ${projectDir}/output/output-${this.uid}.o`,
      `#SBATCH -e ${projectDir}/output/error-${this.uid}.e`,
      '#SBATCH --mail-type=ALL',
      `#SBATCH --mail-user=${email}`,
    ];
    return jobConfigList.join('\n');
  }

  createGameConfig(gameProps: GameProps) {
    const {
      game, player, round, income, tax, initialFunding
    } = gameProps;
    const gameConfigList = [
      'module purge',
      'module load python/gnu/3.7.3',
      `SRCDIR=${projectDir}/code`,
      'cd $SRCDIR',
      `python monopoly.py -v -n ${game} -p ${player} -r ${round} -i ${income} 0 1 -tax ${tax / 100} 0 1 -sc ${initialFunding} 0 1`,
    ];
    return gameConfigList.join('\n');
  }

  async createJob(job: JobProps, game: GameProps) {
    this.uid = uuid();
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
    await this.connect();
    const { stdout } = await ssh.execCommand(`cat ${projectDir}/output/output-${uid}.o`);
    return stdout;
  }
}
