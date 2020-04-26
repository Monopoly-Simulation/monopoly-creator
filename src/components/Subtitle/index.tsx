import React from 'react';
import classNames from 'classnames/bind';
import { BaseProps } from '@/types';
import styles from './index.module.less';

const cx = classNames.bind(styles);

const Subtitle: React.FC<BaseProps> = ({ className, children }) => {
  return (
    <h2 className={cx('subtitle', className)}>
      {children}
    </h2>
  )
}

export default Subtitle;
