import React, { useContext, useState } from 'react';
import { Form, Input, Button, message, Tabs } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams  } from 'react-router'; // 假设你使用了 React Router
import { AuthContext } from '../components/AuthProvider';
import { biUserControllerApi } from '../services/request';
import { UserLoginRequestDTO } from '../openapi';

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [messageApi, contextHolder] = message.useMessage();
  const { setLoading, setUser } = useContext(AuthContext);

  const onFinish = async (values: any) => {
    const appUserLoginRequest: UserLoginRequestDTO = {
      "userAccount": values.username,
      "userPassword": values.password,
    };
   
    try {
      let res = await biUserControllerApi.userLogin(appUserLoginRequest);
      const {statusCodeValue, data}: any = res.data;
      console.log(statusCodeValue, data);
      if (statusCodeValue == 200) {
        setLoading(true);
        setUser(data);
        messageApi.success('Login successful!');
        localStorage.setItem('user', JSON.stringify(data));
        const redirectUrl = (searchParams.get("redirect") as string) ?? "/";
        const baseUrl = window.location.origin;
        const path = redirectUrl.replace(baseUrl, "");
        navigate(path, { replace: true });
      }
    }catch(err) {
      messageApi.error("Login failed!");
      console.log('Invalid username or password.');
    }
  };

  return (
    <>
    {contextHolder}
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h2>Login</h2>
      <Form
        form={form}
        name="login_form"
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
    </>
  );
};





export default LoginPage;