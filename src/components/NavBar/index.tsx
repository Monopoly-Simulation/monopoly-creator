import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';

const { Item: MenuItem } = Menu;

const NavBar: React.FC = () => {
  const location = useLocation();
  return (
    <Menu mode="horizontal" selectedKeys={[location.pathname]}>
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
