import React, { useMemo } from 'react';
import { Select } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.module.less';

const cx = classNames.bind(styles);

const { Option } = Select;

interface SimulationSelectProps {
  defaultValue?: number;
  length: number;
  onChange?: (value: number) => void;
}

const SimulationSelect: React.FC<SimulationSelectProps> = ({ defaultValue, length, onChange }) => {
  const handleChange = (value: number) => {
    onChange?.(value);
  }
  const options = useMemo(() => {
    const tmp = [];
    for (let i = 0; i < length; i += 1) {
      tmp.push(<Option value={i}>{i + 1}</Option>)
    }
    return tmp;
  }, [length]);
  return (
    <div className={cx('select')}>
      <span className={cx('select__label')}>Simulation group:</span>
      <Select defaultValue={defaultValue} onChange={handleChange}>
        {options}
      </Select>
    </div>
  )
}

export default SimulationSelect;
