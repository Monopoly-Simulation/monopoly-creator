import { PartialBy } from '@/types';
import remote from '@/remote';
import { DatabaseStructure, JobStatus, Job, Result } from './schema';

const low = window.require('lowdb');
const FileSync =  window.require('lowdb/adapters/FileSync');

const adapter = new FileSync<DatabaseStructure>('db.json');
const db = low(adapter);

db.defaults<DatabaseStructure>({
  jobs: [],
  results: [],
}).write();

class Database {
  async addJob(job: PartialBy<Job, 'startTime' | 'status'>) {
    const newJob = Object.assign({
      startTime: Date.now(),
      status: JobStatus.Running,
    }, job);
    await db.get('jobs').push(newJob).write();
  }

  async getAllJobs() {
    const jobs = await db.get('jobs').orderBy('startTime', 'desc').value();
    return jobs;
  }

  async addResult(result: Result) {
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
}

export default new Database();
