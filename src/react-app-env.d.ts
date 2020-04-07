/// <reference types="react-scripts" />

import Electron from 'electron';
import NodeSSH from 'node-ssh';

declare global {
  interface Window {
    require(module: 'electron'): typeof Electron;
    require(module: 'node-ssh'): typeof NodeSSH;
  }
}
