import React from 'react';
import { Button } from 'antd';
import { BaseProps } from '@/types';

const { remote } = window.require('electron');
const fs = window.require('fs');
const { dialog } = remote;
const win = remote.getCurrentWindow();

const ExportButton: React.FC<BaseProps> = ({ className, style }) => {
  const handleClick = () => {
    const selectResults = dialog.showOpenDialogSync(win, {
      properties: ['openDirectory'],
    });
    if (!selectResults) {
      return;
    }
    const dirPath = selectResults[0];
    const databaseContent = fs.readFileSync('db.json', {
      encoding: 'utf-8',
    });
    fs.writeFileSync(`${dirPath}/database.json`, databaseContent, {
      encoding: 'utf-8',
    });
  }
  return (
    <Button className={className} style={style} type="primary" onClick={handleClick}>
      Export
    </Button>
  )
}

export default ExportButton;
