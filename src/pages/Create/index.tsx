import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Modal } from 'antd';
import classNames from 'classnames/bind';
import remote from '@/remote';
import db from '@/database';
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
  game: number;
  player: number;
  round: number;
  income: number;
  initialFunding: number;
  tax: number;
  email: string;
}

const initialValues: Partial<FormValues> = {
  game: 100,
  player: 3,
  round: 1000,
  initialFunding: 200,
  income: 100,
  tax: 0,
}

const Create: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleFinish = async (values: any) => {
    const { email, ...gameProps } = values as FormValues;
    setLoading(true);
    try {
      const uid = await remote.createJob({ email }, gameProps);
      await db.addJob({
        uid,
      });
      Modal.success({
        content: 'Job created. Please pay attention to your inbox and come back when it is completed!',
      });
    } catch {
      Modal.error({
        content: 'Network error! Please make sure you have access to the NYU network.',
      })
    }
    setLoading(false);
  }

  return (
    <div className={cx('create')}>
      <Form {...layout} form={form} onFinish={handleFinish} initialValues={initialValues}>
        <Form.Item name="game" label="Number of games">
          <InputNumber min={1} max={1000} />
        </Form.Item>
        <Form.Item name="player" label="Number of players">
          <InputNumber min={2} max={4} />
        </Form.Item>
        <Form.Item name="round" label="Maximum round each game">
          <InputNumber min={1} max={10000} />
        </Form.Item>
        <Form.Item name="initialFunding" label="Initial funding">
          <InputNumber min={1} max={10000} />
        </Form.Item>
        <Form.Item
          name="income"
          label="Salary"
          extra="Salary is paid when players pass [GO]"
        >
          <InputNumber min={0} max={10000} />
        </Form.Item>
        <Form.Item
          label="Tax"
          extra="Tax is charged when players pass [GO]"
        >
          <Form.Item className={cx('item--inline')} name="tax">
            <InputNumber min={0} max={100} />
          </Form.Item>
          <span className={cx('item--inline-text')}>%</span>
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
