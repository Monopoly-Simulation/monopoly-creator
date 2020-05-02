import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';

const { Item: MenuItem } = Menu;

const NavBar: React.FC = () => {
  const location = useLocation();
  const selectKey = location.pathname === '/index.html' ? '/' : location.pathname;
  return (
    <Menu mode="horizontal" selectedKeys={[selectKey]}>
      <MenuItem key="/">
        <Link to="/">Home</Link>
      </MenuItem>
      <MenuItem key="/create">
        <Link to="/create">Create</Link>
      </MenuItem>
    </Menu>
  )
}

export default NavBar;
