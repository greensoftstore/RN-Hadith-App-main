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
    },

    initialState: {
        [fields.EMAIL]: { value: '', initialValue: '', updateField: 0 },
    },

    submitFields: {
        create: [fields.EMAIL],
    },

    displayFields: {
        create: [fields.EMAIL,],
    },
}

export default createAndEditList;