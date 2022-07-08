import React from "react";
import { Layout } from "antd";
import Sider from "../../components/sider";
import DashboardRouter from "./dashboardRouter";
import Footer from "../../components/footer";
import DashboardHeader from "./header";
import styles from "./styles.module.scss";
import "./overrides.scss";

const { Content } = Layout;

function Dashboard() {
  return (
    <Layout>
      <Sider />
      <Layout className={styles.innerLayout} id="1">
        <DashboardHeader />
        <Content className={styles.content} id="2">
          <DashboardRouter />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default Dashboard;
