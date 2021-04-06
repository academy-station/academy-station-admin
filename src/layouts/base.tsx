import { Layout } from "antd";
const { Header, Sider, Content, Footer } = Layout;

export interface LayoutBaseProps {
  header?: any;
  content: any;
  sider?: any;
  footer?: any;
}

export const LayoutBase = (props: LayoutBaseProps) => {
  return (
    <Layout>
      {props.header && <Header>{props.header}</Header>}
      <Layout>
        {props.sider && <Sider>{props.sider}</Sider>}
        <Content>{props.content}</Content>
      </Layout>
      {props.footer && <Footer>{props.footer}</Footer>}
    </Layout>
  );
};

export default LayoutBase;
