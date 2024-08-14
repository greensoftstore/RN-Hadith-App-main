
import { URL, URLSearchParams } from 'react-native-url-polyfill';
import { regexTypes, regexExtension } from 'constantsConfiguration/Regex';

export const validateURL = (initialUrl,) => {
    try {
        let url = new URL(initialUrl)
        let urlHost = url.host

        var regex = new RegExp(regexTypes.url, regexExtension.globalgi);

        if (urlHost.match(regex)) {
        } else {
            return false
        }
    }
    catch (err) {
        return false;
    }

    return true;
}

export const validateFields = (fields, values, submitFields = null) => {
    let bool = true;

    let arrayValues = submitFields !== null ? submitFields : Object.keys(fields)

    arrayValues.map(item => {
        if (validateField(fields[item], values[item]?.value ? values[item].value : '', null, 'bool') === false) {
            bool = false
        }
        if (values[item]?.value && fields[item]?.validation?.compareValue && (!values[fields[item].validation.compareValue]?.value || values[item].value !== values[fields[item].validation.compareValue].value)) {
            bool = false
        }
    })

    return bool
}

export const validateField = (field, value, compareValue = null, returnType = null) => {
    let res = {
        bool: true,
        text: '',
        additionalText: ''
    }

    if (field?.validation && (field?.validation?.important || value)) {

        if (field?.validation?.important && !field?.validation?.canBeNull && (value === '' || value === null)) {
            res.bool = false
            res.text = field?.validation?.defaultErrorText
            return returnType ? res[returnType] : res
        }

        if (field?.validation?.regexSetup?.regex && RegExp(field.validation.regexSetup.regex, field.validation.regexSetup.extension ? field.validation.regexSetup.extension : 'g').test(value) === false) {
            res.bool = false
            // res.text = field.validation.regexSetup.type === 'email' || field.validation.regexSetup.type === 'url' ? field.placeholder + ' is in wrong format' : field.placeholder + ' contains unsupported characters'
            res.text = field.validation.regexSetup.type === 'email' || field.validation.regexSetup.type === 'url' ? 'The field is in the wrong format' : 'The field contains unsupported characters'

            if (field?.validation?.regexSetup?.errorAddition) res.text = `${res.text} ${field.validation.regexSetup.errorAddition}`

            return returnType ? res[returnType] : res
        }

        if (compareValue !== null && compareValue !== value) {
            res.bool = false
            let fieldText = field.validation.compareValue.includes('password') ? 'password' : field.validation.compareValue.includes('pin') ? 'pin' : ''
            // res.text = field.placeholder + ` does not match ${fieldText}`;
            res.text = `The field does not match the ${fieldText}`;
            return returnType ? res[returnType] : res
        }

        if (field?.validation?.min && value.length < field.validation.min) {
            res.bool = false
            // res.text = field.placeholder + ` must contain at least ${field.validation.min} characters`;
            res.text = `The field does not meet the minimum number of characters`;
            res.additionalText = ` (${field.validation.min})`
            return returnType ? res[returnType] : res
        }

        if (field?.validation?.max && value.length > field.validation.max) {
            res.bool = false
            // res.text = field.placeholder + ` must contain maximum ${field.validation.max} characters`;
            res.text = `The field does not meet the maximum number of characters`;
            res.additionalText = ` (${field.validation.max})`
            return returnType ? res[returnType] : res
        }
    }

    return returnType ? res[returnType] : res

}