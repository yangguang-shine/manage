import React, { useState, Fragment, useEffect } from 'react';
import { Table, Tag, Popconfirm, Spin, Modal, Row, Col, Button } from 'antd';
import { PlusOutlined,ExclamationCircleOutlined } from '@ant-design/icons';

import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import useFetch from '@/utils/useFetch';
import './index.less'
import CategoryEdit from './CategoryEdit';

const Shop = (props) => {
    const navigate = useNavigate()
    const location = useLocation()
    const fetch = useFetch()
    const [params] = useSearchParams()
    let shopID = params.get('shopID')
    const [showEditCategoryFlag, setShowEditCategoryFlag] = useState(false)
    const [showFoodListFlag, setShowFoodListFlag] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [dataSource, setDatasource] = useState([])
    const [record, setRecord] = useState({});
    let key = 0
    useEffect(() => {
        const pathname = location.pathname
        shopID = params.get('shopID')
        if (pathname === '/shop/category') {
            setShowFoodListFlag(false)
            init()
        } else if (pathname.startsWith('/shop/category/food')) {
            setShowFoodListFlag(true)
        }
    }, [location]);
    async function init() {
        try {
            setSpinning(true)
            const res = await fetch('/manage/category/list', {
                shopID
            })
            const categoryList = res.map((item) => ({
                key: key++,
                ...item
            }))
            setDatasource(categoryList)
            console.log(res)
        } catch (e) {
            console.log(e)
        } finally {
            setSpinning(false)

        }
    }
    const deleteCategory = (record) => {
        const newDataSource = [...dataSource]
        const findRecordIndex = dataSource.findIndex(item => item.key === record.key)
        if (findRecordIndex) {
            newDataSource.splice(findRecordIndex, 1)
            setDatasource(newDataSource)
        }
    }

    const toFoodList = (record) => {
        const categoryID = record.categoryID
        navigate(`food?shopID=${shopID}&categoryID=${categoryID}`)

    }
    const toShowEditCategory = (record) => {
        setRecord({
            ...record,
            shopID
        })
        setShowEditCategoryFlag(true)
    }
    function removeCategoryConfirmModal(record) {
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: '是否删除改店铺和店铺下的所有菜品',
            okText: '删除',
            cancelText: '取消',
            onOk: () => toRemoveCategory(record.categoryID)
        });
    }
    async function toRemoveCategory(categoryID) {
        try {
           setSpinning(true)
           await fetch('/manage/category/remove', {
               shopID,
               categoryID
           })
           init()
        } catch(e) {
           console.log(e)
        } finally {
           setSpinning(false)

        }
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
                        <Tag color="cyan" onClick={() => toFoodList(record)}>查看菜品</Tag>
                        <Tag color="green" onClick={() => toShowEditCategory(record)}>编辑分类</Tag>
                            <Tag color="red" onClick={() => removeCategoryConfirmModal(record)}>删除分类</Tag>
                    </Fragment>

                )
            }
        }
    ];

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    function toCloseEditModal() {
        setShowEditCategoryFlag(false)
    }
    async function toUpdateCategoryList() {
        toCloseEditModal()
        await init()
    }
    return showFoodListFlag ? <Outlet></Outlet> :
        <Spin spinning={spinning}>
            <Row align="middle" justify="center">
                <Col span={20}>
                    店铺分类列表
                </Col>
                <Col span={4}>
                    <Button icon={<PlusOutlined />} type="primary" size="large" onClick={() => toShowEditCategory({})}>新增分类</Button>
                </Col>
            </Row>
            <Table columns={columns} dataSource={dataSource} onChange={onChange} rowKey={(record) => record.categoryID}/>
            {
                showEditCategoryFlag ? <CategoryEdit toCloseEditModal={toCloseEditModal} toUpdateCategoryList={toUpdateCategoryList} record={record}></CategoryEdit> : null
            }
        </Spin>
}
export default Shop