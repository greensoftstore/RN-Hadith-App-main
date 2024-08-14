// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useRef, useMemo, createRef } from 'react';
import { View, Text } from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Constants
// ===================================================================
import { GlobalStyle, Images } from 'constantsConfiguration'
// =================================================================== 
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
// Components
// ===================================================================
import { InputFieldWithDebounce } from 'components';
// =================================================================== 

const Inputs = ({ t, screenSettings, reduce, triedToSubmitAtLeastOnce, disabled, onFocusAddition }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatchRedux = useDispatch()
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    const innerSettings = useMemo(() => ({ ...screenSettings.createAndEditList }), [])

    // ===================================================================
    // Refs
    // -------------------------------------------------------------------
    const inputsRef = useRef(innerSettings.displayFields.create.map(() => createRef()));
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', }} >
            {
                innerSettings.displayFields.create.map((item, index) => {
                    return (
                        <InputFieldWithDebounce
                            disabled={disabled}
                            key={innerSettings.fields[item].label}
                            reference={inputsRef.current[index]}
                            onSubmitEditing={() => {
                                inputsRef?.current[index + 1]?.current?.focus();
                            }}
                            initialValue={innerSettings.initialState[item].initialValue}
                            inputSettings={innerSettings.fields[item]}
                            reduce={reduce}
                            triedToSubmitAtLeastOnce={triedToSubmitAtLeastOnce}
                            onFocusAddition={onFocusAddition}
                        // shadow
                        />
                    )
                })
            }
        </View>
    )
};

export default Localization('Auth', memo(Inputs));
