import { Linking } from "react-native"
import Clipboard from '@react-native-community/clipboard';
import { displayToastSuccess } from 'utilities/Toast'
import { config } from 'constantsConfiguration/config'
import Share from 'react-native-share'

export const externalLinksDefaultHandler = (action, value) => {
    switch (action.action) {
        case "openUrl":
            openUrl(value, action)
            break;
        case "copyText":
            copyText(value, null, action)
            break
        case "shareText":
            shareText(value, action)
            break
        default:
            break;
    }
}

export const openUrl = (url) => {
    let urlNew = url;

    if (urlNew !== "") {
        Linking.canOpenURL(urlNew).then(supported => {
            /* supported && */ Linking.openURL(urlNew);
        }, (err) => { });
    }

    // return true
}

export const copyText = (text, customMessage, action) => {
    Clipboard.setString(text)

    displayToastSuccess(customMessage ? customMessage : 'Tekst uspješno kopiran')

    // return true
}

export const shareText = (text, action) => {
    let options = {
        message: text
    }
    Share.open(options).then(
        (res) => {
        }).catch((err) => {
        });

    // return true
}

export const openAppOrPlayStore = () => {
    let urlNew = Platform.OS === 'ios' ? config.iosUrl : config.androidUrl;

    if (urlNew !== "") {
        Linking.canOpenURL(urlNew).then(supported => {
            Linking.openURL(urlNew);
        }, (err) => { });
    }

    // return true
}
