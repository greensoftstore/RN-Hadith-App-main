import axios from 'axios';
import config from 'constantsConfiguration/config';
import { globalResponseErrorHandler } from './globalResponseErrorHandler';

let store

export const injectStore = _store => {
    store = _store
}

const customAxios = axios.create({
    baseURL: config.apiUrl
});

const requestHandler = request => {
    const isAuthEndpoint = request.url.includes('auth')

    const bearerToken = store.getState().auth.token

    if (!bearerToken || isAuthEndpoint) return request

    request.headers.Authorization = `Bearer ${bearerToken}`;

    return Promise.resolve(request)
};

customAxios.interceptors.request.use(
    (request) => requestHandler(request)
);

const responseHandler = (response) => {
    return Promise.resolve(response);
};

const errorResponseHandler = (error) => {
    const preparedResponse = globalResponseErrorHandler(error, store)
    return Promise.reject(preparedResponse)
};

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorResponseHandler(error)
);

export default customAxios;