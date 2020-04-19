import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { message, Table, Tag, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import db from '@/database';
import { Job, JobStatus } from '@/database/schema';
import styles from './index.module.less';

const cx = classNames.bind(styles);

const JobTable: React.FC = () => {
  const [data, setData] = useState<Job[]>([]);
  const [loadingJobId, setLoadingJobId] = useState('');
  const history = useHistory();
  const columns = [
    {
      title: 'Job ID',
      dataIndex: 'uid',
      key: 'uid',
      width: '40%',
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
        const tagColor = status === JobStatus.Running ? 'orange' : 'green';
        return <Tag color={tagColor}>{text}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '25%',
      render(n: undefined, job: Job) {
        const { status, uid } = job;
        let operationButton: JSX.Element;
        if (status === JobStatus.Running) {
          const handleCheckButtonClick = async () => {
            setLoadingJobId(uid);
            const finished = await db.checkJob(uid);
            if (finished) {
              message.success('The job has completed!');
              const jobIndex = data.indexOf(job);
              const newData = [...data];
              const newJob = Object.assign({}, job);
              newJob.status = JobStatus.Completed;
              newData[jobIndex] = newJob;
              setData(newData);
            } else {
              message.warning('The job is still running. Please come back later!');
            }
            setLoadingJobId('');
          }
          operationButton = <Button loading={loadingJobId === uid} onClick={handleCheckButtonClick}>Check</Button>;
        } else {
          const handleDetailButtonClick = () => {
            history.push(`/job/${uid}`);
          }
          operationButton = <Button onClick={handleDetailButtonClick} type="primary">Detail</Button>;
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

