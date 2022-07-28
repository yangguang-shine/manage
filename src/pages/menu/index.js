
import "./index.less";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation, Outlet } from 'react-router-dom'

// import { SubMenu, Item } from "rc-menu";
const { SubMenu, Item } = Menu;
const items = [
    {
        label: <Link to={"login"}>login</Link>,
        key: 'login',
    },
    {
        label: <Link to={"register"}>register</Link>,
        key: 'register',
    },
    {
        label: <Link to={"upload"}>upload</Link>,
        key: 'upload',
    },
    {
        label: 'sub_shop',
        key: 'sub_shop',
        children: [
            {
                label: <Link to={"shop"}>shop</Link>,
                key: 'shop',
            },
            {
                label: <Link to={"tab"}>tab</Link>,
                key: 'tab',
            },
            // {
            //     label: <Link to={"category"}>category</Link>,
            //     key: 'category',
            // },
            // {
            //     label: <Link to={"food"}>food</Link>,
            //     key: 'food',
            // },
        ]
    },
]
const { Header, Sider, Content } = Layout;
const BaseLayout = props => {
    const rootSubMenuList = ['sub_shop', 'test']
    const location = useLocation()
    const navigate = useNavigate()
    const [openKeys, setOpenKeys] = useState([])
    const [selectedKeys, setSelectedKeys] = useState([])
    useEffect(() => {
        console.log('>>>>>>>>>>>>>>>>')
        const pathname = location.pathname
        console.log(pathname)
        if (pathname.startsWith('/manage/shop/category/food')) {
            setOpenKeys(['sub_shop'])
            setSelectedKeys(['shop'])
        } else if (pathname.startsWith('/manage/shop/category')) {
            setOpenKeys(['sub_shop'])
            setSelectedKeys(['shop'])
        }
        else if (pathname.startsWith('/manage/shop')) {
            setOpenKeys(['sub_shop'])
            setSelectedKeys(['shop'])
        } else if (pathname.startsWith('/manage/tab')) {
            setOpenKeys(['sub_shop'])
            setSelectedKeys(['tab'])
        } else if (pathname.startsWith('/manage/login')) {
            setOpenKeys([])
            setSelectedKeys(['login'])
        } else if (pathname.startsWith('/manage/register')) {
            setOpenKeys([])
            setSelectedKeys(['register'])
        } else if (pathname.startsWith('/manage/upload')) {
            setOpenKeys([])
            setSelectedKeys(['upload'])
        }
        else {
            console.log(pathname)
            navigate('/manage/shop', { replace: true })
        }
    }, [])
    function onOpenChange(openKeys) {
        console.log('onOpenChange')
        const len = openKeys.length
        if (len) {
            setOpenKeys([openKeys[len - 1]])
        } else {
            setOpenKeys([])
        }
    }
    function onSelect({ item, key, keyPath, selectedKeys, domEvent }) {
        console.log({ item, key, keyPath, selectedKeys, domEvent })
        setSelectedKeys([key])
        // setSelectedKeys([item.key])
        // setSelectedKeys
    }
    return (
        <Layout className="layout-container">
            <Sider>
                <div className="logo-tip">manage</div>
                <Menu mode="inline" theme="dark" defaultOpenKeys={['sub_shop']} openKeys={openKeys} selectedKeys={selectedKeys} onOpenChange={onOpenChange} onSelect={onSelect} items={items}>
                    {/* <Item key="login">
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
                      
                    </SubMenu> */}
                    {/* <Item key="/order">
                            <Link to={"order"}>order</Link>
                        </Item> */}
                    {/* <SubMenu key="test" title="Navigation One">
                        <Menu.Item key="test1">test1</Menu.Item>
                        <Menu.Item key="test2">test2</Menu.Item>
                        <Menu.Item key="test3">test3</Menu.Item>
                        <Menu.Item key="test4">test4</Menu.Item>
                    </SubMenu> */}
                </Menu>
            </Sider>
            <Content className="main-content"><Outlet /></Content>
        </Layout >
    );
};
export default BaseLayout
