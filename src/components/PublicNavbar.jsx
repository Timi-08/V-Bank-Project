import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/VBANK-ICO.ico";

const { Header } = Layout;

const navItems = [
  { key: "home", label: <Link to="/">Home</Link> },
  { key: "login", label: <Link to="/login">Login</Link> },
  { key: "signup", label: <Link to="/signup">Sign Up</Link> },
];

export const PublicNavbar = () => {
  const location = useLocation();
  const selectedKey =
    navItems.find((item) => item.label.props.to === location.pathname)?.key ||
    "home";

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
          <img src={logo} alt="Logo" style={{ width: 50 }} />

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
