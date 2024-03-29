import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { baseServerUrl } from './config'
import { delaySync } from '@/utils/index'

// http://dev.jr.jd.com:7777/api/user/address/list
axios.defaults.baseURL = baseServerUrl;
export default function useFetch() {
    const navigate = useNavigate()
    return (url, params, options = {}) => {
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
                // await delaySync()
                const code = result.data.code
                const data = result.data.data
                const msg = result.data.msg
                if (code === '000') {
                    resolve(data)
                } else if (code === '200' && fetchOptions.autoLoginFlag) {
                    navigate('/manage/login', {
                        replace: true
                    })
                    reject(msg)
                } else {
                    reject(msg)
                }
            }).catch((err) => {
                reject(err)
            });
        })
    }
}
// export default ferch (url, params, options = {}){
//     const history = useHistory()
//     console.log(history)
//     const defaultOptions = {
//         autoLoginFlag: true
//     }
//     const fetchOptions = {
//         ...defaultOptions,
//         ...options
//     }
//     return new Promise((resolve, reject) => {
//         axios({
//             url,
//             method: 'post',
//             data: params
//         }).then((result) => {
//             const code = result.data.code
//             const data = result.data.data
//             const msg = result.data.msg
//             if (code === '000') {
//                 resolve(data)
//             } else if (code === '200' && fetchOptions.autoLoginFlag) {
//                 history.replace('/login')
//                 reject(msg)
//             } else {
//                 reject(msg)
//             }
//         }).catch((err) => {
//             reject(err)
//         });
//     })
// }
