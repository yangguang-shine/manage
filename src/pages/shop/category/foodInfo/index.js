import React, { useState, Fragment } from 'react';
import { Table, Tag, Popconfirm } from 'antd';
import { useHistory } from 'react-router-dom'

import './index.less'

const Shop = (props) => {
    const history = useHistory()
    const [showEditFoodInfo, setShowEditFoodInfo] = useState(false)
    const [dataSource, setDatasource] = useState([
        {
            key: '1',
            foodImg: '哈哈哈哈哈',
            foodName: '嘻嘻嘻嘻嘻',
            foodPriice: '哈哈哈哈哈',
            foodDescriptiion: '嘻嘻嘻嘻嘻',
        },
        {
            key: '2',
            foodImg: '哈哈哈哈哈',
            foodName: '嘻嘻嘻嘻嘻',
            foodPriice: '哈哈哈哈哈',
            foodDescriptiion: '嘻嘻嘻嘻嘻',
        }
    ])
    const deleteShop = (record) => {
        const newDataSource = [...dataSource]
        const findRecordIndex = dataSource.findIndex(item => item.key === record.key)
        if (findRecordIndex) {
            newDataSource.splice(findRecordIndex, 1)
            setDatasource(newDataSource)
        }
    }

    const toShowEditFoodInfo = () => {
        console.log('bianji')
        setShowEditFoodInfo(true)
    }

    const columns = [
        {
            title: '菜品图片',
            dataIndex: 'foodImg',
        },
        {
            title: '菜品名称',
            dataIndex: 'foodName',

        },
        {
            title: '菜品价格',
            dataIndex: 'foodPriice',
        },
        {
            title: '菜品描述',
            dataIndex: 'foodDescriptiion',
        },
        {
            title: '菜品操作',
            dataIndex: 'foodOperate',
            render: (text, record, index) => {
                return (
                    <Fragment>
                        <Tag color="green" onClick= {toShowEditFoodInfo}>编辑菜品</Tag>
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
    return <Table columns={columns} dataSource={dataSource} onChange={onChange} />
}
export default Shop