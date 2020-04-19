import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PageHeader } from 'antd';
import classNames from 'classnames/bind';
import GameSettingsDescription from '@/components/GameSettingsDescription';
import styles from './index.module.less';

const cx = classNames.bind(styles);

interface JobPageParams {
  uid: string;
}

const Job: React.FC = () => {
  const { uid } = useParams<JobPageParams>();
  const history = useHistory();
  const handleBack = () => {
    history.push('/');
  }
  return (
    <div className={cx('job')}>
      <PageHeader
        className={cx('job__header')}
        onBack={handleBack}
        title="Job detail"
        subTitle={`ID: ${uid}`}
      />
      <GameSettingsDescription uid={uid} />
    </div>
  )
}

export default Job;
