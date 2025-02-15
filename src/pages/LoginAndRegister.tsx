import React from 'react';
import { Tabs } from 'antd';
import LoginPage from './Login';
import RegisterPage from './Register';

const LoginAndRegister: React.FC = () => (
  <Tabs
    defaultActiveKey="1"
    centered
    items={[
      {
        label: 'Login',
        key: '1',
        children: <LoginPage />,
      },
      {
        label: 'Rgister',
        key: '2',
        children: <RegisterPage />,
      },

    ]}
  />
);

export default LoginAndRegister;