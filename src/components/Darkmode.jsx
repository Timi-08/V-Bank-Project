import React, { useEffect, useState } from "react";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

export const Darkmode = () => {
  const [dark, setDark] = useState(() => {
    // Persist mode across reloads
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div
      style={{
        position: "fixed",
        left: 24,
        bottom: 32,
        zIndex: 9999,
        background: dark ? "#23262f" : "#fff",
        borderRadius: "50%",
        boxShadow: "0 2px 8px #0002",
        padding: 12,
        cursor: "pointer",
        transition: "background 0.3s",
        fontSize: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={() => setDark((d) => !d)}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? (
        <SunOutlined style={{ color: "#ffd700" }} />
      ) : (
        <MoonOutlined style={{ color: "#22223b" }} />
      )}
    </div>
  );
};
