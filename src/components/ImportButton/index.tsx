import React from 'react';
import { Button } from 'antd';
import { FileFilter } from 'electron';
import database from '@/database';

const { remote } = window.require('electron');
const fs = window.require('fs');
const { dialog } = remote;
const win = remote.getCurrentWindow();

const fileFilters: FileFilter[] = [
  {
    name: 'JSON',
    extensions: ['json'],
  }
]

interface ImportButtonProps {
  onFinish?: () => void;
}

const ImportButton: React.FC<ImportButtonProps> = ({ onFinish }) => {
  const handleClick = () => {
    const selectResults = dialog.showOpenDialogSync(win, {
      filters: fileFilters,
    });
    if (!selectResults) {
      return;
    }
    const filePath = selectResults[0];
    const fileContent = fs.readFileSync(filePath, {
      encoding: 'utf-8',
    });
    fs.writeFileSync('db.json', fileContent, {
      encoding: 'utf-8',
    });
    database.refresh();
    onFinish?.();
  }
  return (
    <Button type="primary" onClick={handleClick}>
      Import
    </Button>
  )
}

export default ImportButton;
