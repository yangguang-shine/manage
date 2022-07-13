import { Form, Input, Button, Checkbox, Modal, Row, Col, TimePicker, Space, InputNumber, Upload, Switch } from 'antd';
import React, { useState, useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import useFetch from '@/utils/useFetch';
export default (props) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm()
    const fetch = useFetch()
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
    async function editConfirm() {
        try {
            setConfirmLoading(true)
            const values = await form.validateFields();
            console.log('values')
            console.log(values)
            if (props.record.categoryID) {
                await editCategory({
                    categoryID: props.record.categoryID,
                    shopID: props.record.shopID,
                    categoryName: values.categoryName,
                    required: values.required ? 1 : 0
                })
            } else {
                await addCategory({
                    categoryName: values.categoryName,
                    required: values.required ? 1 : 0,
                    shopID: props.record.shopID,
                })
            }
            setConfirmLoading(false)
            props.toUpdateCategoryList()
        } catch (e) {
            setConfirmLoading(false)
            console.log(e)
        } finally {

        }
    }
    async function addCategory(categoryInfo) {
        await fetch('/manage/category/add', categoryInfo)
    }
    async function editCategory(categoryInfo) {
        await fetch('/manage/category/edit', categoryInfo)
    }

    async function editCancel() {
        props.toCloseEditModal()
    }
    return (
        <Modal title={props.record.shopID ? '编辑店铺' : '添加店铺'} visible onOk={editConfirmModal} onCancel={editConfirmModal} centered confirmLoading={confirmLoading}>
            <Form
                form={form}
                labelCol={{
                    span: 4
                }}
                name="categoryForm"
                wrapperCol={{
                    span: 20
                }}
                initialValues={
                    props.record
                }
            >

                <Form.Item
                    label="分类名称"
                    name="categoryName"
                    rules={[{ required: true, message: '请输入分类名称' }]}>
                    <Input />

                </Form.Item>
                <Form.Item name="required" label="必选项" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Form>
        </Modal>


    )
}