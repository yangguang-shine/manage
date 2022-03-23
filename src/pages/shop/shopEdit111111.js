import { Form, Input, Button, Checkbox, Modal, Row, Col, TimePicker, Space, InputNumber, Upload } from 'antd';

import { UploadOutlined } from '@ant-design/icons';

import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import useFetch from '@/utils/useFetch';
import { delaySync } from '@/utils/index';
import { imgHost } from '@/config/index'
import { baseServerUrl } from '../../utils/config'


import { MinusCircleOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './shopEdit.less'

const ShopEdit = (props) => {
    console.log('props:', props)
    const fetch = useFetch()
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false)
    const defaultFileList = [
        {
            name: '店铺图片',
            status: 'done',
            url: `${imgHost}/shop/${props.record.imgUrl}`,
            thumbUrl: `${imgHost}/shop/${props.record.imgUrl}`,
        }
    ]

    // useEffect(() => {
    //     console.log('props change')
    // }, [props]);
    const handleCancel = () => {
        log('handleCancel')
        props.toCloseEditShopModal()
    }
    function editCancel() {
        console.log('editCancel')
        props.toCloseEditShopModal()
    }
    function editConfirmModal() {
        console.log(222222)
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
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };



    const editConfirm = async () => {
        console.log(1111111)
        try {
            setConfirmLoading(true)
            const values = await form.validateFields();
            console.log('values')
            console.log(values)
            const shopInfo = getShopInfo(values)
            console.log('shopInfo')
            console.log(shopInfo)
            if (props.record.addShopFlag) {
                await addShop(shopInfo)
            } else {
                await editShop(shopInfo)
            }
            setConfirmLoading(false)
            props.toUpdateShopInfo(shopInfo)
        } catch (errorInfo) {
            setConfirmLoading(false)
            console.log('Failed:', errorInfo);
        } finally {
        }
    };
    function getShopInfo(values) {
        const positionList = values.positionInfo.split(',')
        const [latitude, longitude] = positionList;
        return {
            shopName: values.shopName,
            startTime: values.startTime.format("HH:mm"),
            endTime: values.endTime.format("HH:mm"),
            address: values.address,
            description: values.description,
            businessTypes: JSON.stringify(values.businessTypesList),
            minus: JSON.stringify(values.minusList || []),
            shopName: values.shopName,
            latitude,
            longitude,
            location: values.location,
            shopID: props.record.shopID,
            imgUrl: values.imgUrl
        }
    }
    async function addShop(shopInfo) {
        await delaySync()
        await fetch('/manage/shop/add', shopInfo)
    }
    async function editShop(shopInfo) {
        await delaySync()
        await fetch('/manage/shop/edit', shopInfo)
    }
    const format = 'HH:mm';
    const reachRule = [
        {
            required: true,
            validator(_, value, aa) {
                const pattern = new RegExp(/^[1-9]\d*$/, 'g')
                if (!pattern.test(value)) {
                    return Promise.reject();
                }
                const arr = _.field.split('.')
                if (+arr[1] === 0) {
                    return Promise.resolve();
                } else {
                    if (+value > form.getFieldValue(arr[0]).[+arr[1] - 1].[arr[2]]) {
                        return Promise.resolve();
                    } else {
                        return Promise.reject();
                    }
                }
            },
            message: '请输入正确',
        },
    ]
    const minusRule = [
        {
            required: true,
            validator(_, value, aa) {
                const pattern = new RegExp(/^[1-9]\d*$/, 'g')
                if (!pattern.test(value)) {
                    return Promise.reject();
                }
                const arr = _.field.split('.')
                const reach = form.getFieldValue(arr[0]).[arr[1]].['reach'];
                if (+reach > +value) {
                    return Promise.resolve();
                } else {
                    return Promise.reject();

                }
            },
            message: '请输入正确',
        },
    ]

    const layout = {
        labelCol: {
            span: 4
        },
        wrapperCol: {
            span: 20
        }
    }
    const timeLayout = {
        labelCol: {
            span: 8
        },
        wrapperCol: {
            span: 16
        }
    }
    function toGetAddress() {
        window.open('https://lbs.qq.com/getPoint/', '_blank')
    }
    function shopImgUpload(e) {
        console.log(111)
        console.log(e)
    }
    function normFile(e) {
        console.log(222)
        console.log(e)
        // return e.fileList
        const file = e.file
        const status = file.status
        if (status === 'done') {
            console.log('file')
            console.log(file)
            const response = file.response
            if (response.code !== '000') {
                file.status = 'error'
                return null
            } else {
                return response.data.imgUrl
            }
        }
        return null
    }
    const Demo = (
        <Form
            form={form}
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            {/* <Form.Item
                label="店铺图片"
                name="shopImg"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item> */}
            <Form.Item
                label="店铺名称"
                name="shopName"
                rules={[{ required: true, message: '请输入店铺名称' }]}
                initialValue={props.record.shopName}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="店铺简介"
                name="description"
                rules={[{ required: true, message: '请输入店铺简介' }]}
                initialValue={props.record.description}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="店铺业务"
                name="businessTypesList"
                rules={[{ required: true, message: '请选择业务类型' }]}
                initialValue={props.record.businessTypesList}
            >
                <Checkbox.Group>
                    <Checkbox value="2">外卖</Checkbox>
                    <Checkbox value="3">堂食</Checkbox>
                </Checkbox.Group>
            </Form.Item>
            <Row >
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        {...timeLayout}
                        label="营业开始"
                        name="startTime"
                        rules={[{ required: true, message: '请输入营业开始时间' }]}
                        initialValue={props.record.startTime ? moment(props.record.startTime, format) : ''}
                    >
                        <TimePicker format={format} />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        {...timeLayout}
                        label="营业结束"
                        name="endTime"
                        rules={[{ required: true, message: '请输入营业结束时间' }]}
                        initialValue={props.record.endTime ? moment(props.record.endTime, format) : ''}

                    >
                        <TimePicker format={format} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={16}>
                    <Form.Item
                        {
                        ...{
                            labelCol: {
                                span: 6
                            },
                            wrapperCol: {
                                span: 18
                            }
                        }
                        }
                        label="店铺坐标"
                        name="positionInfo"
                        initialValue={props.record.positionInfo}
                        rules={[{ required: true, message: '请选择店铺坐标' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Button onClick={toGetAddress}>去获取坐标信息</Button>
                </Col>
            </Row>


            <Row gutter={8}>
                <Col span={16}>
                    <Form.Item
                        {
                        ...{
                            labelCol: {
                                span: 6
                            },
                            wrapperCol: {
                                span: 18
                            }
                        }
                        }
                        label="店铺地址"
                        name="location"
                        initialValue={props.record.location}
                        rules={[{ required: true, message: '请选择店铺地址' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Button>去获取店铺地址</Button>
                </Col>
            </Row>
            <Form.Item
                label="详细地址"
                name="address"
                rules={[{ required: true, message: '请输入店铺详细地址' }]}
                initialValue={props.record.address}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="imgUrl"
                label="上传图片"
                valuePropName="imgUrl"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: '请上传图片' }]}
                initialValue={props.record.imgUrl || ''}
            // extra="longgggggggggggggggggggggggggggggggggg"
            >
                <Upload name="shopImg" action={`${baseServerUrl}/manage/uploadImg/shop`} listType="picture" onChange={shopImgUpload} maxCount={1} defaultFileList={[...defaultFileList]}>
                    <Button icon={<UploadOutlined />}>上传店铺图片</Button>
                </Upload>
            </Form.Item>
            <Form.Item
                label="店铺满减"
            >
                <Form.List name='minusList'
                    initialValue={props.record.minusList}
                >
                    {
                        (fields, { add, remove }, { error }) => (
                            <Fragment>
                                {
                                    fields.map((field, index) => {
                                        console.log(field)
                                        return (
                                            <Space key={field.key} align='baseline'>
                                                <div className="minus-color">
                                                    满
                                                </div>
                                                <Form.Item name={[field.name, 'reach']} fieldKey={[field.fieldKey, 'reach',]}  {...field.restField} rules={reachRule}>
                                                    <InputNumber />
                                                </Form.Item>
                                                <div className="minus-color">
                                                    减
                                                </div>

                                                <Form.Item name={[field.name, 'minus']} fieldKey={[field.fieldKey, 'minus']}  {...field.restField} rules={minusRule}>
                                                    <InputNumber />

                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                            </Space>
                                            // 满多少减
                                        )
                                    })
                                }
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add
                                </Button>
                                </Form.Item>
                            </Fragment>
                        )
                    }
                </Form.List>

            </Form.Item>
        </Form>
    )
    return (
        <Modal title="添加店铺" visible onOk={editConfirm} onCancel={editConfirmModal} centered confirmLoading={confirmLoading}>
            {Demo}
        </Modal>
    )
}

export default ShopEdit
