import React from 'react';
import { Form, Button, InputNumber } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.module.less';

const cx = classNames.bind(styles);

interface ElasticItemProps {
  elastic?: boolean;
  expanded?: boolean;
  label?: React.ReactNode;
  extra?: React.ReactNode;
  name?: string;
  input: JSX.Element;
  onBtnClick?: React.MouseEventHandler;
}

const ElasticItem: React.FC<ElasticItemProps> = ({
  elastic, expanded, label, extra, name, input, onBtnClick
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
  const elasticButton = elastic ? (
    <Button onClick={onBtnClick} type="link">{btnText}</Button>
  ) : null;
  return (
    <Form.Item label={label} extra={extra}>
      <Form.Item className={cx('item--inline')} name={name}>
        {input}
      </Form.Item>
      {stepInput}
      {stepNumberInput}
      {elasticButton}
    </Form.Item>
  );
}

export default ElasticItem;
