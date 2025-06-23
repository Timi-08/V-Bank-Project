import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import userImg from "../assets/user-3296.png";
import { EditFilled } from "@ant-design/icons";
import { CaretRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { Dropdown, Space } from "antd";

export const Profile = () => {
  const location = useLocation();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const pinPasswordItems = [
    {
      key: "1",
      label: <span>Change Pin</span>,
      onClick: () => {
        navigate("/pin", { state: { from: location.pathname } });
      },
    },
    {
      key: "2",
      label: <span>Change Password</span>,
      onClick: () => {
        navigate("/password", { state: { from: location.pathname } });
      },
    },
  ];
  const handleSignOut = () => {
    localStorage.removeItem("user");
    api.success({
      message: "Sign Out Successful",
      description: "You have been signed out.",
    });
    setTimeout(() => navigate("/login"), 1000);
  };
  const [storedUser, setStoredUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  useEffect(() => {
    const handleUserChange = () => {
      setStoredUser(JSON.parse(localStorage.getItem("user") || "{}"));
    };
    window.addEventListener("userChanged", handleUserChange);
    return () => window.removeEventListener("userChanged", handleUserChange);
  }, []);

  return (
    <div className="profile">
      {contextHolder}
      <img
        src={userImg}
        alt="Profile"
        style={{
          width: 70,

          objectFit: "cover",
          verticalAlign: "-5px",
        }}
      />
      <h2
        style={{
          color: "black",
          fontSize: "1rem",
          marginTop: "10px",
          textTransform: "uppercase",
        }}
      >
        {storedUser.firstName || "User"} {storedUser.lastName || "User"}
      </h2>

      <div>
        Edit
        <EditFilled />
      </div>
      <div className="links-container">
        <div className="link">
          <p>Analytics</p>
          <CaretRightOutlined />
        </div>
        <Dropdown menu={{ items: pinPasswordItems }} trigger={["click"]}>
          <div className="link pinandpassword" style={{ cursor: "pointer" }}>
            <p style={{ margin: 0 }}>Pin and Password</p>
            <CaretRightOutlined />
          </div>
        </Dropdown>
        <div className="link">
          <p> Account rules and policies</p>
          <CaretRightOutlined />
        </div>
        <div
          className="link"
          onClick={() => {
            handleSignOut();
          }}
        >
          <p> Sign Out</p>
          <CaretRightOutlined />
        </div>
      </div>
    </div>
  );
};
