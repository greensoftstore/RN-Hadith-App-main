/** @format */

export const regexTypes = {
    // Dark
    password: '[-a-zA-Z0-9@:%._+~#=!?"$();,&*/<>×÷¤ßŁł§{}|€]',
    username: '^([a-zA-Z 0-9_.-]+)$',
    stringLower: '^([a-z]+)$',
    stringUpper: '^([A-Z]+)$',
    stringAll: '^([a-zA-Z ]+)$',
    stringAllAndNumber: '^([a-zA-Z0-9 ]+)$',
    stringNumber: '^([0-9]+)$',
    stringNumberDecimal: '^([0-9_.-]+)$',
    string1Char: '^([a-zA-Z]+)${1,}',
    string4Char: '^([a-zA-Z]+)${4,}',
    email: '(.+)@(.+){2,}\.(.+){2,}',
    phone: '\d{9,16}$',
    ip: '^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$',
    url: '^(https?:\\/\\/)((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-{}$]*)?(\\#[-a-z\\d_]*)?$'
}

export const regexExtension = {
    // Dark
    global: 'g',
    globalgi: 'gi',
    globali: 'i',

}

export default { regexTypes, regexExtension };
