import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import userImg from "../assets/user-3296.png";
import logo from "../assets/VBANK-ICO.ico";
import notification from "../assets/notification.png";

const { Header } = Layout;

const navItems = [
  { key: "p", label: <Link to="/dashboard">Home</Link> },
  {
    key: "notification",
    label: (
      <Link to="/notifications">
        <img
          src={notification}
          alt="Notifications"
          style={{
            width: 30,
            height: 20,
            objectFit: "cover",
            verticalAlign: "-5px",
          }}
        />
      </Link>
    ),
  },
  {
    key: "profile",
    label: (
      <Link to="/profile">
        <img
          src={userImg}
          alt="Profile"
          style={{
            width: 20,
            height: 20,
            objectFit: "cover",
            verticalAlign: "-5px",
          }}
        />
      </Link>
    ),
  },
];

export const PrivateNavbar = () => {
  const location = useLocation();
  const selectedKey =
    navItems.find(
      (item) => item.label.props && item.label.props.to === location.pathname
    )?.key || "p";

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
    <Layout>
      <Header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
          width: "100vw",
          backgroundColor: "white",
          padding: "0 24px",
          boxShadow: "0 1px 12px #00000019",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <img src={logo} alt="Logo" style={{ width: 50 }} />
            <h2
              style={{
                color: "black",
                fontSize: "1rem",
                margin: 0,
              }}
            >
              Hello, {storedUser.firstName || "User"}!
            </h2>
          </div>

          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[selectedKey]}
            items={navItems}
            style={{
              borderBottom: "none",
            }}
          />
        </div>
      </Header>
    </Layout>
  );
};
