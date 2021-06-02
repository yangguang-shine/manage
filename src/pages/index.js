import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import "./index.less";

// import { SubMenu, Item } from "rc-menu";
const { SubMenu, Item } = Menu;
const { Header, Sider, Content } = Layout;
const BaseLayout = props => {
    const history = useHistory()
    console.log(history);
    const onOpenChange = (params) => {
        console.log(params)
        const latestOpenKey = params.find(key => defaultSelectedKeys.indexOf(key) === -1);
        log(latestOpenKey)
        if (latestOpenKey) {
            if (rootSubmenuKeys.indexOf(latestOpenKey) === -1 || !latestOpenKey) {
                setDefaultSelectedKeys(defaultSelectedKeys)
            } else {
                setDefaultSelectedKeys([latestOpenKey])
            }
        } else {
            setDefaultSelectedKeys([])
        }
    }
    const [selectedKeys, setSelectKeys] = useState(['/home'])
    useEffect(() => {
        console.log()
        // const rootSubmenuKeys = ['/home', '/shop', '/spider'];
        // const findOpenKey = rootSubmenuKeys.find(key => history.location.pathname.startsWith(key))
        // console.log(findOpenKey)
    }, [])
    const onSelect = (params) => {
        console.log(params)
        setSelectKeys(params.selectedKeys)
    }
    return (
        <Layout className="layput-container">
            <Sider>
                <div className="logo-tip">后台管理</div>
                <Menu mode="inline" theme="dark" selectedKeys={selectedKeys} onOpenChange={onOpenChange} onSelect={onSelect}>
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
