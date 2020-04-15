import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import db from '@/database';

interface JobPageParams {
  uid: string;
}

const Job: React.FC = () => {
  const { uid } = useParams<JobPageParams>();
  const [output, setOutput] = useState('');
  useEffect(() => {
    (async () => {
      const result = await db.getResult(uid);
      setOutput(result);
    })();
  }, [uid]);
  return (
    <pre>
      {output}
    </pre>
  )
}

export default Job;
