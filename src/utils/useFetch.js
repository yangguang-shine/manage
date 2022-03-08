import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { baseServerUrl } from './config'
// http://dev.jr.jd.com:7777/api/user/address/list
axios.defaults.baseURL = baseServerUrl;
export default function useFetch() {
    const history = useHistory()
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
            }).then((result) => {
                const code = result.data.code
                const data = result.data.data
                const msg = result.data.msg
                if (code === '000') {
                    resolve(data)
                } else if (code === '200' && fetchOptions.autoLoginFlag) {
                    history.replace('/login')
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
