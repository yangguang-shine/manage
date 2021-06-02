import React, { useState, Fragment } from 'react';
import { Table, Tag, Popconfirm } from 'antd';
import { useHistory } from 'react-router-dom'

import './index.less'

const Shop = (props) => {
    const history = useHistory()
    const [showEditCategory, setShowEditCategory] = useState(false)
    const [dataSource, setDatasource] = useState([
        {
            key: '1',
            categoryName: '哈哈哈哈哈',
        },
        {
            key: '2',
            categoryName: '哈哈哈哈哈',
        }
    ])
    const deleteCategory = (record) => {
        const newDataSource = [...dataSource]
        const findRecordIndex = dataSource.findIndex(item => item.key === record.key)
        if (findRecordIndex) {
            newDataSource.splice(findRecordIndex, 1)
            setDatasource(newDataSource)
        }
    }

    const toFoodInfo = () => {
        history.push({
            pathname: '/shop/category/foodInfo',
			search: "?shopID=1111&foodInfo=2222",
        })
    }

    const toShowEditCategory = () => {
        console.log('bianji')
        setShowEditCategory(true)
    }

    const columns = [
        {
            title: '分类名称',
            dataIndex: 'categoryName',

        },
        {
            title: '店铺操作',
            dataIndex: 'shopOperate',
            render: (text, record, index) => {
                return (
                    <Fragment>
                        <Tag color="cyan" onClick= {toFoodInfo}>查看菜品</Tag>
                        <Tag color="green" onClick= {toShowEditCategory}>编辑分类</Tag>
                        <Popconfirm
                            title="Are you sure delete this task?"
                            onConfirm={(record) => deleteCategory(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Tag color="red">删除分类</Tag>
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