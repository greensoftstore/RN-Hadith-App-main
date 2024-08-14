import { Platform } from "react-native"
import RNFS from 'react-native-fs';

let origin = ''
let protocol = 'https'
let appCenterVersionAndorid = '1'
let appCenterVersioniOS = '1'
let email = 'testmail@gmail.com'

/**
 * createdAt : 2023.12.18
 * ===================================================================
 */

let bandlePath = RNFS.ExternalDirectoryPath + '/BookBundle.txt';
let mbyteSize = 1024 * 1024;
let bookBundleQuery = {};

// ===================================================================

const config = {
  apiUrl: `${protocol}://${origin}/api/`,
  storageUrl: `${protocol}://${origin}/storage/`,
  androidUrl: ``,
  iosUrl: ``,
  appCenterVersion: Platform.OS === 'android' ? appCenterVersionAndorid : appCenterVersioniOS,
  email: email,
  BundlePath: bandlePath,
  mbSize: mbyteSize,
  bookBundleQuery: bookBundleQuery
}
export { config }
export default config