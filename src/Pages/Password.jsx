import React, { useState, useEffect } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip, notification, Form, Input, Button } from "antd";
import { mockApi } from "../api/mockapi";
import { useNavigate } from "react-router-dom";

export const Password = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState(null);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser.id) {
      mockApi.getAccountsByUserId(storedUser.id).then((accounts) => {
        setAccount(accounts[0]);
      });
    }
  }, []);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const updatedAccount = {
        ...account,
        password: values.newPassword,
      };
      if (values.oldPassword !== account.password) {
        api.error({
          message: "Password Change Failed",
          description: "Old password does not match.",
        });
        setIsLoading(false);
        return;
      }
      await mockApi.updateAccount(updatedAccount);
      setAccount(updatedAccount);
      api.success({
        message: "Password Changed Successfully",
        description: "Your password has been updated successfully.",
      });
      form.resetFields();
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      api.error({
        message: "Password Change Failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="password">
      {contextHolder}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h2>Change Your Password</h2>
        <Tooltip title="Changing your password will require you to log in again.">
          <QuestionCircleOutlined style={{ cursor: "pointer" }} />
        </Tooltip>
      </div>
      <Form
        form={form}
        onFinish={onFinish}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Form.Item
          name="oldPassword"
          label="Old Password"
          rules={[
            {
              required: true,
              message: "Please input your old password!",
            },
          ]}
        >
          <Input type="text" placeholder="Enter Old Password" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please enter a new password!",
            },
          ]}
        >
          <Input type="text" placeholder="Enter New Password" />
        </Form.Item>
        <Form.Item
          name="confirmPin"
          label="Confirm New Pin"
          rules={[
            {
              required: true,
              message: "Please confirm your new password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input type="text" placeholder="Confirm New Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Change Password
          </Button>
          <Button style={{ marginLeft: "10px" }} onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
