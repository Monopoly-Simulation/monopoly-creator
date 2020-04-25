import React from 'react';
import classNames from 'classnames/bind';
import CreateForm from '@/components/CreateForm';
import styles from './index.module.less';

const cx = classNames.bind(styles);

const Create: React.FC = () => {
  return (
    <div className={cx('create')}>
      <h2 className={cx('create__header')}>Create a new simulation job</h2>
      <CreateForm />
    </div>
  )
}

export default Create;
