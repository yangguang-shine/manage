import { Form, Input, Button, Checkbox, Modal, Row, Col, TimePicker, Space, InputNumber } from 'antd';

import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const ShopEdit = (props) => {
    console.log('props:', props)

    const [form] = Form.useForm();
    useEffect(() => {
        console.log(231321)
    }, [props]);
    const handleCancel = () => {
        log('handleCancel')
        props.toCloseEditShopModal()
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

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            // values.endTime = values.endTime.format("HH:mm")
            // values.startTime = values.startTime.format("HH:mm")
            console.log(values)
            const shopInfo = {
                shopName: values.shopName,
                startTime: values.startTime.format("HH:mm"),
                endTime: values.endTime.format("HH:mm"),
                address: values.address,
                description: values.description,
                businessTypes: values.businessTypes,
                minus: JSON.stringify(values.minusList || []),
                shopName: values.shopName,
            }
            props.toUpdateShopInfo(shopInfo)
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };
    const format = 'HH:mm';
    const reachRule = [
        {
            required: true,
            validator(_, value, aa) {
                const pattern = new RegExp(/^[1-9]\d*$/, 'g')
                if (!pattern.test(value)) {
                    console.log('pattern.test(value)')
                    console.log(pattern.test(value))
                    return Promise.reject();
                }
                const arr = _.field.split('.')
                if (+arr[1] === 0) {
                    return Promise.resolve();
                } else {
                    console.log(222)
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
                    console.log('pattern.test(value)')
                    console.log(pattern.test(value))
                    return Promise.reject();
                }
                const arr = _.field.split('.')
                const reach = form.getFieldValue(arr[0]).[arr[1]].['reach'];
                console.log('reach')
                console.log(reach)
                if (+reach > +value) {
                    return Promise.resolve();
                } else {
                    return Promise.reject();

                }
            },
            message: '请输入正确',
        },
    ]
    console.log('props.record.minus')
    console.log(props.record.minus)
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
                initialValue={props.record.description || 'hhh'}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="店铺业务"
                name="businessTypes"
                rules={[{ required: true, message: '请选择业务类型' }]}
                initialValue={props.record.businessTypes}
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
                        initialValue={moment(props.record.startTime, format)}
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
                        initialValue={moment(props.record.endTime, format)}
                    >
                        <TimePicker format={format} />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                label="店铺地址"
                name="address"
                rules={[{ required: true, message: '请选择店铺地址' }]}
                initialValue={props.record.address}
            >
                <Input />
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

            {/* <Form.Item
                label="店铺满减"
                name="minus"
                rules={[{ required: true, message: 'Please input your username!' }]}
                initialValue={props.record.minus}
            >
                <Input />
            </Form.Item> */}
        </Form>
    )



    return (
        <Modal
            title="添加店铺"
            visible
            onOk={handleOk}
            onCancel={handleCancel}
            centered
        >
            {Demo}
        </Modal>
    )
}

export default ShopEdit
