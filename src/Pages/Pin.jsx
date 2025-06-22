import React, { useState, useEffect } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip, notification, Form, Input, Button } from "antd";
import { mockApi } from "../api/mockapi";
import { useNavigate } from "react-router-dom";
export const Pin = () => {
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
        pin: values.newPin,
      };
      if (String(values.oldPin) !== String(account.pin)) {
        api.error({
          message: "Pin Change Failed",
          description: "Old pin does not match.",
        });
        setIsLoading(false);
        return;
      }
      await mockApi.updateAccount(updatedAccount);
      setAccount(updatedAccount);
      api.success({
        message: "Pin Changed Successfully",
        description: "Your pin has been updated successfully.",
      });
      form.resetFields();
      setTimeout(() => navigate("/profile"), 1000);
    } catch (error) {
      api.error({
        message: "Pin Change Failed",
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
    <div className="pin">
      {contextHolder}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h2>Change Your Pin</h2>
        <Tooltip title="Your pin is 1234 by default. You can change it to a new one for better security">
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
          name="oldPin"
          label="Old Pin"
          rules={[
            {
              required: true,
              message: "Please input your old pin!",
            },
          ]}
        >
          <Input type="number" placeholder="Enter Old Pin" />
        </Form.Item>
        <Form.Item
          name="newPin"
          label="New Pin"
          rules={[
            {
              pattern: /^\d{4}$/,
              message: "Please enter a valid 4-digit pin!",
            },
          ]}
        >
          <Input type="number" placeholder="Enter New Pin" />
        </Form.Item>
        <Form.Item
          name="confirmPin"
          label="Confirm New Pin"
          rules={[
            {
              required: true,
              message: "Please confirm your new pin!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPin") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Pins do not match!"));
              },
            }),
          ]}
        >
          <Input type="number" placeholder="Confirm New Pin" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Change Pin
          </Button>
          <Button style={{ marginLeft: "10px" }} onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
