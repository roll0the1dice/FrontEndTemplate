import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { redirect, useNavigate } from "react-router";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { usersControllerApi } from "../services/request";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  

  // const onFinish = async (values: any) => {
  //   const usersRegisterRequest: UserRegisterRequestDTO = {
  //     userAccount: values.username,
  //     userPassword: values.password,
  //     checkUserPassword: values.confirmPassword,
  //   };

  //   try {
  //     let res = await usersControllerApi.userRegister(usersRegisterRequest);
  //     const { statusCodeValue, data }: any = res.data;
  //     console.log(statusCodeValue, data);
  //     if (statusCodeValue == 200) {
  //       messageApi.success("Register successful!");
  //       localStorage.setItem("user", JSON.stringify(data));

  //       navigate("/login");
  //     }
  //   } catch (err) {
  //     messageApi.error("Register failed!")
  //     console.log("Invalid username or password.");
  //   }
  // };

  const onFinish = () => {

  };

  const validateConfirmPassword = ({ getFieldValue }: any) => ({
    validator(_: any, value: any) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error("The two passwords that you entered do not match!")
      );
    },
  });

  return (
    <>
    {contextHolder}
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "5px",
      }}
    >
      <h2>Register</h2>
      <Form form={form} name="register_form" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            validateConfirmPassword,
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%" }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
    </>
  );
};

export default RegisterPage;
