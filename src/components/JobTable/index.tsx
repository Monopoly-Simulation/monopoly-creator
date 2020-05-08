import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { message, Table, Tag, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import db from '@/database';
import { JobLine, JobStatus } from '@/database/schema';
import { Game } from '@/types';
import styles from './index.module.less';

const cx = classNames.bind(styles);

const JobTable: React.FC = () => {
  const [data, setData] = useState<JobLine[]>([]);
  const [loadingJobId, setLoadingJobId] = useState('');
  const history = useHistory();
  const columns = [
    {
      title: 'Job name',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      render(name: string) {
        return name || '(untitled)';
      }
    },
    {
      title: 'Initial funding',
      dataIndex: 'gameSettings',
      key: 'initialFunding',
      width: '10%',
      render(game: Game) {
        return game.initialFunding;
      }
    },
    {
      title: 'Salary',
      dataIndex: 'gameSettings',
      key: 'salary',
      width: '10%',
      render(game: Game) {
        return game.income;
      }
    },
    {
      title: 'Tax',
      dataIndex: 'gameSettings',
      key: 'tax',
      width: '5%',
      render(game: Game) {
        return `${game.tax}%`;
      }
    },
    {
      title: 'Property tax',
      dataIndex: 'gameSettings',
      key: 'propertyTax',
      width: '5%',
      render(game: Game) {
        return `${game.propertyTax}%`;
      }
    },
    {
      title: 'Creation time',
      dataIndex: 'startTime',
      key: 'startTime',
      width: '20%',
      render(startTime: number) {
        return new Date(startTime).toLocaleString();
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render(status: JobStatus) {
        const text = JobStatus[status];
        let tagColor: 'red' | 'orange' | 'green';
        if (status === JobStatus.Running) {
          tagColor = 'orange';
        } else if (status === JobStatus.Completed) {
          tagColor = 'green';
        } else {
          tagColor = 'red';
        }
        return <Tag color={tagColor}>{text}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '25%',
      render(n: undefined, job: JobLine) {
        const { status, uid } = job;
        let operationButton: React.ReactNode;
        if (status === JobStatus.Running) {
          const handleCheckButtonClick = async () => {
            setLoadingJobId(uid);
            const incomingStatus = await db.checkJob(uid);
            if (incomingStatus === JobStatus.Completed) {
              message.success('The job has completed!');
              const jobIndex = data.indexOf(job);
              const newData = [...data];
              const newJob = Object.assign({}, job);
              newJob.status = JobStatus.Completed;
              newData[jobIndex] = newJob;
              setData(newData);
            } else if (incomingStatus === JobStatus.Running) {
              message.warning('The job is still running. Please come back later!');
            } else {
              message.error('An error occurred! Please change simulation settings!');
              const jobIndex = data.indexOf(job);
              const newData = [...data];
              const newJob = Object.assign({}, job);
              newJob.status = JobStatus.Error;
              newData[jobIndex] = newJob;
              setData(newData);
            }
            setLoadingJobId('');
          }
          operationButton = <Button loading={loadingJobId === uid} onClick={handleCheckButtonClick}>Check</Button>;
        } else if (status === JobStatus.Completed) {
          const handleDetailButtonClick = () => {
            history.push(`/job/${uid}`);
          }
          operationButton = <Button onClick={handleDetailButtonClick} type="primary">Detail</Button>;
        } else {
          operationButton = null;
        }
        const handleConfirmDelete = async () => {
          await db.deleteJobAndResult(uid);
          setData(await db.getAllJobs());
        }
        const handleDeleteButtonClick = () => {
          Modal.confirm({
            title: 'Are you sure to delete the job?',
            icon: <ExclamationCircleOutlined />,
            content: 'The job and its result will be lost permanently.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: handleConfirmDelete,
          });
        }
        return (
          <>
            {operationButton}
            <Button className={cx('delete-btn')} onClick={handleDeleteButtonClick} type="danger">Delete</Button>
          </>
        )
      }
    }
  ]
  useEffect(() => {
    (async () => {
      const jobs = await db.getAllJobs();
      setData(jobs);
    })();
  }, []);
  return (
    <Table columns={columns} dataSource={data} />
  )
}

export default JobTable

