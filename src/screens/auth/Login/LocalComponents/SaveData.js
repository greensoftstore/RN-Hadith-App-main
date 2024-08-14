// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import Animated, { BounceIn, BounceOut, FadeIn, FadeOut } from 'react-native-reanimated';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, } from 'reduxConfiguration/slices/themeSlice';
import { selectSavedDataLocaly } from "reduxConfiguration/slices/authSlice";
// =================================================================== 
// Constants
// ===================================================================
import { GlobalStyle, Images } from 'constantsConfiguration'
// =================================================================== 
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
import { CustomIcon } from 'components'

const SaveData = ({ t, saveData, setSaveData, touchIdLogin }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatchRedux = useDispatch()
    const theme = useSelector(selectThemeMode)
    const savedDataLocaly = useSelector(selectSavedDataLocaly)
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', paddingVertical: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
            <TouchableOpacity onPress={() => { setSaveData(!saveData) }} style={{ flexDirection: 'row', alignItems: 'center' }} >
                <View style={{ width: 26, height: 26, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.inactiveButtonColor, overflow: 'hidden', borderWidth: 1, borderColor: theme.mainButtonColor, marginRight: 10 }}>
                    {saveData &&
                        <Animated.View entering={FadeIn.duration(400)} exiting={FadeOut.duration(400)} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.mainButtonColor, }}>
                            <Animated.View entering={BounceIn.duration(400)} exiting={BounceOut.duration(400)} >
                                <CustomIcon type={'AntDesign'} name={'check'} color={theme.textColorWhite} style={{ fontSize: 18 }} />
                            </Animated.View>
                        </Animated.View>
                    }
                </View>
                <Text style={{ ...GlobalStyle.textFontRegular, color: theme.lightTextColor, fontSize: 16, marginTop: -2 }} numberOfLines={6}>{t('saveLoginDetails', 'Save login details')}</Text>
            </TouchableOpacity >

           {savedDataLocaly && <TouchableOpacity onPress={touchIdLogin} style={{ width: 50, height: 50, marginRight: 10, justifyContent: 'center', alignItems: 'center', }} >
                <CustomIcon type={'Ionicons'} name={'finger-print'} color={theme.lightTextColor} style={{ fontSize: 38 }} />
            </TouchableOpacity>}
        </View>
    )
};

export default Localization('Auth', memo(SaveData));
