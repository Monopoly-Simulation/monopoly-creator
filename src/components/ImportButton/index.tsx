import React from 'react';
import { Button } from 'antd';
import { FileFilter } from 'electron';
import database from '@/database';
import { BaseProps } from '@/types';

const { remote } = window.require('electron');
const fs = window.require('fs');

const { dialog } = remote;
const userDataPath = remote.app.getPath('userData');
const win = remote.getCurrentWindow();

const fileFilters: FileFilter[] = [
  {
    name: 'JSON',
    extensions: ['json'],
  }
]

interface ImportButtonProps extends BaseProps {
  onFinish?: () => void;
}

const ImportButton: React.FC<ImportButtonProps> = ({ className, style, onFinish }) => {
  const handleClick = () => {
    const selectResults = dialog.showOpenDialogSync(win, {
      filters: fileFilters,
      properties: ['openFile'],
    });
    if (!selectResults) {
      return;
    }
    const filePath = selectResults[0];
    const fileContent = fs.readFileSync(filePath, {
      encoding: 'utf-8',
    });
    fs.writeFileSync(`${userDataPath}/db.json`, fileContent, {
      encoding: 'utf-8',
    });
    database.refresh();
    onFinish?.();
  }
  return (
    <Button className={className} style={style} type="primary" onClick={handleClick}>
      Import
    </Button>
  )
}

export default ImportButton;
