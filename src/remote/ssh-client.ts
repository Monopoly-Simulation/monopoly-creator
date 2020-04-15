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

export default class SSHClient {
  private uid = '';

  async connect() {
    return ssh.connect(credential);
  }

  getUid() {
    return this.uid;
  }

  createJobConfig(job: JobProps) {
    const {
      core = 1,
      node = 1,
      hour = 1,
      minute = 0,
      memory = 1000,
      email,
    } = job;
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

  createGameConfig() {
    const gameConfigList = [
      'module purge',
      'module load python/gnu/3.7.3',
      `SRCDIR=${projectDir}/code`,
      'cd $SRCDIR',
      'python main.py',
    ];
    return gameConfigList.join('\n');
  }

  async createJob(job: JobProps) {
    this.uid = uuid();
    const jobConfig = this.createJobConfig(job);
    const gameConfig = this.createGameConfig();
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
