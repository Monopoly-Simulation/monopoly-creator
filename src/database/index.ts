import { PartialBy } from '@/types';
import remote from '@/remote';
import { DatabaseStructure, JobStatus, JobLine, ResultLine } from './schema';

const low = window.require('lowdb');
const FileSync =  window.require('lowdb/adapters/FileSync');
const { remote: electronRemote } = window.require('electron');

const userDataPath = electronRemote.app.getPath('userData');
let adapter = new FileSync<DatabaseStructure>(`${userDataPath}/db.json`);
let db = low(adapter);

db.defaults<DatabaseStructure>({
  jobs: [],
  results: [],
}).write();

class Database {
  refresh() {
    adapter = new FileSync<DatabaseStructure>(`${userDataPath}/db.json`);
    db = low(adapter);
  }

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
    return result;
  }

  async checkJob(uid: string): Promise<JobStatus> {
    const result = await remote.retrieveJob(uid);
    const error = await remote.retrieveError(uid);
    if (!result && !error) {
      return JobStatus.Running;
    } else if (error) {
      await db.get('jobs')
        .find({ uid })
        .assign({ status: JobStatus.Error })
        .write();
      return JobStatus.Error;
    }
    await db.get('jobs')
      .find({ uid })
      .assign({ status: JobStatus.Completed })
      .write();
    await db.get('results')
      .push({
      uid,
      output: JSON.parse(result),
    }).write();
    return JobStatus.Completed;
  }

  async deleteJobAndResult(uid: string) {
    await db.get('jobs').remove({ uid }).write();
    await db.get('results').remove({ uid }).write();
  }
}

export default new Database();
