import { useContext, useState } from "react";
import AppRoutes from "./router";
import { Layout, Tabs, TabsProps } from "antd";
import { Link, useNavigate } from "react-router";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { noop } from "antd/es/_util/warning";
import { AuthContext } from "./components/AuthProvider";

const headerStyle: React.CSSProperties = {
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#ffffff',
  textDecoration: 0,
};

const footerStyle: React.CSSProperties = {
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#ffffff',
  textDecoration: 0,
  textAlign: 'center',
};


function App() {
  let navigate = useNavigate();
  const { saTokenInfo } = useContext(AuthContext);

  const onChange = (key: string) => {
    if (key == "home") navigate(`/`);
    else navigate(`/${key}`);
  };

  return (
    <Layout>
      <Header style={headerStyle}>
        <Link to="/" style={{marginLeft: 20}}>Home</Link>
        <Link to={`/detail/0`} style={{marginLeft: 20}}>UserInfo</Link>
      </Header>
      <Content>
        <AppRoutes />
      </Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
}

export default App;
