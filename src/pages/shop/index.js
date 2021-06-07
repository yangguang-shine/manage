import React, { useState, useEffect, Fragment } from 'react';
import { Table, Tag, Popconfirm, Modal } from 'antd';
import { useHistory } from 'react-router-dom'
import ShopEdit from './shopEdit';
import request from '@/utils/request';
import './index.less'

const Shop = (props) => {
    const history = useHistory()
    const [dataSource, setDatasource] = useState([])
    const [record, setRecord] = useState({})
    const [editShopModal, setEditShopModal] = useState(false)

    let key = 0;
    const getShopList = async () => {
        try {
            // const res = await request.get('/user/shop/list')
            const res = [
                {"shopName":"汉堡","startTime":"07:00","endTime":"20:00","address":"西直门凯德茂地铁站","description":"嘻嘻嘻","businessTypes":"[3]","minus":"[{\"reach\":14,\"minus\":1},{\"reach\":24,\"minus\":2}]"},
                {"shopName":"汉堡","startTime":"07:00","endTime":"20:00","address":"西直门凯德茂地铁站","description":"嘻嘻嘻","businessTypes":"[3]","minus":"[{\"reach\":14,\"minus\":1},{\"reach\":24,\"minus\":2}]"}
            ]
            const newDataSource = formatDataSource(res)
            console.log(newDataSource[0])
            setDatasource(newDataSource)
            // setRecord(newDataSource[0])
            // setEditShopModal(true)
            
        } catch (error) {
            console.log(error)
        }
    }
    const formatDataSource = (list = []) => {
        return list.map((item) => {
            key++;
            const shopID = item.shopID
            const shopImg = item.imgUrl
            const shopName = item.shopName
            const startTime = item.startTime
            const endTime = item.endTime
            const openTiming = `${item.startTime}-${item.endTime}`
            const minus = item.minus
            const minusList = JSON.parse(item.minus)
            const address = item.address
            const description = item.description
            const businessTypes = item.businessTypes
            return {
                key,
                shopID,
                shopImg,
                shopName,
                openTiming,
                startTime,
                endTime,
                minus,
                minusList,
                address,
                description,
                businessTypes,
            }
        })
    }
    useEffect(() => {
        getShopList()
    }, [])

    const toShowEditShopModal = (record) => {
        console.log(record)
        setEditShopModal(true)
        setRecord(record)
    }
    const toCloseEditShopModal = () => {
        setEditShopModal(false)
    }
    const toUpdateShopInfo = (shopInfo) => {
        setDatasource(formatDataSource([shopInfo]))
        toCloseEditShopModal()
    }

    const toCategory = () => {
        // history.push({
        //     pathname: '/shop/category',
        //     search: "?shopID=1111",
        // })
    }


    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const confirmEditShop = (values) => {
        console.log(values)
        toCloseEditShopModal()
        // setDatasource([...dataSource, {
        //     key: Math.random().toString(),
        //     shopName: '哈哈哈哈哈',
        //     openTiming: '嘻嘻嘻嘻嘻',
        //     address: '哈哈哈哈哈',
        //     description: '嘻嘻嘻嘻嘻',
        // }])
    }
    const columns = [
        {
            title: '店铺图片',
            dataIndex: 'shopImg',

        },
        {
            title: '店铺名称',
            dataIndex: 'shopName',

        },
        {
            title: '营业时间',
            dataIndex: 'openTiming',
        },
        {
            title: '店铺满减',
            dataIndex: 'minus',
        },
        {
            title: '店铺地址',
            dataIndex: 'address',
        },
        {
            title: '店铺简介',
            dataIndex: 'description',
        },
        {
            title: '店铺业务',
            dataIndex: 'businessTypes',
        },
        {
            title: '店铺操作',
            dataIndex: 'shopOperate',
            render: (text, record, index) => {
                return (
                    <Fragment>
                        <Tag color="cyan" onClick={() => toCategory(record)}>菜品分类</Tag>
                        <Tag color="green" onClick={() => toShowEditShopModal(record)}>编辑店铺</Tag>
                        <Popconfirm
                            title="Are you sure delete this task?"
                            onConfirm={() => deleteShop(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Tag color="red">删除店铺</Tag>
                        </Popconfirm>
                    </Fragment>
                )
            }
        }
    ];
    return (
        <Fragment>
            <div className="home-title">店铺列表</div>
            <Table columns={columns} dataSource={dataSource} onChange={onChange} />
            {editShopModal && <ShopEdit confirmEditShop={confirmEditShop} toCloseEditShopModal={toCloseEditShopModal} toUpdateShopInfo={toUpdateShopInfo} record={record}/>}
        </Fragment>

    )
}
export default Shop