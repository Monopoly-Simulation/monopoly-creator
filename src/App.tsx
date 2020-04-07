import React, { useState } from 'react';
import credential from './credential';

const NodeSSH = window.require('node-ssh');
const ssh = new NodeSSH();

function App() {
  const [info, setInfo] = useState('Hello world');
  const handleStart = async () => {
    setInfo('connecting...');
    try {
      await ssh.connect(credential);
      setInfo('executing...');
      const sbatchList = [
        '#!/bin/bash',
        '#SBATCH -n 1',
        '#SBATCH -N 1',
        '#SBATCH -t 0-5:00',
        '#SBATCH --mem=2000',
        '#SBATCH -o /gpfsnyu/home/yz3352/monopoly/output/output-test.o',
        '#SBATCH -e /gpfsnyu/home/yz3352/monopoly/output/error-test.e',
        '#SBATCH --mail-type=ALL',
        '#SBATCH --mail-user=yz3352@nyu.edu',
        'module purge',
        'module load python/gnu/3.7.3',
        'SRCDIR=$HOME/monopoly/code',
        'cd $SRCDIR',
        'python main.py',
      ];
      await ssh.execCommand(`echo '${sbatchList.join('\n')}' >> $HOME/monopoly/jobs/job-test.sh`);
      await ssh.execCommand('sbatch $HOME/monopoly/jobs/job-test.sh');
      setInfo('done');
      ssh.dispose();
    } catch {
      setInfo('connection failed');
    }
  }
  const handleSearch = async () => {
    setInfo('connecting...');
    await ssh.connect(credential);
    try {
      const { stdout } = await ssh.execCommand('cat $HOME/monopoly/output/output-test.o');
      setInfo(stdout);
    } catch {
      setInfo('connection failed');
    }
  }
  return (
    <div className="App">
      <pre>{info}</pre>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default App;
