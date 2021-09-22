import logo from "./logo.svg";
import antdLogo from "./AntDesign.svg";
import "./App.css";
import "antd/dist/antd.css";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Menu, Row } from "antd";
const { SubMenu } = Menu;
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Row>
          <Col>
            <h1>
              <a id="logo" href>
                <img src={logo} className="App-logo" alt="logo" />
                Ant Design
              </a>
            </h1>
          </Col>
          <Col flex={1}>
            <div style={{ lineHeight: "64px" }}>
              <Input placeholder="搜索" />
            </div>
          </Col>
          <Col>
            <Menu
              mode="horizontal"
              style={{ borderBottom: "0px", lineHeight: "64px" }}
            >
              <Menu.Item>设计</Menu.Item>
              <Menu.Item>文档</Menu.Item>
              <Menu.Item>组件</Menu.Item>
              <Menu.Item>资源</Menu.Item>
              <Menu.Item>国内镜像</Menu.Item>
              <SubMenu key="SubMenu" icon={<SettingOutlined />}>
                <Menu.ItemGroup title="Item 1">
                  <Menu.Item key="setting:1">Option 1</Menu.Item>
                  <Menu.Item key="setting:2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Item 2">
                  <Menu.Item key="setting:3">Option 3</Menu.Item>
                  <Menu.Item key="setting:4">Option 4</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            </Menu>
          </Col>
        </Row>
        <Row justify="center">
          <div id="biglogo">
            <img src={antdLogo} alt="logo" />
          </div>
        </Row>
        <Row justify="center">
          <div>
            <Button type="primary" shape={"round"} style={{ margin: "8px" }}>
              开始使用
            </Button>
            <Button shape={"round"} style={{ margin: "8px" }}>
              设计语言
            </Button>
          </div>
        </Row>
      </header>
      <div style={{ border: "1px solid black" }} draggable>
        <span style={{ verticalAlign: "middle" }}>123</span>
        <span style={{ verticalAlign: "middle" }}>234</span>
      </div>
    </div>
  );
}

export default App;
