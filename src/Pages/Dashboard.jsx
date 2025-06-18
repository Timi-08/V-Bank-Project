import React, { useEffect, useState } from "react";
import {
  CaretRightOutlined,
  LineChartOutlined,
  InfoCircleOutlined,
  BulbOutlined,
  DollarOutlined,
  CreditCardOutlined,
  BankOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { mockApi } from "../api/mockapi";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser.id) {
      mockApi.getUserById(storedUser.id).then((data) => {
        setUser(data);

        mockApi.getAccountsByUserId(data.id).then((accounts) => {
          setAccount(accounts[0]);
        });
      });
    }
  }, []);
  const accountNumber = account?.accountNumber
    ? account.accountNumber
    : "*********";
  const accountBalance = account?.accountBalance
    ? account.accountBalance
    : "0.00";
  return (
    <div className="dashboard">
      <div className="account-summary">
        <div className="balance">
          <p>Available Balance</p>
          <h3>${accountBalance}</h3>
        </div>
        <div className="account-sec">
          <div className="account-number-sec">
            <p>Account Number</p>
            <h3>{accountNumber}</h3>
          </div>
        </div>
      </div>
      <div className="transaction-history">
        Transaction History <CaretRightOutlined />
      </div>
      <br />
      <br />
      <div className="quick-links-sec">
        <h4>Quick Links</h4>
        <div className="quick-link-grid">
          <div className="quick-link" onClick={() => navigate("/transfer")}>
            <BankOutlined />
            <p>Transfer</p>
          </div>
          <div className="quick-link" onClick={() => navigate("/deposit")}>
            <DollarOutlined />
            <p>Deposit</p>
          </div>
          <div className="quick-link">
            <CreditCardOutlined />
            <p>Top up</p>
          </div>
          <div className="quick-link">
            <LineChartOutlined />
            <p>Invest</p>
          </div>
          <div className="quick-link">
            <TrophyOutlined />
            <p>Betting</p>
          </div>
          <div className="quick-link">
            <BulbOutlined />
            <p>Shop</p>
          </div>
          <div className="quick-link">
            <LineChartOutlined />
            <p>Deals</p>
          </div>
          <div className="quick-link">
            <InfoCircleOutlined />
            <p>Others</p>
          </div>
        </div>
      </div>
    </div>
  );
};
