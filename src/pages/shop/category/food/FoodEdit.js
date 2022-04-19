import { Form, Input, Button, Checkbox, Modal, Row, Col, TimePicker, Space, InputNumber, Upload } from 'antd';

import { UploadOutlined } from '@ant-design/icons';

import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import useFetch from '@/utils/useFetch';
import { delaySync } from '@/utils/index.js';
import { foodImgPath } from '@/config/index.js'
import { baseServerUrl } from '@/utils/config.js'


import { MinusCircleOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const FoodEdit = (props) => {
    console.log('props:', props)
    const fetch = useFetch()
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false)
    let defaultFileList = []
    if (props.record.foodID) {
        defaultFileList = [
            {
                name: '菜品图片',
                status: 'done',
                url: `${foodImgPath}/${props.record.imgUrl}`,
                thumbUrl: `${foodImgPath}/${props.record.imgUrl}`,
            }
        ]
    }
    function editCancel() {
        props.toCloseEditModal()
    }
    function editConfirmModal() {
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: '是否保存已填写信息',
            okText: '保存',
            cancelText: '不保存',
            onCancel: editCancel,
            onOk: editConfirm
        });
    }
    const editConfirm = async () => {
        try {
            setConfirmLoading(true)
            const values = await form.validateFields();
            console.log('values')
            console.log(values)
            const foodInfo = values
            console.log('foodInfo')
            console.log(foodInfo)
            if (props.record.foodID) {
                await editFood(foodInfo)
            } else {
                await addFood(foodInfo)
            }
            setConfirmLoading(false)
            props.toUpdateShopList()
        } catch (errorInfo) {
            setConfirmLoading(false)
            console.log('Failed:', errorInfo);
        } finally {
        }
    };

    async function addFood(foodInfo) {
        await fetch('/manage/food/add', {
            ...foodInfo,
            shopID: props.record.shopID,
            categoryID: props.record.categoryID,
        })
    }
    async function editFood(foodInfo) {
        await fetch('/manage/food/edit', {
            ...foodInfo,
            shopID: props.record.shopID,
            categoryID: props.record.categoryID,
            foodID: props.record.foodID

        })
    }

    function normFile(e) {
        // return e.fileList
        const file = e.file
        const status = file.status
        if (status === 'done') {
            const response = file.response
            if (response.code !== '000') {
                file.status = 'error'
                return ''
            } else {
                return response.data.imgUrl
            }
        }
        return ''
    }
    const foodForm = (
        <Form
            form={form}
            labelCol={{
                span: 4
            }}
            wrapperCol={{
                span: 20
            }}
            name="fooodInfo"
            initialValues={{ ...props.record }}
        >
            {/* <Form.Item
                label="店铺图片"
                name="shopImg"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item> */}
            <Form.Item
                label="菜品名称"
                name="foodName"
                rules={[{ required: true, message: '请输入店铺名称' }]}
            // initialValue={props.record.shopName}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="菜品描述"
                name="description"
                rules={[{ required: true, message: '请输入店铺简介' }]}
            // initialValue={props.record.description}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="菜品价格"
                name="price"
                rules={[{ required: true, message: '请输入店铺名称' }]}
            // initialValue={props.record.shopName}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="菜品单位"
                name="unit"
                rules={[{ required: true, message: '请输入店铺名称' }]}
            // initialValue={props.record.shopName}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="包装价格"
                name="packPrice"
                rules={[{ required: true, message: '请输入包装' }]}
            // initialValue={props.record.shopName}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="库存数量"
                name="reserveCount"
                rules={[{ required: true, message: '请输入库存数量' }]}
            // initialValue={props.record.shopName}
            >
                <InputNumber />
            </Form.Item>




            <Form.Item
                name="imgUrl"
                label="上传图片"
                valuePropName="imgUrl"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: '请上传图片' }]}
            // extra="longgggggggggggggggggggggggggggggggggg"
            >
                <Upload name="foodImg" action={`${baseServerUrl}/manage/uploadImg/food`} listType="picture" maxCount={1} defaultFileList={[...defaultFileList]}>
                    <Button icon={<UploadOutlined />}>上传店铺图片</Button>
                </Upload>
            </Form.Item>
        </Form>
    )
    return (
        <Modal title={props.record.foodID ? '编辑菜品' : '添加菜品'} visible onOk={editConfirmModal} onCancel={editConfirmModal} centered confirmLoading={confirmLoading}>
            {foodForm}
        </Modal>
    )
}

export default FoodEdit
