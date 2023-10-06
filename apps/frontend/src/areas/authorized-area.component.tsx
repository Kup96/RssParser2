import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from '../components/header';

const LayoutArea: FC = () => (
  <>
    <ResponsiveAppBar />
    <Outlet />
  </>
);

export default LayoutArea;
