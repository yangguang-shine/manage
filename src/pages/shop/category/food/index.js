import React, { useState, useEffect, Fragment } from 'react';
import { Table, Tag, Popconfirm, Modal, Button, Spin, Space, Row, Col } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate,useLocation,  Outlet, useSearchParams } from 'react-router-dom'
import FoodEdit from './FoodEdit';
import Test from './Test';
import useFetch from '@/utils/useFetch';
import './index.less'
import { foodImgPath } from '@/config/index'


const Food = (props) => {
    const fetch = useFetch()
    console.log(props)
    const {shopID, categoryID, categoryName} = props
    const [dataSource, setDatasource] = useState([])
    const [record, setRecord] = useState({})
    const [editModalFlag, setEditModalFlag] = useState(false)
    const [spinning, setSpinning] = useState(false)

    useEffect(() => {
        // location.pathname.startsWith('/shop')
        init()
    }, [])
    async function getFoodList() {
        const res = await fetch('/manage/food/list', {
            shopID,
            categoryID
        })
        // const newDataSource = formatDataSource(res)
        const foodList = (res || []).map((foodItem => {
            return {
                ...foodItem,
                specification: JSON.parse(foodItem.specification || '[]')
            }
        }))
        setDatasource(foodList)
    }
    async function removeFood(foodID) {
        await fetch('/manage/food/remove', {
            foodID,
            shopID,
            categoryID
        });
    }
    async function init() {
        try {
            setSpinning(true)
            await getFoodList()
        } catch (error) {
            console.log(error)
        } finally {
            setSpinning(false)
        }
    }
    function toShowEditModalFlag(record) {
        toShowEditModal()
        record.specificationList = []
        setRecord({
            ...record,
            shopID,
            categoryID,
            categoryName
        })
    }
    function toShowEditModal() {
        setEditModalFlag(true)
    }
    function toCloseEditModal() {
        setEditModalFlag(false)
    }
    async function toUpdateShopList() {
        try {
            toCloseEditModal()
            setSpinning(true)
            await getFoodList()
        } catch (error) {
            console.log('error')
            console.log(error)
        } finally {
            setSpinning(false)
        }
    }
    function removeFoodConfirmModal(record) {
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: '是否删除该菜品',
            okText: '删除',
            cancelText: '取消',
            onOk: () => toRemoveFood(record.foodID)
        });
    }
    async function toRemoveFood(foodID) {
        try {
            setSpinning(true)
            await removeFood(foodID)
            await getFoodList()
        } catch (error) {
            console.log(error)
        } finally {
            setSpinning(false)
        }
    }

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    const columns = [
        {
            title: '菜品图片',
            dataIndex: 'imgUrl',
            render: (text, record, index) => {
                return (
                    <img src={`${foodImgPath}/${shopID}/${record.imgUrl}`} className="shop-img" alt="" />
                )
            }
        },
        {
            title: '菜品名称',
            dataIndex: 'foodName',

        },
        {
            title: '菜品描述',
            dataIndex: 'description',
        },
        {
            title: '菜品价格',
            dataIndex: 'price',
        },
        {
            title: '菜品单位',
            dataIndex: 'unit',
        },
        {
            title: '包装价格',
            dataIndex: 'packPrice',
        },
        {
            title: '库存数量',
            dataIndex: 'reserveCount',
        },
        {
            title: '菜品操作',
            dataIndex: 'foodOperate',
            render: (text, record, index) => {
                return (
                    <Space>
                        <Tag color="green" onClick={() => toShowEditModalFlag(record)}>编辑菜品</Tag>
                        <Tag color="red" onClick={() => removeFoodConfirmModal(record)}>删除菜品</Tag>
                    </Space>
                )
            }
        }
    ];
    return (
        <Spin tip="Loading..." spinning={spinning}>
            <Row align="middle" justify="center">
                <Col span={20}>
                    菜品列表
                </Col>
                <Col span={4}>
                    <Button icon={<PlusOutlined />} type="primary" size="large" onClick={() => toShowEditModalFlag({})}>新增菜品</Button>
                </Col>
            </Row>
            {/* <div className="home-title flex-row flex-a-center flex-j-between">
                <div>店铺列表</div>
                <Button icon={<PlusOutlined />} type="primary" size="large" onClick={toAddShop}>新增店铺</Button>
            </div> */}
            <Table style={{ 'marginTop': '30px' }} columns={columns} dataSource={dataSource} onChange={onChange} rowKey={(record) => record.foodID}/>
            {/* {editModalFlag && <FoodEdit toCloseEditModal={toCloseEditModal} toUpdateShopList={toUpdateShopList} record={record} />} */}
            {editModalFlag && <FoodEdit toCloseEditModal={toCloseEditModal} toUpdateShopList={toUpdateShopList} record={record} > </FoodEdit>}
            {/* <Test></Test> */}
        </Spin> 
    )
}
export default Food



// import './index.less'

// const Shop = (props) => {
//     const navigate = useNavigate()
//     const [showEditFoodInfo, setShowEditFoodInfo] = useState(false)
//     const [dataSource, setDatasource] = useState([
//         {
//             key: '1',
//             foodImg: '哈哈哈哈哈',
//             foodName: '嘻嘻嘻嘻嘻',
//             foodPriice: '哈哈哈哈哈',
//             foodDescriptiion: '嘻嘻嘻嘻嘻',
//         },
//         {
//             key: '2',
//             foodImg: '哈哈哈哈哈',
//             foodName: '嘻嘻嘻嘻嘻',
//             foodPriice: '哈哈哈哈哈',
//             foodDescriptiion: '嘻嘻嘻嘻嘻',
//         }
//     ])
//     const deleteShop = (record) => {
//         const newDataSource = [...dataSource]
//         const findRecordIndex = dataSource.findIndex(item => item.key === record.key)
//         if (findRecordIndex) {
//             newDataSource.splice(findRecordIndex, 1)
//             setDatasource(newDataSource)
//         }
//     }

//     const toShowEditFoodInfo = () => {
//         console.log('bianji')
//         setShowEditFoodInfo(true)
//     }

//     const columns = [
//         {
//             title: '菜品图片',
//             dataIndex: 'foodImg',
//         },
//         {
//             title: '菜品名称',
//             dataIndex: 'foodName',

//         },
//         {
//             title: '菜品价格',
//             dataIndex: 'foodPriice',
//         },
//         {
//             title: '菜品描述',
//             dataIndex: 'foodDescriptiion',
//         },
//         {
//             title: '菜品操作',
//             dataIndex: 'foodOperate',
//             render: (text, record, index) => {
//                 return (
//                     <Fragment>
//                         <Tag color="green" onClick= {toShowEditFoodInfo}>编辑菜品</Tag>
//                         <Popconfirm
//                             title="Are you sure delete this task?"
//                             onConfirm={(record) => deleteShop(record)}
//                             okText="Yes"
//                             cancelText="No"
//                         >
//                             <Tag color="red">删除店铺</Tag>
//                         </Popconfirm>
                        
//                     </Fragment>
//                 )
//             }
//         }
//     ];

//     function onChange(pagination, filters, sorter, extra) {
//         console.log('params', pagination, filters, sorter, extra);
//     }
//     return <Table columns={columns} dataSource={dataSource} onChange={onChange} />
// }
// export default Shop