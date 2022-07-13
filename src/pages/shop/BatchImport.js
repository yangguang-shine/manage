import { Input, Modal, message } from 'antd';
import React, { useState, useEffect } from 'react';

import moment from 'moment';
import useFetch from '@/utils/useFetch';
import { delaySync } from '@/utils/index.js';
import { shopImgPath } from '@/config/index.js'
import { baseServerUrl } from '../../utils/config.js'
import { SketchPicker } from 'react-color'
import './ShopEdit.less';

const { TextArea } = Input;



// import './shopEdit.less'



const BatchImport = (props) => {
    console.log('props')
    console.log(props)
    const fetch = useFetch()
    const [value, setValue] = useState(``);
    async function confirm() {
        handleInputData()
        try {
            const originValue = JSON.parse(value)

            const categoryListOrigin = originValue.data.food_spu_tags.filter((item) => Number(item.tag) > 1000)
            console.log('categoryListOrigin')
            console.log(categoryListOrigin)
            // console.log(JSON.stringify(categoryListOrigin[0]))
            // const test1 = categoryListOrigin[0]
            // categoryItemOriginTest(test1)
            // return
            const categoryList = categoryListOrigin.map((categoryItemOrigin) => {
                const categoryItem = {}
                categoryItem.shopID = props.record.shopID
                categoryItem.categoryName = categoryItemOrigin.name

     
                categoryItem.foodList = categoryItemOrigin.spus.map((foodItemOrigin) => {
                    const specification = [];
                    (foodItemOrigin.attrs || []).forEach((attrItem) => {
                        specification.push({
                            specificationName: attrItem.name,
                            categoryList: (attrItem.values || []).map((valueItem) => {
                                return {
                                    specificationDetail:valueItem.value,
                                    specificationPrice: Math.random() > 0.5 ? 1 : 0
                                }
                            })
                        })
                    })
                    const foodItem = {
                        foodName: foodItemOrigin.name,
                        categoryName: categoryItemOrigin.name,
                        price: foodItemOrigin.min_price,
                        unit: foodItemOrigin.unit,
                        originImgUrl: `${foodItemOrigin.picture}`,
                        description: foodItemOrigin.description,
                        shopID: props.record.shopID,
                        packPrice: foodItemOrigin.skus[0].box_price,
                        reserveCount: 99,
                        specificationList: specification,
                        specification: JSON.stringify(specification)
                    }
                    return foodItem
                })
                return categoryItem
            })
            console.log('categoryList')
            console.log(categoryList)
            const res = await fetch('/manage/shop/bulkImportFood', {
                shopID: props.record.shopID,
                categoryList
            })
            console.log(res)
            message.success('批量导入成功')
            // props.confirm()
        } catch (e) {
            console.log(e)

        }

        // props.confirm()

    }
    function handleInputData() {

    }
    function cancel() {
        props.cancel()
    }
    useEffect(() => {
        setValue('')
    }, [props.visible]);
    function onChange(e) {
        console.log(e.target.value)
        setValue(e.target.value)
        const value = e.target.value

    }

    async function categoryItemOriginTest(test1) {
        const categoryItem = {}
        categoryItem.shopID = props.record.shopID
        categoryItem.categoryName = test1.name
        categoryItem.foodList = test1.spus.map((foodItemOrigin) => {
         
            const foodItem = {
                foodName: foodItemOrigin.name,
                categoryName: test1.name,
                price: foodItemOrigin.min_price,
                unit: foodItemOrigin.unit,
                originImgUrl: `${foodItemOrigin.picture}`,
                description: foodItemOrigin.description,
                shopID: props.record.shopID,
                packPrice: foodItemOrigin.skus[0].box_price,
                reserveCount: 99,
            }
            return foodItem
        })
        console.log()
        const res = await fetch('/manage/shop/bulkImportFood', {
            shopID: props.record.shopID,
            categoryList: [categoryItem]
        })
        console.log(res)
    }


    return (
        <Modal title={'批量导入'} visible={props.visible} destroyOnClose={true} onOk={confirm} onCancel={cancel} centered okText="批量导入">
            <TextArea placeholder="请输入批量导入的数据" autoSize={{ minRows: 4, maxRows: 10 }} value={value}
                onChange={onChange} />
        </Modal>
    )
}

export default BatchImport
