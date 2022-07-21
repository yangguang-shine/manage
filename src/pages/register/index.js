import { Form, Input, Button, Checkbox, Spin, Space } from 'antd';
import React, { useState, useEffect, Fragment } from 'react';
import useFetch from '../../utils/useFetch'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd';
import './index.less'
// import { baseServerUrl } from '../../utils/config'
export default () => {
    const fetch = useFetch()
    const navigate = useNavigate()
    const [spinning, setSpinning] = useState(false)
    const managePhone = ''
    const managePassword = ''
    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            setSpinning(true)
            await fetch('/manage/account/register', {
                phone: values.managePhone,
                password: values.managePassword,
                nickname: values.managePhone
            })
            setSpinning(false)
            navigate('/shop', {
                replace: true
            })
        } catch (error) {
            setSpinning(false)

            message.error(error)
        } 
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        
        <Spin spinning={spinning} tip='loading...'>
            <div className="login-title">登录</div>
            <Form
                name="basic"
                labelCol={{ span: 2,}}
                wrapperCol={{ span: 6 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="账号"
                    name="managePhone"
                    initialValue={managePhone}
                    rules={[{ required: true, message: '请输入账号' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="managePassword"
                    initialValue={managePassword}
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
                    <Space>
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                    <Button className="to-login-button" type="primary" >
                        有账号，去登陆
                    </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Spin>
    );
};
