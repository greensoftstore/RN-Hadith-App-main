import { enumInputType, enumReturnKeyType, errorText } from 'constantsConfiguration/enums/table';
import { regexTypes, regexExtension } from 'constantsConfiguration/Regex';
import { Images } from 'constantsConfiguration';

import fields from './Fields';

const createAndEditList = {
    fields: {
        // User

        [fields.EMAIL]: {
            label: fields.EMAIL,
            placeholder: fields.EMAIL_TITLE,
            type: enumInputType.TEXT_INPUT,
            secure: false,
            returnKeyType: enumReturnKeyType.NEXT,
            validation: {
                important: true,
                max: 64,
                min: 1,
                regexSetup: { regex: regexTypes.email, extension: regexExtension.global, type: 'string' },
                defaultErrorText: errorText.DEFAULT_ERROR_TEXT
            },
            imageIcon: null,
            defaultValue: '',
            descriptionText: null,
        },
        [fields.PASSWORD]: {
            label: fields.PASSWORD,
            placeholder: fields.PASSWORD_TITLE,
            type: enumInputType.TEXT_INPUT,
            secure: true,
            returnKeyType: enumReturnKeyType.NEXT,
            validation: {
                important: true,
                max: 48,
                min: 6,
                regexSetup: { regex: regexTypes.password, extension: regexExtension.global, type: 'string' },
                defaultErrorText: errorText.DEFAULT_ERROR_TEXT
            },
            imageIcon: null,
            defaultValue: '',
            descriptionText: null,
        },
        [fields.REPEATED_PASSWORD]: {
            label: fields.REPEATED_PASSWORD,
            placeholder: fields.REPEATED_PASSWORD_TITLE,
            type: enumInputType.TEXT_INPUT,
            secure: true,
            returnKeyType: enumReturnKeyType.DONE,
            validation: {
                important: true,
                compareValue: fields.PASSWORD,
                max: 48,
                min: 6,
                regexSetup: { regex: regexTypes.password, extension: regexExtension.global, type: 'string' },
                defaultErrorText: errorText.DEFAULT_ERROR_TEXT
            },
            imageIcon: null,
            defaultValue: '',
            descriptionText: null,
        },
        [fields.USERNAME]: {
            label: fields.USERNAME,
            placeholder: fields.USERNAME_TITLE,
            type: enumInputType.TEXT_INPUT,
            secure: false,
            returnKeyType: enumReturnKeyType.NEXT,
            validation: {
                important: true,
                max: 48,
                min: 4,
                regexSetup: { regex: regexTypes.username, extension: regexExtension.global, type: 'string' },
                defaultErrorText: errorText.DEFAULT_ERROR_TEXT
            },
            imageIcon: null,
            defaultValue: '',
            descriptionText: null,
        },
    },

    initialState: {
        [fields.USERNAME]: { value: '', initialValue: '', updateField: 0 },
        [fields.PASSWORD]: { value: '', initialValue: '', updateField: 0 },
        [fields.REPEATED_PASSWORD]: { value: '', initialValue: '', updateField: 0 },
        [fields.EMAIL]: { value: '', initialValue: '', updateField: 0 },
    },

    submitFields: {
        create: [fields.USERNAME, fields.PASSWORD, fields.REPEATED_PASSWORD, fields.EMAIL],
    },

    displayFields: {
        create: [fields.EMAIL, fields.USERNAME, fields.PASSWORD, fields.REPEATED_PASSWORD,],
    },
}

export default createAndEditList;