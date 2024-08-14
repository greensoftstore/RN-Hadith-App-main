// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import DeviceInfo from 'react-native-device-info'
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { selectUserPhoto, selectUser } from 'reduxConfiguration/slices/authSlice';
// ===================================================================
import { GlobalStyle } from 'constantsConfiguration'
// =================================================================== 
import { config } from 'constantsConfiguration/config'
import { FastImageWithBackgroundImage, SpinnerCustom, CustomIcon } from 'components'

const TopComponent = ({ onPressImage, loadingImage }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode);
    const userPhoto = useSelector(selectUserPhoto);
    const user = useSelector(selectUser);
    // ===================================================================
    // ===================================================================
    //  Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', padding: 10, justifyContent: 'center', alignItems: 'center', }} >
            <TouchableOpacity disabled={loadingImage} onPress={() => onPressImage(true)} style={{ width: 150, height: 150, overflow: 'hidden', borderRadius: 1000, borderColor: theme.profilImageBorderColor, borderWidth: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.headerBackgroundColor }} >
                {userPhoto && !loadingImage && <FastImageWithBackgroundImage url={userPhoto} />}
                {loadingImage &&
                    <View style={{ transform: [{ translateX: Platform.OS == 'ios' ? -4 : 0 }, { translateY: Platform.OS == 'ios' ? -4 : 0 }] }} >
                        <SpinnerCustom size={35} color={theme.mainColor2} type={'FadingCircleAlt'} />
                    </View>
                }
                {!userPhoto && !loadingImage &&
                    <View style={{ width: '100%', height: '100%', backgroundColor: theme.profileImageBackgroundColor, justifyContent: 'center', alignItems: 'center' }} >
                        <CustomIcon type={'Ionicons'} name={'person'} color={theme.profileImageIconColor} style={{ fontSize: 65 }} />
                    </View>
                }
            </TouchableOpacity>

            <View style={{ width: '100%', marginTop: 20, marginBottom: 30, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 }} >
                <Text style={[GlobalStyle.textFontRegular, { fontSize: 24, color: theme.profileNameColor, textAlign: 'center' }]}>{user?.displayName || ''}</Text>
                <Text style={[GlobalStyle.textFontRegular, { fontSize: 12, color: theme.profileMailColor, textAlign: 'center' }]}>{user?.email || ''}</Text>
            </View>
        </View>
    );
};

export default memo(TopComponent);
