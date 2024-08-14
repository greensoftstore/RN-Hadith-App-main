// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useRef, memo, useEffect, useCallback, } from 'react';
import {
    View,
    Text,
    Platform,
    Pressable,
    Image
} from 'react-native';
import Animated, { BounceIn, BounceOut } from 'react-native-reanimated';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Components
// ===================================================================
import { CustomIcon } from 'components'
// ===================================================================
import { ConstNumbers, Images, GlobalStyle } from 'constantsConfiguration';

const SettingsButtonCheckBox = ({ text, image, onPress, active, disabled = false }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    // ===================================================================
    // State
    // -------------------------------------------------------------------
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
        <View style={{ width: '100%', height: 60, overflow: 'hidden', }} >
            <Pressable
                disabled={disabled}
                android_ripple={{ color: theme.buttonPressableColor1, }}
                style={({ pressed }) => [{ backgroundColor: pressed && Platform.OS === 'ios' ? theme.buttonPressableColor1 : 'transparent', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }]}
                onPress={onPress}

            >
                <View style={{ width: '100%', height: '100%', overflow: 'hidden', flexDirection: 'row', alignItems: 'center', paddingHorizontal: ConstNumbers.paddingHorizontalMain }}>
                    {image &&
                        <View style={{ width: 40, height: 40, borderRadius: 100, backgroundColor: theme.settingsButtonIconBackgroundColor, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                            <Image source={image} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: theme.settingsButtonIconColor }} />
                        </View>
                    }
                    <View style={{ height: '100%', flex: 1, justifyContent: 'center', alignItems: 'flex-start', }}>
                        <Text style={[GlobalStyle.textFontRegular, { fontSize: 16, color: theme.settingsButtonTextColor, }]}>{text}</Text>
                    </View>
                    <View style={{ width: 30, height: 30, marginLeft: 10 }}>
                        {active &&
                            < Animated.View /* entering={BounceIn.duration(400)} exiting={BounceOut.duration(400)} */ style={{ width: 25, height: 25, borderRadius: 100, backgroundColor: theme.settingsButtonRightCheckBoxBackgroundColor, justifyContent: 'center', alignItems: 'center', }} >
                                <CustomIcon type={'Feather'} name={'check'} color={theme.settingsButtonRightCheckBoxIconColor} style={{ fontSize: 18 }} />
                            </Animated.View>
                        }
                    </View>
                </View>

            </Pressable >
        </View >
    );
};

export default memo(SettingsButtonCheckBox);
