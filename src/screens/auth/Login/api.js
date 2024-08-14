import axios from "api/axios"
import base64 from 'react-native-base64';
import md5 from 'md5';

const apiVersion = 'v1'
const apiPath = 'auth'

const login = async ({ username, password }) => {
    let passwordMD5 = md5(password);

    const text = `${username}:${passwordMD5}`
    const authorization = base64.encode(text)
    const url = `${apiVersion}/${apiPath}/`

    return new Promise((resolve, reject) => {
        axios
            .get(url, { headers: { Authorization: `Basic ${authorization}` } })
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

const api = { login }

export default api