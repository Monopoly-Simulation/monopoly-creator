import React from 'react';
import JobTable from '@/components/JobTable';
import classNames from 'classnames/bind';
import styles from './index.module.less';

const cx = classNames.bind(styles);

const Home: React.FC = () => {
  return (
    <div className={cx('home')}>
      <JobTable />
    </div>
  );
}

export default Home;
