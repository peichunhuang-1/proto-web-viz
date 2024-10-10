import './App.css';
import React, { useState } from 'react';
import ThreeDScene from './3d_tools/ThreeDScene';
import { ReloadOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu , theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

function App() {
  const items = [];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Button type="default" icon={<ReloadOutlined />} size={'small'} onClick={()=>{}}/>
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, }}/>
        <Content style={{ margin: '0 16px', }}>
        <Breadcrumb style={{ margin: '16px 0', }} />
        <div style={{ padding: 24, minHeight: 300, background: colorBgContainer, borderRadius: borderRadiusLG, position: 'relative' }}>
          <ThreeDScene />
        </div>
        <Footer style={{ textAlign: 'center', }}> ProtoCore ©{new Date().getFullYear()} </Footer>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
