import React, { useState } from "react";
import { Form, Input, Button, Space, notification } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/VBANK-ICO.ico";
import { mockApi } from "../api/mockapi";

export const Login = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const users = await mockApi.getUsers();
      const found = users.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );
      if (found) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: found.id,
            firstName: found.firstName,
            email: found.email,
            lastName: found.lastName,
          })
        );
        api.success({
          message: "Login Successful",
          description: "Welcome back!",
        });
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        api.error({
          message: "Login Failed",
          description: "Invalid email or password.",
        });
      }
    } catch (error) {
      api.error({
        message: "Error",
        description: "Unable to login",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="Login">
      {contextHolder}
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className="Login-form"
        style={{
          maxWidth: "400px",
          padding: "24px",
          margin: "40px auto",
          boxShadow: "0 .5rem 1rem rgba(0, 0, 0, .15)",
          backgroundColor: "rgb(248,249,250)",
          borderRadius: "8px",
        }}
      >
        <div className="login-header" style={{ textAlign: "center" }}>
          <img
            src={Logo}
            alt="VBank Logo"
            style={{
              width: "80px",
              marginBottom: "10px",
            }}
          />
          <h3>LOGIN TO YOUR ACCOUNT</h3>
          <hr
            style={{
              border: "none",
              height: "1px",
              backgroundColor: "rgb(194,196,197)",
              marginBottom: "15px",
            }}
          />
        </div>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Login
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>
            Don't have an account?
            <Button
              type="link"
              style={{ color: "#1890ff", padding: 0 }}
              onClick={() => navigate("/signup")}
            >
              Sign up here
            </Button>
          </p>
        </div>
      </Form>
    </div>
  );
};
