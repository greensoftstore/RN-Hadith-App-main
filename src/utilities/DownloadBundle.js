/**
 * createdAt : 2023.12.17
 * Check Bundle File func
 */
import RNFS from 'react-native-fs';

import config from '../constantsConfiguration/config'


/**
 * Get Bundle Data form Firestore collection.
 * @param {Object} BookBundle data object from firestore.
 * @returns {Object} Local Storage BookBundle info object.
 */
const existBundleFile = async (data) => {
    const fileUrl = data.fileURL;
    const bundleCreateTime = data.timeCreated;

    // let file_ext = getFileExtention(fileUrl);

    const filePath = config.BundlePath
    const exist = await RNFS.exists(filePath);

    if(exist) {
        const bundleFileInfo = await RNFS.stat(filePath)
        const localCreateTime = bundleFileInfo.ctime;
        
        let bundleTimestamp = new Date(bundleCreateTime).getTime();
        let localTimestamp = new Date(localCreateTime).getTime();
        
        if(localTimestamp > bundleTimestamp) {
            return { exist: exist, download: false, url: fileUrl, path: filePath }
        } else {
            return { exist: exist, download: true, url: fileUrl, path: filePath }
        }
    } else {
        return { exist : exist, download: true, url: fileUrl, path: filePath }
    }
}


/**
 * Get file extentions
 * @param {fileURL} fileUrl 
 * @returns file extention(e.g. txt, jpg, etc.)
 */
const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
};


export default {
    existBundleFile,
}