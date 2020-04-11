import React, { useState } from 'react';
import classNames from 'classnames/bind';
import remote from '@/remote';
import styles from './index.less';

const cx = classNames.bind(styles)

function App() {
  const [info, setInfo] = useState('Hello world');
  const handleStart = async () => {
    setInfo('waiting...');
    try {
      await remote.createJob({
        email: 'yz3352@nyu.edu'
      });
      setInfo('done');
    } catch {
      setInfo('connection failed');
    }
  }
  const handleSearch = async () => {
    setInfo('waiting...');
    try {
      const output = await remote.retrieveJob();
      setInfo(output);
    } catch {
      setInfo('connection failed');
    }
  }
  return (
    <div className="App">
      <pre className={cx('red')}>{info}</pre>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default App;
