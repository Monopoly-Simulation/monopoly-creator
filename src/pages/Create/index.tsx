import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Modal } from 'antd';
import classNames from 'classnames/bind';
import remote from '@/remote';
import styles from './index.module.less';

const cx = classNames.bind(styles);

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  }
};

interface FormValues {
  core: number;
  node: number;
  hour: number;
  minute: number;
  memory: number;
  email: string;
}

const initialValues: Partial<FormValues> = {
  core: 1,
  node: 1,
  hour: 1,
  minute: 0,
  memory: 1000,
}

const Create: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleFinish = async (values: any) => {
    setLoading(true);
    await remote.createJob(values as FormValues);
    Modal.success({
      content: 'Job created. Please pay attention to your inbox and come back when it is completed!'
    })
    setLoading(false);
  }

  return (
    <div className={cx('create')}>
      <Form {...layout} form={form} onFinish={handleFinish} initialValues={initialValues}>
        <Form.Item name="core" label="Number of cores">
          <InputNumber min={1} max={8} defaultValue={1} />
        </Form.Item>
        <Form.Item name="node" label="Number of nodes">
          <InputNumber min={1} max={64} defaultValue={1} />
        </Form.Item>
        <Form.Item label="Maximum running time">
          <Form.Item className={cx('item--inline')} name="hour">
            <InputNumber min={0} max={23} />
          </Form.Item>
          <span className={cx('item--inline-text')}>hour(s)</span>
          <Form.Item className={cx('item--inline')} name="minute">
            <InputNumber min={0} max={59} />
          </Form.Item>
          <span className={cx('item--inline-text')}>minute(s)</span>
        </Form.Item>
        <Form.Item label="Memory">
          <Form.Item className={cx('item--inline')} name="memory">
            <InputNumber min={100} max={8000} />
          </Form.Item>
          <span className={cx('item--inline-text')}>MB(s)</span>
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          extra="Notification about the task will be sent to this email address"
          rules={[{ required: true, message: 'Please input an email address' }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Create;
