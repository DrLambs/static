import axios from 'axios';
import qs from 'qs';
import {
    LoadingBar
} from 'iview';
import util from '@/libs/util';

// const BASEURL = 'http://127.0.0.1:8080'
const BASEURL = window.location.origin;

// baseURL 将被添加到 url，除非 url 是绝对路径。
axios.defaults.baseURL = BASEURL;

// 序列化 params
/**
 * @param 是与请求一起发送的URL参数
 * data 是要作为请求体发送的数据
 * @returns {*}
 */
axios.defaults.paramsSerializer = params => qs.stringify(params, {
    arrayFormat: 'repeat'
});

/**
 * 请求拦截器
 * config: axios 的配置
 */
axios.interceptors.request.use(
    (config) => {
        if (`${config.baseURL}/` !== config.url) {
            LoadingBar.start();
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
        LoadingBar.finish();
    }
);

/**
 * 响应拦截器
 * response: 响应数据
 */
axios.interceptors.response.use(
    (response) => {
        LoadingBar.finish();
        return response;
    },
    (error) => {
        Promise.reject(error.response);
        LoadingBar.finish();
    }
);

/**
 * 请求成功的处理函数
 * @param response: 响应数据
 * @returns {*}
 */
function checkSuccess(response) {
    LoadingBar.finish();
    if (response && (response.status === 200 || response.status === 304)) {
        return response.data;
    } else {
        util.showMessage({
            msg: `${response.status}: ${response.statusText}`
        });
    }
}

/**
 * 请求失败的处理函数
 * @param response: 响应数据
 * @returns {*}
 */
function checkError(response) {
    LoadingBar.error();
    if (response) {
        const status = parseInt(response.status);
        let message = response.statusText;
        if (status >= 500) {
            message = response.statusText ? response.statusText : 'Server Error';
            util.showMessage({
                msg: `${status}: ${message}`
            });
        } else if (status === 404) {
            message = response.statusText ? response.statusText : 'Not Found';
            util.showMessage({
                msg: `${status}: ${message}`
            });
        } else {
            message = response.statusText ? response.statusText : 'Unknown Type Error';
            util.showMessage({
                msg: `${status}: ${message}`
            });
        }
    }
    return Promise.reject(response);
}

// 封装请求
export default {
    get(url, params) {
        return axios({
            method: 'get',
            url,
            params,
            timeout: 60000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkSuccess).catch(checkError);
    },
    post(url, data) {
        return axios({
            method: 'post',
            url,
            data,
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8; multipart/form-data;'
            }
        }).then(checkSuccess).catch(checkError);
    },
    postJson(url, data) {
        return axios.post(url, data).
        then(checkSuccess).
        catch(checkError);
    },
    put(url, data) {
        return axios({
            method: 'put',
            url,
            data,
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkSuccess).catch(checkError);
    },
    delete(url, params) {
        return axios({
            method: 'delete',
            url,
            params,
            timeout: 60000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkSuccess).catch(checkError);
    }
};