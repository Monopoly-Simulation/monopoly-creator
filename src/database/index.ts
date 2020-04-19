import { PartialBy } from '@/types';
import remote from '@/remote';
import { DatabaseStructure, JobStatus, JobLine, ResultLine } from './schema';

const low = window.require('lowdb');
const FileSync =  window.require('lowdb/adapters/FileSync');

const adapter = new FileSync<DatabaseStructure>('db.json');
const db = low(adapter);

db.defaults<DatabaseStructure>({
  jobs: [],
  results: [],
}).write();

class Database {
  async addJob(job: PartialBy<JobLine, 'startTime' | 'status'>) {
    const newJob = Object.assign({
      startTime: Date.now(),
      status: JobStatus.Running,
    }, job);
    await db.get('jobs').push(newJob).write();
  }

  async getJob(uid: string) {
    const job = await db.get('jobs').find({ uid }).value();
    return job;
  }

  async getAllJobs() {
    const jobs = await db.get('jobs').orderBy('startTime', 'desc').value();
    return jobs;
  }

  async addResult(result: ResultLine) {
    await db.get('results').push(result).write();
  }

  async getResult(uid: string) {
    const result = await db.get('results').find({ uid }).value();
    return result.output;
  }

  async checkJob(uid: string): Promise<boolean> {
    const result = await remote.retrieveJob(uid);
    if (!result) {
      return false;
    }
    await db.get('jobs')
      .find({ uid })
      .assign({ status: JobStatus.Completed })
      .write();
    await db.get('results')
      .push({
      uid,
      output: result,
    }).write();
    return true;
  }

  async deleteJobAndResult(uid: string) {
    await db.get('jobs').remove({ uid }).write();
    await db.get('results').remove({ uid }).write();
  }
}

export default new Database();
