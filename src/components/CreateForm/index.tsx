import React, { useState, useMemo } from 'react';
import { Form, Input, InputNumber, Button, Modal } from 'antd';
import { Game } from '@/types';
import remote from '@/remote';
import db from '@/database';
import useBooleanState from '@/hooks/useBooleanState';
import ElasticItem from './ElasticItem';

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

interface FormValues extends Game {
  email: string;
  name: string;
}

const initialValues: Partial<FormValues> = {
  game: 100,
  player: 3,
  round: 1000,
  initialFunding: 200,
  income: 100,
  tax: 0,
  propertyTax: 0,
}

const CreateForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isInitialFundingRange, toggleIsInitialFundingRange] = useBooleanState(false);
  const [isSalaryRange, toggleIsSalaryRange] = useBooleanState(false);
  const [isTaxRange, toggleIsTaxRange] = useBooleanState(false);
  const [isPropertyTaxRange, toggleIsPropertyTaxRange] = useBooleanState(false);
  const isRangeAvailable = useMemo(() => {
    return !isInitialFundingRange && !isSalaryRange && !isTaxRange && !isPropertyTaxRange;
  }, [isInitialFundingRange, isSalaryRange, isTaxRange, isPropertyTaxRange]);

  const handleFinish = async (values: any) => {
    const { email, name, ...gameProps } = values as FormValues;
    setLoading(true);
    try {
      const uid = await remote.createJob({ email }, gameProps);
      await db.addJob({
        name,
        uid,
        gameSettings: gameProps,
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
    <Form {...layout} form={form} onFinish={handleFinish} initialValues={initialValues}>
      <Form.Item name="name" label="Job name(optional)">
        <Input placeholder="Give the job a friendly name" />
      </Form.Item>
      <Form.Item name="game" label="Number of games">
        <InputNumber min={1} max={1000} />
      </Form.Item>
      <Form.Item name="player" label="Number of players">
        <InputNumber min={2} max={4} />
      </Form.Item>
      <Form.Item name="round" label="Maximum round each game">
        <InputNumber min={1} max={10000} />
      </Form.Item>
      <ElasticItem
        elastic={isInitialFundingRange || isRangeAvailable}
        expanded={isInitialFundingRange}
        label="Initial funding"
        name="initialFunding"
        input={<InputNumber min={1} max={10000} />}
        onBtnClick={toggleIsInitialFundingRange}
      />
      <ElasticItem
        elastic={isSalaryRange || isRangeAvailable}
        expanded={isSalaryRange}
        label="Salary"
        extra="Salary is paid when players pass [GO]"
        name="income"
        input={<InputNumber min={0} max={10000} />}
        onBtnClick={toggleIsSalaryRange}
      />
      <ElasticItem
        elastic={isTaxRange || isRangeAvailable}
        expanded={isTaxRange}
        label="Tax(%)"
        extra="Tax is charged when players pass [GO]"
        name="tax"
        input={<InputNumber min={0} max={100} />}
        onBtnClick={toggleIsTaxRange}
      />
      <ElasticItem
        elastic={isPropertyTaxRange || isRangeAvailable}
        expanded={isPropertyTaxRange}
        label="Property tax(%)"
        extra="Property tax is based on properties that players have"
        name="propertyTax"
        input={<InputNumber min={0} max={100} />}
        onBtnClick={toggleIsPropertyTaxRange}
      />
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
  );
}

export default CreateForm;
