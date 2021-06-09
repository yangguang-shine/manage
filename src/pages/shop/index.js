import React, { useState, useEffect, Fragment } from 'react';
import { Table, Tag, Popconfirm, Modal, Button, Spin } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom'
import ShopEdit from './shopEdit';
import request from '@/utils/request';
import { delaySync } from '@/utils/index';
import './index.less'

const Shop = (props) => {
    const history = useHistory()
    const [dataSource, setDatasource] = useState([])
    const [record, setRecord] = useState({})
    const [editShopModal, setEditShopModal] = useState(false)
    const [spinning, setSpinning] = useState(false)
    let key = 0;
    async function getShopList (){
        await delaySync()
        const res = await request.get('/manage/shop/list')
        const newDataSource = formatDataSource(res)
        setDatasource(newDataSource)
    }
    async function removeShop(shopID) {
        await delaySync()
        await request.post('/manage/shop/remove', {
            shopID
        });
    }
    function formatDataSource (list = []) {
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
            const minusInfo = minusList.reduce((str, item) => {
                const reach = item.reach
                const minus = item.minus
                return str ? `${str},满${reach}减${minus}` : `满${reach}减${minus}`
            }, '')
            const address = item.address
            const latitude = item.latitude
            const longitude = item.longitude
            const location = item.location
            const positionInfo = `${latitude},${longitude}`
            const description = item.description
            const businessTypes = item.businessTypes
            const businessTypesList = JSON.parse(item.businessTypes)
            const businessTypesInfo = businessTypesList.reduce((str, item) => {
                let type = ''
                if (+item === 2) {
                    type = '外卖'

                } else if (+item === 3) {
                    type = '堂食'
                }
                if (type) {
                    return str ? `${str},${type}` : `${type}`
                } else {
                    return str
                }
            }, '')
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
                minusInfo,
                address,
                latitude,
                longitude,
                location,
                positionInfo,
                description,
                businessTypes,
                businessTypesList,
                businessTypesInfo
            }
        })
    }
    useEffect(() => {
        init()
    }, [])
    async function init() {
        try {
            setSpinning(true)
            await getShopList()
        } catch (error) {
            console.log(error)
        } finally {
            setSpinning(false)
        }
    }
    function addNewShop() {
        setEditShopModal(true)
        setRecord({
            addShopFlag: true
        })
    }
    function toShowEditShopModal (record) {
        console.log(record)
        setEditShopModal(true)
        setRecord(record)
    }
    function toCloseEditShopModal () {
        setEditShopModal(false)
    }
    async function toUpdateShopInfo(shopInfo) {
        try {
            setSpinning(true)
            toCloseEditShopModal()
            await getShopList()
        } catch (error) {
            console.log('error')
            console.log(error)
        } finally {
            setSpinning(false)
        }
    }
    function removeShopConfirmModal(shopID) {
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: '是否删除改店铺和店铺下的所有菜品',
            okText: '删除',
            cancelText: '取消',
            onOk: () => toRemoveShop(shopID)
        });
    }
    async function toRemoveShop(shopID) {
        try {
            setSpinning(true)
            await removeShop(shopID)
            await getShopList()
        } catch (error) {
            console.log(error)
        } finally {
            setSpinning(false)
        }
    }

    function toCategory () {
        // history.push({
        //     pathname: '/shop/category',
        //     search: "?shopID=1111",
        // })
    }


    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
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
            dataIndex: 'minusInfo',
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
            dataIndex: 'businessTypesInfo',
        },
        {
            title: '店铺操作',
            dataIndex: 'shopOperate',
            render: (text, record, index) => {
                return (
                    <Fragment>
                        <Tag color="cyan" onClick={() => toCategory(record)}>菜品分类</Tag>
                        <Tag color="green" onClick={() => toShowEditShopModal(record)}>编辑店铺</Tag>
                        <Tag color="red" onClick={() => removeShopConfirmModal(record.shopID)}>删除店铺</Tag>
                    </Fragment>
                )
            }
        }
    ];
    return (
        <Spin tip="Loading..." spinning={spinning}>
            <div className="home-title flex-row flex-a-center flex-j-between">
                <div>店铺列表</div>
                <Button icon={<PlusOutlined />} type="primary" size="large" onClick={addNewShop}>新增店铺</Button>
            </div>
            <Table columns={columns} dataSource={dataSource} onChange={onChange} />
            {editShopModal && <ShopEdit toCloseEditShopModal={toCloseEditShopModal} toUpdateShopInfo={toUpdateShopInfo} record={record} />}
        </Spin>
    )
}
export default Shop