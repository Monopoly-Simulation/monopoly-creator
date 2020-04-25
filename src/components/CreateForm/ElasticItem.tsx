import React from 'react';
import { Form, Button, InputNumber } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.module.less';

const cx = classNames.bind(styles);

interface ElasticItemProps {
  expanded?: boolean;
  label?: React.ReactNode;
  extra?: React.ReactNode;
  name?: string;
  input: JSX.Element;
  onBtnClick?: React.MouseEventHandler;
}

const ElasticItem: React.FC<ElasticItemProps> = ({
  expanded, label, extra, name, input, onBtnClick
}) => {
  const btnText = expanded ? 'Constant mode' : 'Range mode';
  const stepInput = expanded ? (
    <Form.Item className={cx('item--inline')} name={`${name}Step`}>
      <InputNumber placeholder="Step" />
    </Form.Item>
  ) : null;
  const stepNumberInput = expanded ? (
    <Form.Item className={cx('item--inline')} name={`${name}StepNumber`}>
      <InputNumber placeholder="Step number" />
    </Form.Item>
  ) : null;
  return (
    <Form.Item label={label} extra={extra}>
      <Form.Item className={cx('item--inline')} name={name}>
        {input}
      </Form.Item>
      {stepInput}
      {stepNumberInput}
      <Button onClick={onBtnClick} type="link">{btnText}</Button>
    </Form.Item>
  );
}

export default ElasticItem;
