import { Menu } from "antd";
import React from "react";

export const LayoutHeader = () => {
  return (
    <React.Fragment>
      <div className={"logo"}>
        {/*<Image src={Banner} width={"200px"} height={"50px"} />*/}
      </div>
      <Menu mode={"horizontal"} theme={"dark"} defaultSelectedKeys={["0"]}>
        <Menu.Item key={"0"}>待完成订单</Menu.Item>
        <Menu.Item key={"1"}>已完成订单</Menu.Item>
        <Menu.Item key={"2"}>统计分析</Menu.Item>
        <Menu.Item key={"3"}>技术支持</Menu.Item>
        <Menu.Item key={"4"}>登录/退出</Menu.Item>
      </Menu>
    </React.Fragment>
  );
};

export default LayoutHeader;
