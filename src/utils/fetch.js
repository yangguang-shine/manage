import axios from 'axios';
import { useHistory, withRouter } from 'react-router-dom'

export const baseURL = 'http://dev.jr.jd.com:7777/api'
// http://dev.jr.jd.com:7777/api/user/address/list
axios.defaults.baseURL = baseURL;
export default withRouter(function ferch (url, params, options = {}){
    const history = useHistory()
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
})

