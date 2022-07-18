import { Form, Input, Button, Checkbox, Spin } from 'antd';
import React, { useState, useEffect, Fragment } from 'react';
import useFetch from '../../utils/useFetch'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
// import { baseServerUrl } from '../../utils/config'
export default () => {
    const fetch = useFetch()
    const navigate = useNavigate()
    const [spinning, setSpinning] = useState(false)
    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            setSpinning(true)
            await fetch('/manage/account/login', {
                phone: values.username,
                password: values.password
            })
            navigate('/shop', {
                replace: true
            })
        } catch (error) {
            message.error('login error ')
        } finally {
            setSpinning(false)
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Spin spinning={spinning} tip='loading...'>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
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

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};
