import React, { useState, useMemo } from 'react';
import { Cascader, Select } from 'antd';
import { CascaderOptionType } from 'antd/lib/cascader';
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';
import classNames from 'classnames/bind';
import { SimulationResult  } from '@/types';
import styles from './index.module.less';

const cx = classNames.bind(styles);

const { Option } = Select;

interface ResultChartProps {
  result: SimulationResult[];
}

const xValueMap: Record<string, string> = {
  start_capital: 'Initial funding',
  income: 'Salary',
  tax: 'Tax',
  building_tax: 'Property tax',
};

const yValueMap: Record<string, string> = {
  avg_round: 'Round number',
  total_time: 'Running time',
  avg_time: 'Average running time',
}

const ResultChart: React.FC<ResultChartProps> = ({ result }) => {
  const [xKey, setXKey] = useState('');
  const [yKey, setYKey] = useState('');
  const [playerIndex, setPlayerIndex] = useState(-1);
  const xOptions: CascaderOptionType[] = useMemo(() => {
    if (result.length === 0) {
      return [];
    }
    const { settings } = result[0];
    return settings.map((setting, index) => ({
      value: `${index}`,
      label: `Player ${index + 1}`,
      children: [
        {
          value: 'start_capital',
          label: xValueMap.start_capital,
        },
        {
          value: 'income',
          label: xValueMap.income,
        },
        {
          value: 'tax',
          label: xValueMap.tax,
        },
        {
          value: 'building_tax',
          label: xValueMap.building_tax,
        }
      ]
    }))
  }, [result]);
  const data = useMemo(() => {
    if (!xKey || !yKey) {
      return [];
    }
    return result.map(simulation => ({
      x: simulation.settings[playerIndex][xKey],
      y: simulation.results[yKey],
    }));
  }, [result, xKey, yKey, playerIndex]);
  const cols = {
    x: {
      alias: xValueMap[xKey],
    },
    y: {
      alias: yValueMap[yKey],
    }
  }
  const axisTitle = {
    position: 'end',
    offset: 0,
    textStyle: {
      fontSize: '12',
      textAlign: 'center',
      fill: '#999',
      fontWeight: 'bold',
      rotate: 0,
      autoRotate: true
    }
  };
  const tooltip = ['x*y', (x: number, y: number) => {
    return {
      name: yValueMap[yKey],
      value: y.toFixed(2),
      title: `${xValueMap[xKey]} ${x.toFixed(2)}`
    }
  }];
  const handleXChange = (value: string[]) => {
    const [index, key] = value;
    setXKey(key);
    setPlayerIndex(parseInt(index, 10));
  }
  const handleYChange = (value: string) => {
    setYKey(value);
  }
  const chartChildren = xKey && yKey ? (
    <>
      <Axis name="x" title={axisTitle} />
      <Axis name="y" title={axisTitle} />
      <Tooltip />
      <Geom type="line" size={2} position="x*y" tooltip={tooltip} />
      <Geom type="point" shape="circle" size={4} position="x*y" tooltip={tooltip} />
    </>
  ) : null;
  return (
    <div>
      <div className={cx('option-group')}>
        <span className={cx('label--x')}>X Axis:</span>
        <Cascader placeholder="Value on X axis" options={xOptions} onChange={handleXChange} />
        <span className={cx('label--y')}>Y Axis:</span>
        <Select placeholder="Value on Y axis" className={cx('select')} onChange={handleYChange}>
          <Option value="avg_round">{yValueMap.avg_round}</Option>
          <Option value="total_time">{yValueMap.total_time}</Option>
          <Option value="avg_time">{yValueMap.avg_time}</Option>
        </Select>
      </div>
      <Chart height={300} data={data} scale={cols} forceFit>
        {chartChildren}
      </Chart>
    </div>
  );
}

export default ResultChart;
