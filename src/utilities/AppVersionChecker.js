import { Platform } from 'react-native';
import compareVersions from 'compare-versions';

export const compareVersion = (local, remote) => {
    switch (compareVersions(local, remote)) {
        case -1:
            return 'new';
        case 1:
            return 'old';
        default:
            return 'equal';
    }
};

export const getAndroidVersion = async (storeURL = '') => {
    if (!storeURL.match(/^https?:\/\/play\.google\.com\/store\/apps\/details\?id=[0-9a-zA-Z.]+/)) {
        throw new Error('androidStoreURL is invalid.');
    }
    const response = await fetch(storeURL).then((r) => {
        if (r.status === 200) {
            return r.text();
        }
        throw new Error('androidStoreURL is invalid.');
    });
    const matches = response.match(/\[\[\[['"]((\d+\.)+\d+)['"]\]\],/);
    if (!matches) {
        throw new Error('can\'t get android app version.');
    }
    return matches[1];
};

export const getIOSVersion = async (storeURL = '', country = 'jp') => {
    const appID = storeURL.match(/.+id([0-9]+)\??/);
    if (!appID) {
        throw new Error('iosStoreURL is invalid.');
    }
    const response = await fetch(`https://itunes.apple.com/lookup?id=${appID[1]}&country=${country}&${new Date().getTime()}`, {
        headers: {
            'cache-control': 'no-cache',
        },
    })
        .then((r) => {
            return r.text()
        })
        .then((r) => JSON.parse(r));
    if (response.results.length === 0) {
        throw new Error(`appID(${appID[1]}) is not released.`);
    }
    return response.results[0].version;
};

const checkVersion = async (params) => {
    if (!params.version) {
        throw new Error('local version is not set.');
    }
    if (Platform.OS === 'ios' && !params.iosStoreURL) {
        throw new Error('iosStoreURL is not set.');
    }
    if (Platform.OS === 'android' && !params.androidStoreURL) {
        throw new Error('androidStoreURL is not set.');
    }
    let remoteVersion;
    try {
        remoteVersion = (Platform.OS === 'ios')
            ? await getIOSVersion(params.iosStoreURL, params.country || 'jp')
            : await getAndroidVersion(params.androidStoreURL);
    }
    catch (e) {
        throw new Error(e.message);
    }
    let forceUpdate = false;
    const result = compareVersion(params.version, remoteVersion);

    if (remoteVersion) {

        let acceptedVersionLocal = `${params.version.split('.')[0]}.${params.version.split('.')[1]}.0`
        let acceptedVersionRemote = `${remoteVersion.split('.')[0]}.${remoteVersion.split('.')[1]}.0`
        const resultForceUpdate = compareVersion(acceptedVersionLocal, acceptedVersionRemote);

        if (resultForceUpdate === 'new') forceUpdate = true;
    }

    let detail;
    switch (result) {
        case 'new':
            detail = 'remote > local';
            break;
        case 'old':
            detail = 'remote < local';
            break;
        default:
            detail = 'remote === local';
            break;
    }
    return {
        local: params.version,
        remote: remoteVersion,
        forceUpdate: forceUpdate,
        result,
        detail,
    };
};
export default checkVersion;