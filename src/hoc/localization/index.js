import React, { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage } from 'reduxConfiguration/slices/languageSlice';

import en from 'constantsConfiguration/localization/en';
import ba from 'constantsConfiguration/localization/ba';
import { useCallback } from 'react';


const Localization = (componentName, WrappedComponent) => (props) => {
    const reduxLanguage = useSelector(selectLanguage)
    const selectedLanguage = reduxLanguage === 'ba' ? ba : en

    let newObj = useMemo(() => (Array.isArray(componentName) ? componentName.reduce((prev, next) => ({ ...prev, ...selectedLanguage[next] }), {}) : selectedLanguage[componentName]), [componentName, selectedLanguage])

    const t = useCallback((text, fallback) => {
        return newObj[text] || fallback
    }, [newObj])

    return (<WrappedComponent {...props} t={t} locale={newObj} />);
}

export default Localization;

