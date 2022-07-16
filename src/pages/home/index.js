import './index.less'
import { Table, Tag, Popconfirm, Modal, Button, Spin, Space, Row, Col, Upload } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { baseServerUrl } from '@/utils/config';
import { commonImgPath } from '@/config';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

const App = () => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewUrl, setPreviewImgUrl] = useState('');
    const [fileList, setFileList] = useState([])
    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file) => {
        console.log(file)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || (file.preview));
        setPreviewVisible(true);
        setPreviewImgUrl(file.url);
    };

    const handleChange = ({ fileList: newFileList }) => {
        console.log('handleChange');
        console.log(newFileList);
        (newFileList || []).forEach((fileItem) => {
            if (fileItem.status === 'done') {
                if (fileItem.response && fileItem.response.code === '000') {
                    console.log(113231232)
                    const data = fileItem.response.data
                    const imgUrl = `${commonImgPath}/${data.imgUrl}`
                    fileItem.url = imgUrl
                }
                else {
                    fileItem.status = 'error'
                }
            }
        })
        setFileList(newFileList);

    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    // const uploadButton = (
    //     <div>
    //       {loading ? <LoadingOutlined /> : <PlusOutlined />}
    //       <div style={{ marginTop: 8 }}>Upload</div>
    //     </div>
    //   )
    const onRemove = (deleteFile) => {
        console.log('deleteFile')
        console.log(deleteFile)
        // console.log(fileList.filter((file) => file.uid !== deleteFile.uid))
        // setFileList(fileList.filter((file) => file.uid !== deleteFile.uid))
        // console.log('onRemove')
        return true
    }
    const itemRender = () => {
        return null
        // return <img style={{'width': '200px'}} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
    }
    return (
        <>
            <Row align="middle" justify="center">
                <Col span={20}>
                    
                </Col>
                {/* <Col span={4}>
                    <Upload
                        action={`${baseServerUrl}/manage/uploadImg/common`}
                        onChange={handleChange}
                        // itemRender={itemRender}
                    >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Col> */}
            </Row>
            <div>上传图片</div>
            <Upload
                action={`${baseServerUrl}/manage/uploadImg/common`}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                // onRemove={onRemove}
            >
                                        {uploadButton}

            </Upload>
            <Modal visible={previewVisible} title={'预览图片'} footer={null} onCancel={handleCancel}>
                <div style={{'marignBottom': '30px'}}>{previewUrl}</div>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};

export default App;

// export default class Home extends React.Component {
//     constructor(props) {
//         super(props)
//     }
//     render() {
//         return <div>

//         </div>
//     }
// }