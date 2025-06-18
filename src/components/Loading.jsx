import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
export const Loading = () => (
  <Flex align="center" gap="middle">
    <Spin
      indicator={
        <LoadingOutlined
          style={{ fontSize: 48, color: "rgb(172,50,130)" }}
          spin
        />
      }
    />
  </Flex>
);
