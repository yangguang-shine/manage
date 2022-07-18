import { Form, Input, Button, Checkbox, Modal, Row, Col, TimePicker, Space, InputNumber, Upload, Select } from 'antd';

import { UploadOutlined } from '@ant-design/icons';
import { MinusCircleOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import useFetch from '@/utils/useFetch';
import { delaySync } from '@/utils/index.js';
import { shopImgPath } from '@/config/index.js'
import { baseServerUrl } from '../../utils/config.js'
import { SketchPicker } from 'react-color'
import './ShopEdit.less';

// import './shopEdit.less'
const ShopAdd = (props) => {
    console.log('props.record.mainColor')
    console.log(props.record.mainColor)
    const fetch = useFetch()
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [color, setColor] = useState(props.record.mainColor);
    const [colorPickerFlag, setColorPickerFlag] = useState(false);
    const [deliverItemFlag, setDeliverItemFlag] = useState((props.record.businessTypesList || []).includes('2') ? true : false);
    const defaultFileList = [
        {
            name: '店铺图片',
            status: 'done',
            url: `${shopImgPath}/${props.record.imgUrl}`,
            thumbUrl: `${shopImgPath}/${props.record.imgUrl}`,
        }
    ];

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
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const editConfirm = async () => {
        try {
            setConfirmLoading(true)
            const values = await form.validateFields();
            console.log('values')
            console.log(values)
            const shopInfo = formatShopInfo(values)
            console.log('shopInfo')
            console.log(shopInfo)
            if (props.record.shopID) {
                await editShop(shopInfo)
            } else {
                await addShop(shopInfo)
            }
            setConfirmLoading(false)
            props.toUpdateShopList()
        } catch (errorInfo) {
            setConfirmLoading(false)
            console.log('Failed:', errorInfo);
        } finally {
        }
    };
    function formatShopInfo(values) {
        // const positionList = values.positionInfo.split(',')
        // const [latitude, longitude] = positionList;
        values.businessTypesList.sort((a, b) => a - b)
        return {
            shopName: values.shopName,
            startTime: values.startTime.format("HH:mm"),
            endTime: values.endTime.format("HH:mm"),
            address: values.address,
            description: values.description,
            businessTypes: JSON.stringify(values.businessTypesList),
            minus: JSON.stringify(values.minusList || []),
            shopName: values.shopName,
            latitude: '111',
            longitude: '222',
            location: '北京市大兴区西三路',
            shopID: props.record.shopID,
            imgUrl: values.imgUrl || '',
            mode: values.mode || 'vertical',
            mainColor: values.mainColor,
            deliverPrice: values.deliverPrice || 0,
            startDeliverPrice: values.startDeliverPrice
        }
    }
    async function addShop(shopInfo) {
        await fetch('/manage/shop/add', shopInfo)
    }
    async function editShop(shopInfo) {
        await fetch('/manage/shop/edit', shopInfo)
    }
    const format = 'HH:mm';
    const reachRule = [
        // {
        //     required: true,
        //     validator(_, value, aa) {
        //         const pattern = new RegExp(/^[1-9]\d*$/, 'g')
        //         if (!pattern.test(value)) {
        //             return Promise.reject();
        //         }
        //         const arr = _.field.split('.')
        //         if (+arr[1] === 0) {
        //             return Promise.resolve();
        //         } else {
        //             if (+value > form.getFieldValue(arr[0]).[+arr[1] - 1].[arr[2]]) {
        //                 return Promise.resolve();
        //             } else {
        //                 return Promise.reject();
        //             }
        //         }
        //     },
        //     message: '请输入正确',
        // },
    ]
    const minusRule = [
        // {
        //     required: true,
        //     validator(_, value, aa) {
        //         const pattern = new RegExp(/^[1-9]\d*$/, 'g')
        //         if (!pattern.test(value)) {
        //             return Promise.reject();
        //         }
        //         const arr = _.field.split('.')
        //         const reach = form.getFieldValue(arr[0]).[arr[1]].['reach'];
        //         if (+reach > +value) {
        //             return Promise.resolve();
        //         } else {
        //             return Promise.reject();

        //         }
        //     },
        //     message: '请输入正确',
        // },
    ]
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
    function colorPickerChange(info) {
        setColor(info.hex)
        form.setFieldsValue({
            mainColor: info.hex
        })
        console.log(info)
    }
    function tooglePicker() {
        setColorPickerFlag(!colorPickerFlag)
    }
    function onValuesChange(changedValues, allValues) {
        (allValues.businessTypesList || []).includes('2') ? setDeliverItemFlag(true) : setDeliverItemFlag(false)
    }
    const ShopInfoForm = (
        <Form
            form={form}
            labelCol={{
                span: 4
            }}
            wrapperCol={{
                span: 20
            }}
            name="basic"
            onValuesChange={onValuesChange}
            initialValues={{ ...props.record, startTime: props.record.startTime && moment(props.record.startTime, format), endTime: props.record.endTime && moment(props.record.endTime, format), }}
        >
            <Form.Item
                label="店铺名称"
                name="shopName"
                rules={[{ required: true, message: '请输入店铺名称' }]}
            // initialValue={props.record.shopName}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="店铺简介"
                name="description"
                rules={[{ required: true, message: '请输入店铺简介' }]}
            // initialValue={props.record.description}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="店铺模式"
                name="mode"
                rules={[{ required: true, message: '请输入店铺简介' }]}
            // initialValue={props.record.description}
            >
                <Select >
                    <Select.Option value="vertical">垂直</Select.Option>
                    <Select.Option value="horizontal">水平</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="店铺色调"
                name="mainColor"
                rules={[{ required: true, message: '请输入店铺色调' }]}
            >
                <div>
                    <div style={{
                        width: '80px',
                        height: '32px',
                        background: color
                    }} className='select-color-button' onClick={tooglePicker}></div>
                    {
                        colorPickerFlag ? <div className='color-picker-box'>
                            <div className='color-picker-overlay' onClick={tooglePicker}></div>
                            <SketchPicker color={color} onChange={colorPickerChange}></SketchPicker>
                        </div> : null
                    }
                </div>
            </Form.Item>

            <Form.Item
                label="店铺业务"
                name="businessTypesList"
                rules={[{ required: true, message: '请选择业务类型' }]}
            // initialValue={props.record.businessTypesList}
            >
                <Checkbox.Group>
                    <Checkbox value="1">堂食</Checkbox>
                    <Checkbox value="2">外卖</Checkbox>
                    <Checkbox value="3">自提</Checkbox>
                </Checkbox.Group>
            </Form.Item>
            {
                deliverItemFlag ?
                    <Form.Item
                        label="配送价格"
                        name="deliverPrice">
                        <InputNumber />
                    </Form.Item>
                    : null
            }
            <Form.Item
                label="起送价格"
                name="startDeliverPrice">
                <InputNumber />
            </Form.Item>
            <Row >
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        {...timeLayout}
                        label="营业开始"
                        name="startTime"
                        rules={[{ required: true, message: '请输入营业开始时间' }]}
                    // initialValue={props.record.startTime ? moment(props.record.startTime, format) : ''}
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
                    >
                        <TimePicker format={format} />
                    </Form.Item>
                </Col>
            </Row>
            {/* <Row>
                <Col span={16}>
                    <Form.Item
                        labelCol={{
                            span: 6
                        }}
                        wrapperCol={{
                            span: 18
                        }}
                        label="店铺坐标"
                        name="positionInfo"
                        rules={[{ required: true, message: '请选择店铺坐标' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Button onClick={toGetAddress}>去获取坐标信息</Button>
                </Col>
            </Row> */}


            {/* <Row>
                <Col span={16}>
                    <Form.Item
                        labelCol={{
                            span: 6
                        }}
                        wrapperCol={{
                            span: 18
                        }}
                        label="店铺地址"
                        name="location"
                        rules={[{ required: true, message: '请选择店铺地址' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Button>去获取店铺地址</Button>
                </Col>
            </Row> */}
            <Form.Item
                label="详细地址"
                name="address"
                rules={[{ required: true, message: '请输入店铺详细地址' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="imgUrl"
                label="上传图片"
                valuePropName="imgUrl"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: '请上传图片' }]}
            >
                <Upload name="shopImg" action={`${baseServerUrl}/manage/uploadImg/shop`} listType="picture" maxCount={1} defaultFileList={defaultFileList}>
                    <Button icon={<UploadOutlined />}>上传店铺图片</Button>
                </Upload>
            </Form.Item>
            <Form.Item
                label="店铺满减"
            >
                <Form.List name='minusList'
                >
                    {
                        (fields, { add, remove }, { error }) => (
                            <Fragment>
                                {
                                    fields.map((field, index) => {
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

                                                <Form.Item name={[field.name, 'reduce']} fieldKey={[field.fieldKey, 'reduce']}  {...field.restField} rules={minusRule}>
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
        <Modal title={props.record.shopID ? '编辑店铺' : '添加店铺'} visible onOk={editConfirmModal} onCancel={editConfirmModal} centered confirmLoading={confirmLoading}>
            {ShopInfoForm}
        </Modal>
    )
}

export default ShopAdd
