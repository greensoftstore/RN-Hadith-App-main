// =================================================================== 
// Libraries
// ===================================================================
import React, { useMemo, memo, useEffect, useState } from 'react';
import { StyleSheet, View, } from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Components
// ===================================================================
// =================================================================== 
// Local Components
// ===================================================================
import ScreenDataComponent from './ScreenDataComponent';
// ===================================================================
// Local Settings
// ===================================================================
import { UserScreenSettings } from './ScreenSettings';
// ===================================================================
// Utilities
// ===================================================================
import { createNewObjectFromExistingOne } from 'utilities/common'
// ===================================================================

function ScreenMainComponent({ navigation }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)
    // ===================================================================

    // ===================================================================
    // State
    // -------------------------------------------------------------------
    const [initialLoad, setInitialLoad] = useState(true)
    // -------------------------------------------------------------------

    useEffect(() => {
        setTimeout(() => {
            setInitialLoad(false)
        }, 200)
    }, [])

    // ===================================================================
    // Variables
    // -------------------------------------------------------------------
    // const screenSettings = useMemo(() => (createNewObjectFromExistingOne(UserScreenSettings)), []);
    // ===================================================================

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: theme.mainBackgroundColor }}>

            {!initialLoad &&
                <ScreenDataComponent
                    navigation={navigation}
                    toggleListCardEditTemplate={() => { toggleListCardEditTemplate(true) }}
                />
            }

        </View>
    );
};

const styles = StyleSheet.create({
});

export default memo(ScreenMainComponent);
