import React, { useState } from 'react';
import JobTable from '@/components/JobTable';
import ImportButton from '@/components/ImportButton';
import ExportButton from '@/components/ExportButton';
import classNames from 'classnames/bind';
import styles from './index.module.less';

const cx = classNames.bind(styles);

const Home: React.FC = () => {
  const [importCount, setImportCount] = useState(0);
  const handleImportFinish = () => {
    setImportCount(count => count + 1);
  }
  return (
    <div className={cx('home')}>
      <div className={cx('btn-group')}>
        <ImportButton className={cx('btn-group__import')} onFinish={handleImportFinish} />
        <ExportButton />
      </div>
      <JobTable key={importCount} />
    </div>
  );
}

export default Home;
