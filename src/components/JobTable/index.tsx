import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { message, Table, Tag, Button } from 'antd';
import db from '@/database';
import { Job, JobStatus } from '@/database/schema';

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
      width: '30%',
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
      width: '15%',
      render(n: undefined, job: Job) {
        const { status, uid } = job;
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
          return <Button loading={loadingJobId === uid} onClick={handleCheckButtonClick}>Check</Button>;
        } else {
          const handleDetailButtonClick = () => {
            history.push(`/job/${uid}`);
          }
          return <Button onClick={handleDetailButtonClick} type="primary">Detail</Button>;
        }
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

