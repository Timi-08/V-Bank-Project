import React, { useState } from "react";
import { Button, Form, Input, Space, notification } from "antd";
import Logo from "../assets/VBANK-ICO.ico";
import { useNavigate } from "react-router-dom";
import { mockApi } from "../api/mockapi";

export const Signup = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const userRes = await mockApi.createUser(values);
      const user = await userRes.json();

      const accountName = `${values.firstName} ${values.lastName}`;
      const accountNumber = String(values.phoneNumber).slice(1);
      const accountBalance = 1000;
      const pin = 1234;

      await mockApi.createAccount({
        accountName,
        accountNumber,
        accountBalance,
        pin,
        userId: user.id,
      });

      api.success({
        message: "Success",
        description: "Account Created Successfully",
      });
      form.resetFields();
    } catch (error) {
      api.error({
        message: "Error",
        description: "Failed to create account. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="Signup">
      {contextHolder}
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className="Signup-form"
        style={{
          maxWidth: "500px",
          padding: "24px",
          margin: "0 auto",
          boxShadow: "0 .5rem 1rem rgba(0, 0, 0, .15)",
          backgroundColor: "rgb(248,249,250)",
          borderRadius: "8px",
        }}
      >
        <div className="signup-header" style={{ textAlign: "center" }}>
          <img
            src={Logo}
            alt="VBank Logo"
            style={{
              width: "100px",
              marginBottom: "10px",
            }}
          />
          <h3>CREATE AN ACCOUNT WITH US</h3>
          <hr
            style={{
              border: "none",
              height: "1px",
              backgroundColor: "rgb(194,196,197)",
              marginBottom: "15px",
            }}
          />
          <div>Personal Information</div>
        </div>

        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input placeholder="Enter your first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input placeholder="Enter your last name" />
        </Form.Item>

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
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
            {
              pattern: /^\d{11}$/,
              message: "Please enter a valid 11-digit phone number!",
            },
          ]}
        >
          <Input type="number" placeholder="Enter your phone number" />
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
            <Button type="primary" htmlType="submit">
              Create Account
            </Button>

            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>
            Already have an account?
            <Button
              type="link"
              style={{
                color: "rgb(172,50,130)",
                padding: 0,
                textDecoration: "underline",
              }}
              onClick={() => navigate("/login")}
            >
              Login here
            </Button>
          </p>
        </div>
      </Form>
    </div>
  );
};
