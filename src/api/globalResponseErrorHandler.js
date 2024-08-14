import translations from "constantsConfiguration/localization"
import { createApiMessage } from "reduxConfiguration/slices/snackbarSlice"

const loginApi = (url = '') => url.includes('/auth/') || url.includes('/auth.pin/')

export const parseErrorMessage = ({ customCode, internalCode, responseStatus, language }) => {
    const defaultLanguage = 'EN'
    return translations[language || defaultLanguage].RequestErrors.custom[customCode]
        || translations[language || defaultLanguage].RequestErrors.internal[internalCode]
        || translations[language || defaultLanguage].RequestErrors.network[responseStatus]
        || translations[language || defaultLanguage].RequestErrors.default
}

export const apiErrorSnackbarOptions = (key = 0, variant = 'error') => ({
    variant: variant,
    key,
    anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
    },
})

export const globalResponseErrorHandler = (error, store, customMessage = null) => {
    const requestUrl = error?.config?.url

    const responseStatus = error?.response?.status || null

    if (!store.getState().netInfo.netInfoStatus) message = 'No Internet Connection';

    const snackbarSetup = (message, key) => {
        let tempKey = key || new Date().getTime() + Math.random()

        if (message === 'No Internet Connection') tempKey = 'noInternetConnection'

        store.dispatch(createApiMessage({ message, key: tempKey, options: apiErrorSnackbarOptions(tempKey, 'error') }))
    }

    switch (responseStatus) {
        case 401:
            if (!loginApi(requestUrl)) {
                snackbarSetup(message, 'unauthenticated')
            } else { snackbarSetup(message) }
            break;

        default:
            snackbarSetup(message)
            break;
    }

    return ({ message })
}
