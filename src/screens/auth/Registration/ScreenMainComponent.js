// =================================================================== 
// Libraries
// ===================================================================
import React, { useMemo, memo } from 'react';
import { StyleSheet, View, } from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Components
// ===================================================================
import { KeyboardBottom } from 'components';
// =================================================================== 
// Local Components
// ===================================================================
import ScreenDataComponent from './ScreenDataComponent';
// ===================================================================
// Local Settings
// ===================================================================
import ScrennSettings from './ScreenSettings';
// ===================================================================
// Utilities
// ===================================================================
import { createNewObjectFromExistingOne } from 'utilities/common'
// ===================================================================
// APi
// ===================================================================
import api from "./api";
// ===================================================================

const ScreenMainComponent = ({ navigation }) => {

    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    const screenSettings = useMemo(() => createNewObjectFromExistingOne(ScrennSettings), [],);

    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: theme.mainBackgroundColor, }}>

            <ScreenDataComponent
                screenSettings={screenSettings}
                navigation={navigation}
                api={api}
            />

            <KeyboardBottom
                // useOnAndroid
                animate={false}
            />

        </View>
    );
};

const styles = StyleSheet.create({
});

export default memo(ScreenMainComponent);
