import axios from 'axios';
import { useNavigate, withRouter } from 'react-router-dom'
import { delaySync } from '@/utils/index'
import { message} from 'antd'

export let baseURL = 'http://dev.jr.jd.com:9999/api'
if (process.env.NODE_ENV === 'development') {
    console.log('线上环境')
     baseURL = 'http://dev.jr.jd.com:7777/api'
} else {
    console.log('开发环境')

}
// http://dev.jr.jd.com:7777/api/user/address/list
axios.defaults.baseURL = baseURL;
export default withRouter(function ferch (url, params, options = {}){
    const navigate = useNavigate()
    console.log(history)
    const defaultOptions = {
        autoLoginFlag: true
    }
    const fetchOptions = {
        ...defaultOptions,
        ...options
    }
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'post',
            data: params
        }).then(async (result) => {
            await delaySync()
            const code = result.data.code
            const data = result.data.data
            const msg = result.data.msg
            if (code === '000') {
                resolve(data)
            } else if (code === '200' && fetchOptions.autoLoginFlag) {
                history.replace('/login')
                reject(msg)
            } else {
                message.error(msg)
                reject(msg)
            }
        }).catch((err) => {
            reject(err)
        });
    })
})

