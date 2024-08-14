// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useRef, memo, useEffect, useCallback, } from 'react';
import {
    View,
    ScrollView,
} from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { toggleThemeModeAndRemoveSystem, selectThemeMode, selectThemeValue, selectUseSystemTheme, toggleSystemTheme } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Components
// ===================================================================
import { SettingsButtonCheckBox, MainBackgroundWidthShadow } from 'components'
import Devider from './LocalComponents/Devider'
// ===================================================================
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
import { ConstNumbers } from 'constantsConfiguration';

function ScreenDataComponent({ t, navigation, screenSettings }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatch = useDispatch()
    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)
    const systemTheme = useSelector(selectUseSystemTheme)
    // ===================================================================

    // ===================================================================
    // State
    // -------------------------------------------------------------------
    const [test, setTest] = useState(1)
    // ===================================================================

    // ===================================================================
    // Ref
    // -------------------------------------------------------------------
    // ===================================================================

    // ===================================================================
    // Api
    // -------------------------------------------------------------------

    // ===================================================================

    // ===================================================================
    //  Methods
    // -------------------------------------------------------------------
    // ===================================================================

    // ===================================================================
    //  Animations
    // -------------------------------------------------------------------
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', flex: 1, paddingBottom: ConstNumbers.footerHeight }}>
            <ScrollView
                style={{ width: '100%', flex: 1 }}
                contentContainerStyle={{ padding: ConstNumbers.paddingHorizontalMain }}
            >

                <MainBackgroundWidthShadow>

                    <View style={{ width: '100%', backgroundColor: theme.secondaryBackgroundColor, borderRadius: ConstNumbers.borderRadiusMain, overflow: 'hidden', }} >
                        <SettingsButtonCheckBox
                            disabled={(themeVal === 'dark' && !systemTheme) ? true : false}
                            text={t('on', 'On')}
                            image={null}
                            onPress={() => { dispatch(toggleThemeModeAndRemoveSystem('dark')) }}
                            active={(themeVal === 'dark' && !systemTheme) ? true : false}
                        />

                        <Devider />

                        <SettingsButtonCheckBox
                            disabled={(themeVal === 'light' && !systemTheme) ? true : false}
                            text={t('off', 'Off')}
                            image={null}
                            onPress={() => { dispatch(toggleThemeModeAndRemoveSystem('light')) }}
                            active={(themeVal === 'light' && !systemTheme) ? true : false}
                        />

                        <Devider />

                        <SettingsButtonCheckBox
                            disabled={systemTheme ? true : false}
                            text={t('defaultByMobilePhoneSystem', 'Default by mobile phone system')}
                            image={null}
                            onPress={() => { dispatch(toggleSystemTheme(true)) }}
                            active={systemTheme ? true : false}
                        />
                    </View>
                </MainBackgroundWidthShadow>

            </ScrollView>
        </View>
    );
};

export default Localization('Settings', memo(ScreenDataComponent));