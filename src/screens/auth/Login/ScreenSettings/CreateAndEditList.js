import { enumInputType, enumReturnKeyType, errorText } from 'constantsConfiguration/enums/table';
import { regexTypes, regexExtension } from 'constantsConfiguration/Regex';
import { Images } from 'constantsConfiguration';

import fields from './Fields';

const createAndEditList = {
    fields: {
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
            returnKeyType: enumReturnKeyType.DONE,
            validation: {
                important: true,
                max: 48,
                min: 4,
                regexSetup: { regex: regexTypes.password, extension: regexExtension.global, type: 'string' },
                defaultErrorText: errorText.DEFAULT_ERROR_TEXT
            },
            imageIcon: null,
            defaultValue: '',
            descriptionText: null,
        },
    },

    initialState: {
        [fields.EMAIL]: { value: null, initialValue: null, updateField: 0 },
        [fields.PASSWORD]: { value: null, initialValue: null, updateField: 0 },
    },

    submitFields: {
        create: [fields.EMAIL, fields.PASSWORD],
    },

    displayFields: {
        create: [fields.EMAIL, fields.PASSWORD,],
    },
}

export default createAndEditList;