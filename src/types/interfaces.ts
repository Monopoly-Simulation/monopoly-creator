import React from 'react';

export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface Config {
  getCommand(): string;
}
