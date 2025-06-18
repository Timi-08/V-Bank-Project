import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { mockApi } from "../api/mockapi";

export const Transfer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState({});
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);
    mockApi.getAllAccounts().then(setAccounts);
  }, []);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const transferAmount = Number(values.amount);
      const recipientAccNum = String(values.recipientAccountNumber);

      const sender = accounts.find(
        (acc) => String(acc.userId) === String(user.id)
      );
      const recipient = accounts.find(
        (acc) => String(acc.accountNumber) === recipientAccNum
      );

      if (!sender) {
        api.error({
          message: "Transfer Failed",
          description: "Sender account not found.",
        });
        setIsLoading(false);
        return;
      }
      if (!recipient) {
        api.error({
          message: "Transfer Failed",
          description: "Recipient account not found.",
        });
        setIsLoading(false);
        return;
      }
      if (String(sender.accountNumber) === recipientAccNum) {
        api.error({
          message: "Transfer Failed",
          description: "Cannot transfer to your own account.",
        });
        setIsLoading(false);
        return;
      }
      if (Number(sender.accountBalance) < transferAmount) {
        api.error({
          message: "Transfer Failed",
          description: "Insufficient balance.",
        });
        setIsLoading(false);
        return;
      }

      await mockApi.updateAccount({
        ...sender,
        accountBalance: Number(sender.accountBalance) - transferAmount,
      });

      await mockApi.updateAccount({
        ...recipient,
        accountBalance: Number(recipient.accountBalance) + transferAmount,
      });

      api.success({
        message: "Transfer Successful",
        description: `₦${transferAmount} has been transferred.`,
      });
      form.resetFields();
    } catch (error) {
      api.error({
        message: "Transfer Failed",
        description: error.message || "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => navigate("/dashboard"), 1000);
    }
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="Transfer">
      {contextHolder}
      <h2>Transfer Funds</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 400, margin: "0 auto" }}
      >
        <Form.Item
          label="Recipient Account Number"
          name="recipientAccountNumber"
          rules={[
            {
              required: true,
              message: "Please input the recipient's account number!",
            },
          ]}
        >
          <Input placeholder="Enter recipient account number" />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please input the amount!" },
            { pattern: /^\d+$/, message: "Amount must be a number" },
          ]}
        >
          <Input placeholder="Enter amount" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Transfer
          </Button>
          <Button htmlType="button" onClick={onReset} style={{ marginLeft: 8 }}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
