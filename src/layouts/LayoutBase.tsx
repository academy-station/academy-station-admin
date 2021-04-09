import { Layout, Menu, message } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import { LaptopOutlined, UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import cloud from "../functions/cloud";
import CompBillsTable from "../components/CompBillsTable";
import { BillStatus } from "../ds/bill";

const { Header, Sider, Content, Footer } = Layout;

export const LayoutBase = () => {
  const [seq] = useState(0);
  const [billStatus, setBillStatus] = useState<BillStatus>(BillStatus.Handling);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    cloud
      .callFunction({
        name: "db_query_bills",
        data: {
          status: billStatus,
        },
      })
      .then((res) => {
        const data = res.result.list;
        setBills(data);
        console.log("db_query_bills", data);
      });
  }, [billStatus, seq]);

  return (
    <Layout>
      <Header>
        <Menu mode={"horizontal"} theme={"dark"} defaultSelectedKeys={["0"]}>
          <Menu.Item key={"0"}>业务系统</Menu.Item>
          <Menu.Item
            key={"2"}
            onClick={() => {
              message.warn("等待开发中……");
            }}
          >
            数据分析
          </Menu.Item>
          <Menu.Item key={"3"}>技术支持</Menu.Item>
          <Menu.Item key={"4"}>登录/退出</Menu.Item>
        </Menu>
      </Header>

      <Layout>
        <Sider>
          <Menu
            siderCollapsed={false}
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="订单队列">
              <Menu.Item
                key="1"
                onClick={() => setBillStatus(BillStatus.Handling)}
              >
                待受理订单
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => setBillStatus(BillStatus.ToPay)}
              >
                待付款订单
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => setBillStatus(BillStatus.Finished)}
              >
                已完成订单
              </Menu.Item>
              <Menu.Item
                key="4"
                onClick={() => setBillStatus(BillStatus.Refund)}
              >
                退款订单
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="客户系统">
              <Menu.Item key="6">订单反馈</Menu.Item>
              <Menu.Item key="5">用户信息</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>

        <Content style={{ padding: "20px 5%", minHeight: "80vh" }}>
          <CompBillsTable data={bills} />
        </Content>
      </Layout>

      <Footer>学术小站 - 查重系统</Footer>
    </Layout>
  );
};

export default LayoutBase;
