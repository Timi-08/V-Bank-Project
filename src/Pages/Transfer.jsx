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
    mockApi.getUsers().then(setAccounts);
  }, []);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const transferAmount = Number(values.amount);
      const recipientAccNum = String(values.recipientAccountNumber);
      const pin = String(values.pin);
      const sender = accounts.find((acc) => String(acc.id) === String(user.id));
      const recipient = accounts.find(
        (acc) => String(acc.accountNumber) === recipientAccNum
      );
      const amount = transferAmount.toFixed(2);
      const senderName = sender.accountName;
      const receiverName = recipient.accountName;

      const now = new Date();
      const transactionDate = now.toLocaleDateString();
      const transactionTime = now.toLocaleTimeString();
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
          description: "Insufficient funds.",
        });
        setIsLoading(false);
        return;
      }
      if (String(sender.pin) !== pin) {
        api.error({
          message: "Transfer Failed",
          description: "Incorrect pin.",
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

      await mockApi.createTransfer({
        senderName,
        receiverName: recipient.accountName,
        amount,
        transactionStatus: "Debit",
        userId: sender.id,
        transactionDate,
        transactionTime,
      });

      await mockApi.createTransfer({
        senderName,
        receiverName: recipient.accountName,
        amount,
        transactionStatus: "Credit",
        userId: recipient.id,
        transactionDate,
        transactionTime,
      });

      api.success({
        message: "Transfer Successful",
        description: `₦${transferAmount} has been transferred.`,
      });
      form.resetFields();
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      api.error({
        message: "Transfer Failed",
        description: error.message || "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="Transfer">
      {contextHolder}
      <h2>Transfer to</h2>
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
        <Form.Item
          label="Pin"
          name="pin"
          rules={[
            { required: true, message: "Please input your pin!" },
            {
              pattern: /^\d{4}$/,
              message: "Please enter a valid 4-digit pin!",
            },
          ]}
        >
          <Input placeholder="Enter pin" />
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
