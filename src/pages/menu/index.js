
import "./index.less";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation, Outlet } from 'react-router-dom'

// import { SubMenu, Item } from "rc-menu";
const { SubMenu, Item } = Menu;
const { Header, Sider, Content } = Layout;
const BaseLayout = props => {
    const rootSubMenuList = ['sub_shop', 'test']
    const location = useLocation()
    const navigate = useNavigate()
    const [openKeys, setOpenKeys] = useState([])
    const [selectedKeys, setSelectedKeys] = useState([])
    useEffect(() => {
        console.log('>>>>>>>>>>>>>>>>')
        if (location.pathname === '/') {
            navigate('/shop', { replace: true })
        }
        if (location.pathname.startsWith('/shop')) {
            setOpenKeys(['sub_shop'])
            setSelectedKeys(['/shop'])
        } else {
            setSelectedKeys([location.pathname])
        }
        // setSelectKeys([location.pathname])
    }, [location])
    function onOpenChange(openKeys) {
        console.log('onOpenChange')
        const len = openKeys.length
        if (len) {
            setOpenKeys([openKeys[len - 1]])
        } else {
            setOpenKeys([])
        }
    }
    function onSelect({ selectedKeys }) {
        console.log('onSelect')
        setSelectedKeys(selectedKeys)
    }
    return (
        <Layout className="layout-container">
            <Sider>
                <div className="logo-tip">manage</div>
                <Menu mode="inline" theme="dark" defaultOpenKeys={['sub_shop']} openKeys={openKeys} selectedKeys={selectedKeys} onOpenChange={onOpenChange} onSelect={onSelect}>
                    <Item key="/login">
                        <Link to={"login"}>login</Link>
                    </Item>
                    <Item key="/register">
                        <Link to={"register"}>register</Link>
                    </Item>
                    <Item key="/upload">
                        <Link to={"upload"}>upload</Link>
                    </Item>
                    <SubMenu key="sub_shop" title="sub_shop">
                        <Item key="/shop">
                            <Link to={"shop"}>shop</Link>
                        </Item>
                        <Item key="/order">
                            <Link to={"order"}>order</Link>
                        </Item>
                    </SubMenu>
                    <SubMenu key="test" title="Navigation One">
                        <Menu.Item key="test1">test1</Menu.Item>
                        <Menu.Item key="test2">test2</Menu.Item>
                        <Menu.Item key="test3">test3</Menu.Item>
                        <Menu.Item key="test4">test4</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Content className="main-content"><Outlet /></Content>
        </Layout >
    );
};
export default BaseLayout
