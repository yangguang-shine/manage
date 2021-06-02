import React, { useState, Fragment } from 'react';
import { Table, Tag, Popconfirm, Modal } from 'antd';
import { useHistory } from 'react-router-dom'
import ShopEdit from './shopEdit'

import './index.less'

const Shop = (props) => {
    const history = useHistory()
    const [dataSource, setDatasource] = useState([
        {
            key: '1',
            shopName: '哈哈哈哈哈',
            openTIming: '嘻嘻嘻嘻嘻',
            shopAddress: '哈哈哈哈哈',
            shopDescription: '嘻嘻嘻嘻嘻',
        },
        {
            key: '2',
            shopName: '哈哈哈哈哈',
            openTIming: '嘻嘻嘻嘻嘻',
            shopAddress: '哈哈哈哈哈',
            shopDescription: '嘻嘻嘻嘻嘻',
        }
    ])
    const [showEditShop, setShowEditShop] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    


    const deleteShop = (record) => {
        const newDataSource = [...dataSource]
        const findRecordIndex = dataSource.findIndex(item => item.key === record.key)
        if (findRecordIndex) {
            newDataSource.splice(findRecordIndex, 1)
            setDatasource(newDataSource)
        }
    }

    const toCategory = () => {
        history.push({
            pathname: '/shop/category',
            search: "?shopID=1111",
        })
    }

    const toShowEditShop = () => {
        console.log('bianji')
        setShowEditShop(true)
    }

    const toCloseEditShop = () => {
        setShowEditShop(false)

    }

    const columns = [
        {
            title: '店铺名称',
            dataIndex: 'shopName',

        },
        {
            title: '营业时间',
            dataIndex: 'openTIming',
        },
        {
            title: '店铺地址',
            dataIndex: 'shopAddress',
        },
        {
            title: '店铺简介',
            dataIndex: 'shopDescription',
        },
        {
            title: '店铺操作',
            dataIndex: 'shopOperate',
            render: (text, record, index) => {
                return (
                    <Fragment>
                        <Tag color="cyan" onClick={toCategory}>菜品分类</Tag>
                        <Tag color="green" onClick={toShowEditShop}>编辑店铺</Tag>
                        <Popconfirm
                            title="Are you sure delete this task?"
                            onConfirm={(record) => deleteShop(record)}
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

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const addShop = () => {
        setDatasource([...dataSource, {
            key: Math.random().toString(),
            shopName: '哈哈哈哈哈',
            openTIming: '嘻嘻嘻嘻嘻',
            shopAddress: '哈哈哈哈哈',
            shopDescription: '嘻嘻嘻嘻嘻',
        }])
    }

  

    return (
        <Fragment>
            <Table columns={columns} dataSource={dataSource} onChange={onChange} />
            {showEditShop && <ShopEdit addShop={addShop} toCloseEditShop={toCloseEditShop}/>}
             
        </Fragment>

    )
}
export default Shop