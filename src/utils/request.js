import axios from 'axios';
// http://dev.jr.jd.com:7777/api/user/address/list
axios.defaults.baseURL = 'http://dev.jr.jd.com:7777/api';
const axiosRequest = (url, params, options, method) => {
    return new Promise((resolve, reject) => {
        axios({
            url,
            method,
            data: params
        }).then((result) => {
            const code = result.data.code
            const data = result.data.data
            const msg = result.data.msg
            if (code === '000') {
                resolve(result.data.data)
            } else {
                reject(msg)
            }
        }).catch((err) => {
            reject(err)
        });
    })
}
export default {
    get: (url = '', params = {}, options = {
        error: true
    }) => axiosRequest(url, params, options, 'get'),
    post: (url = '', params = {}, options = {
        error: true
    }) => axiosRequest(url, params, options, 'post')
}