import React, { useState, useEffect } from "react";
import { mockApi } from "../api/mockapi";
import { Loading } from "../components/Loading";

export const Notifications = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    mockApi.getTransfers().then((allTransactions) => {
      const userTransactions = allTransactions.filter(
        (e) => String(e.userId) === String(storedUser.id)
      );
      setTransactions(userTransactions);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    );
  }

  return (
    <div className="notifications">
      {transactions.length > 0 ? (
        transactions.map((transaction, index) => {
          const isDebit =
            transaction.transactionStatus.toLowerCase() === "debit";
          const amountPrefix = isDebit ? "-" : "+";
          const statusColor = isDebit ? "red" : "green";

          return (
            <div key={index} className="notification-item">
              <div className="names">
                <div className="sender">
                  <h4>Sender Name </h4>
                  <p>{transaction.senderName}</p>
                </div>
                <div className="receiver">
                  <h4>Receipient Name </h4>
                  <p>{transaction.receiverName}</p>
                </div>
              </div>
              <div className="extraDetails">
                <div className="amount">
                  <h4>Amount</h4>
                  <p style={{ color: statusColor }}>
                    {amountPrefix}₦{transaction.amount}
                  </p>
                  <div
                    className="transactionType"
                    style={{ color: statusColor }}
                  >
                    <p>{transaction.transactionStatus}</p>
                  </div>
                </div>
                <div className="dateDetails">
                  <h4>Date</h4>
                  <div className="date">
                    <p>{transaction.transactionDate}</p>
                  </div>
                  <div className="time">
                    <p>{transaction.transactionTime}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
};
