import { Button, Tabs, } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import './index.less'
import Shop from '../shop/index copy'
import Category from './category'
import Food from './category/food'
const { TabPane } = Tabs;
import { useNavigate, useLocation, Outlet, Routes, Route, useParams } from 'react-router-dom'
// const defaultPanes = Array.from({ length: 2 }).map((_, index) => {
//     const id = String(index + 1);
//     return { title: `Tab ${id}`, content: `Content of Tab Pane ${index + 1}`, key: id };
// });



const App = () => {
    console.log(3333333333)
    const navigate = useNavigate()
    const location = useLocation()
    const [activeKey, setActiveKey] = useState('0');
    const [panes, setPanes] = useState([]);
    const newTabIndex = useRef(0);
    const currentPanes = useRef(panes)
    const onChange = (key) => {
        setActiveKey(key);
    };
    const params = useParams()
    const [shopID, setShopID] = useState(params.shopID || 0);
    const [categoryID, setCategoryID] = useState(params.categoryID || 0);
    const [categoryName, setCategoryName] = useState(params.categoryName || '');
    const ShopComponent = <Shop toCategoryList={toCategoryList} />
    const CategoryComponent = <Category toFoodList={toFoodList} shopID={shopID} />
    const FoodComponent = <Food toFoodList={toFoodList} shopID={shopID} categoryID={categoryID} categoryName={categoryName} />
    function toFoodList(record) {
        console.log(record)
        setShopID(record.shopID)
        setCategoryID(record.categoryID)
        setCategoryName(record.categoryName)
        const newActiveKey = getNewKey()
        const newPanes = [
            ...panes, { title: record.categoryName, content: 'FoodComponent', key: newActiveKey }
        ]
        setPanes(newPanes)
        setActiveKey(newActiveKey);
    }
    function toCategoryList(record) {
        // location.pathname = '/manage/shop/category'
        // console.log('location.pathname')
        // console.log(location.pathname)
        navigate('/manage/shop/category')
        setShopID(record.shopID)
        const newActiveKey = getNewKey()
        const newPanes = [
            ...panes, { title: record.shopName, content: 'CategoryComponent', key: newActiveKey }
        ]
        setPanes(newPanes)
        setActiveKey(newActiveKey);
    }
    function getNewKey() {
        newTabIndex.current += 1
        return `${newTabIndex.current}`
    }
    useEffect(() => {
        console.log('hkjdhfiukdshiufkdsahui')
        const pathname = location.pathname
        if (pathname.startsWith('/manage/shop/category/food')) {
            setPanes([
                {
                    title: `food`,
                    info: {
                        componentName: 'FoodComponent',
                        pathname: `/manage/shop/category/food?shopID=${shopID}&categotyID=${categotyID}&categoryName=${categoryName}`
                    },
                    key: '0'
                }
            ])
        } else if (pathname.startsWith('/manage/shop/category')) {
            setPanes([
                {
                    title: `category`,
                    info: {
                        componentName: 'CategotyComponent',
                        pathname: `/manage/shop/category?shopID=${shopID}`
                    },
                    key: '0'
                }
                // { title: `category`, content: <Category />, key: '0' }
            ])
        } else if (pathname.startsWith('/manage/shop')) {
            setPanes([
                {
                    title: `shop`, info: {
                        componentName: 'ShopComponent',
                        pathname: `/manage/shop`
                    }, key: '0'
                }

            ])
        } else {
            console.log(111)
        }
    }, []);

    // const add = () => {
    //     const newActiveKey = `newTab${newTabIndex.current++}`;
    //     setPanes([...panes, { title: 'New Tab', content: 'New Tab Pane', key: newActiveKey }]);
    //     setActiveKey(newActiveKey);
    // };

    const remove = (targetKey) => {
        const targetIndex = panes.findIndex(pane => pane.key === targetKey);
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && targetKey === activeKey) {
            const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
            setActiveKey(key);
        }
        console.log('remove')
        setPanes(newPanes);
    };

    function onEdit(targetKey, action) {
        console.log('onEdit')
        console.log(targetKey, action)
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };
    function onTabClick(key, event) {
        console.log('onTabClick')
        console.log(key)
    }
    function getContentComponent(content) {
        let component = null
        switch (content) {
            case 'ShopComponent': component = ShopComponent;
                break;
            case 'CategoryComponent': component = CategoryComponent;
                break;
            case 'FoodComponent': component = FoodComponent;
                break;
            default: component = null;
                break;
        }
        return component
    }
    return (
        <Tabs className='tabs-container' hideAdd onChange={onChange} activeKey={activeKey} type="editable-card" onEdit={onEdit} onTabClick={onTabClick}>
            {panes.map(pane => (
                <TabPane className='tab-pane-item' tab={pane.title} key={pane.key}>
                    {getContentComponent(pane.info.componentName)}
                </TabPane>
            ))}
        </Tabs>
    );
};

export default App;