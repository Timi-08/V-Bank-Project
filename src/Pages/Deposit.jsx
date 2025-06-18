import React, { useState, useEffect } from "react";
import { Tooltip, notification, Form, Input, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { mockApi } from "../api/mockapi";
import { useNavigate } from "react-router-dom";

export const Deposit = () => {
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
    let amount = parseFloat(values.amount);

    setIsLoading(true);
    try {
      const updatedAccount = {
        ...account,
        accountBalance: Number(account.accountBalance) + amount,
      };
      await mockApi.updateAccount(updatedAccount);
      setAccount(updatedAccount);
      api.success({
        message: "Deposit Successful",
        description: `₦${amount} has been deposited to your account.`,
      });
      form.resetFields();
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      api.error({
        message: "Deposit Failed",
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
    <div className="deposit">
      {contextHolder}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h2>Deposit</h2>
        <Tooltip title="Deposit Money to your account">
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
          name="amount"
          label="Amount"
          rules={[
            {
              required: true,
              message: "Please input the amount you want to deposit!",
            },
          ]}
        >
          <Input type="number" placeholder="Enter amount" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Deposit
          </Button>
          <Button style={{ marginLeft: "10px" }} onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
      {account && (
        <div style={{ marginTop: 24, textAlign: "center" }}>
          Current Balance: ₦{account.accountBalance}
        </div>
      )}
    </div>
  );
};
