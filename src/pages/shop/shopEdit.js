import { Form, Input, Button, Checkbox, Modal } from 'antd';

import React, { useState } from 'react';

const ShopEdit = (props) => {
    const [confirmLoading, setConfirmLoading] = useState()
    const handleOk = () => {
        log('handleOk')

        setConfirmLoading(true)
        setTimeout(() => {
            setConfirmLoading(false)
            props.addShop()
            props.toCloseEditShop()
        }, 2000);
    }

    const handleCancel = () => {
        log('handleCancel')
        props.toCloseEditShop()
    }

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const Demo = (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )



    return (
        <Modal
            title="添加店铺"
            visible
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            centered
        >
            {Demo}
        </Modal>
    )
}

export default ShopEdit
