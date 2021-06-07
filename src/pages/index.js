import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from 'react-router-dom'
import "./index.less";

// import { SubMenu, Item } from "rc-menu";
const { SubMenu, Item } = Menu;
const { Header, Sider, Content } = Layout;
const BaseLayout = props => {
    const location = useLocation()
    const [selectedKeys, setSelectKeys] = useState(['/home'])
    useEffect(() => {
        console.log(location)
        setSelectKeys([location.pathname])
    }, [location])
    const onSelect = (params) => {
        console.log(params)
        setSelectKeys([params.key])
    }
    return (
        <Layout className="layput-container">
            <Sider>
                <div className="logo-tip">后台管理</div>
                <Menu mode="inline" theme="dark" selectedKeys={selectedKeys} onSelect={onSelect}>
                    <Item key="/home">
                        <Link to={"/home"}>首页</Link>
                    </Item>
                    <Item key="/shop">
                        <Link to={"/shop"}>店铺</Link>
                    </Item>
                    <Item key="/spider">
                        <Link to={"/spider"}>嘻嘻</Link>
                    </Item>
                </Menu>
            </Sider>
            <Content className='main-content'>{props.children}</Content>
        </Layout>
    );
};
export default BaseLayout

// export default class BaseLayout extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() { }
// }
