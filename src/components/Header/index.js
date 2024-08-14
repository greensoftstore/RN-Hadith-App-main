// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useState, useEffect, useCallback } from 'react';
import { View, Pressable, Text, Platform, Image, TouchableOpacity, } from 'react-native';
import { ShadowedView } from 'react-native-fast-shadow';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// =================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
import { selectUserPhoto } from 'reduxConfiguration/slices/authSlice';
// =================================================================== 
import { ConstNumbers, GlobalStyle, Images } from 'constantsConfiguration'
// =================================================================== 
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
import { moduleNames } from "constantsConfiguration/enums/modules";
import { FastImageWithBackgroundImage, CustomIcon } from 'components'

import HadithRightButtons from './HadithRightButtons'


const Header = ({
    t,
    navigation,
    displayProfileInfo = false,
    displayBackButton = false,
    displaySettingsButton = false,
    displaySearchButton = false,
    title = null,
    titlePosition = 'center',
    subtitle = null,
    customBackButton = null,
    displayHadithRightButtons = false,
    onPressFullScreen = null,
    onPressShare = null,
    onPressSettings = null,
    onPresSearchButtonCustom = null,
    displayAddFavourite = false,
    onPressAddFavourite,
    titleCustomStyle,
    headerHeightCustom = null
}) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)
    const userPhoto = useSelector(selectUserPhoto);
    // ===================================================================

    const handleBackButton = useCallback(() => {
        if (customBackButton) customBackButton
        else navigation.goBack()
    }, [])

    const navigateToScreen = useCallback((screen) => {
        navigation.navigate(screen)
    }, [])

    let offset = displayProfileInfo ? 4 : 0
    let headerHeight = headerHeightCustom ? headerHeightCustom : subtitle != null ? ConstNumbers.headerHeight : ConstNumbers.headerHeightSecond

    const insets = useSafeAreaInsets();
    const statusBarHeight = insets.top;

    let headerPaddingHeightFinal = ConstNumbers.headerPaddingHeight < statusBarHeight ? statusBarHeight : ConstNumbers.headerPaddingHeight

    return (
        <View style={{ width: '100%', height: Platform.OS === 'ios' ? headerHeight + headerPaddingHeightFinal : headerHeight, borderBottomWidth: 0.8, borderColor: 'rgba(0,0,0,0.06)' }} >
            <ShadowedView style={[{ width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.headerBackgroundColor, }, themeVal === 'light' ? GlobalStyle.shadowMain : {}]} >
                <View style={{ width: '100%', height: '100%', paddingTop: Platform.OS === 'ios' ? headerPaddingHeightFinal + offset : offset, }} >
                    <View style={{ width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }} >
                        {displayProfileInfo &&
                            <TouchableOpacity activeOpacity={0.9} onPress={() => { navigateToScreen(moduleNames.PROFILE) }} style={{ alignItems: 'center', marginLeft: ConstNumbers.paddingHorizontalCard, }} >
                                <View style={{ width: 40, height: 40, backgroundColor: theme.textInputBackground, justifyContent: 'center', alignItems: 'center', borderRadius: 100, overflow: 'hidden', borderWidth: userPhoto ? 2 : 1, borderColor: userPhoto ? theme.headerUserBorderColor : theme.headerUserBorderColor2 }}>
                                    <View style={{ width: '100%', height: '100%', overflow: 'hidden', backgroundColor: theme.headerBackgroundColor, justifyContent: 'center', alignItems: 'center' }} >
                                        {/* {userPhoto && <Image source={{ uri: userPhoto }} style={{ width: '100%', height: '100%', resizeMode: 'cover', }} />} */}
                                        {userPhoto ?
                                            <FastImageWithBackgroundImage url={userPhoto} />
                                            : <CustomIcon type={'Ionicons'} name={'person'} color={theme.profileImageIconColor} style={{ fontSize: 22 }} />
                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }

                        {displayBackButton &&
                            <TouchableOpacity onPress={() => { handleBackButton() }} style={{ position: 'absolute', zIndex: 1, left: 0, width: 42, height: 42, justifyContent: 'center', alignItems: 'center' }} >
                                <Image source={Images.Back} style={{ width: 40, height: 40, resizeMode: 'contain', tintColor: theme.headerIconButtonColor }} />
                            </TouchableOpacity>
                        }

                        {(title !== null || subtitle !== null) &&
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: titlePosition, paddingHorizontal: 42, paddingTop: subtitle !== null ? 3 : 0 }} >
                                {title !== null && < Text style={[{ ...GlobalStyle.textFontMedium, color: theme.headerTitleColor, fontSize: titlePosition == 'center' ? 18 : 16, lineHeight: titlePosition == 'center' ? 18 : 24, textAlign: 'center', marginTop: /* subtitle !== null || */ titlePosition != 'center' ? -1 : 0 }, titleCustomStyle]} >{t(title, title)}</Text>}
                                {subtitle !== null && < Text style={{ ...GlobalStyle.textFontMedium, color: theme.headerSubtitleColor, fontSize: 12, lineHeight: 16, textAlign: 'center', marginBottom: 3 }} >{t(subtitle, subtitle)}</Text>}
                            </View>
                        }

                        {displaySettingsButton &&
                            <TouchableOpacity onPress={() => { navigateToScreen(moduleNames.SETTINGS) }} style={{ position: 'absolute', zIndex: 1, right: 0, width: 60, height: 60, justifyContent: 'center', alignItems: 'center', }} >
                                <Image source={Images.Settings} style={{ width: 42, height: 42, resizeMode: 'contain', tintColor: theme.headerIconButtonColor }} />
                            </TouchableOpacity>
                        }

                        {displaySearchButton &&
                            <TouchableOpacity onPress={() => { if (onPresSearchButtonCustom) { onPresSearchButtonCustom(true) } else navigateToScreen(moduleNames.SEARCH) }} style={{ position: 'absolute', zIndex: 1, right: 0, width: 60, height: 60, justifyContent: 'center', alignItems: 'center' }} >
                                <Image source={Images.Search} style={{ width: 42, height: 42, resizeMode: 'contain', tintColor: theme.headerIconButtonColor }} />
                            </TouchableOpacity>
                        }

                        {displayAddFavourite &&
                            <TouchableOpacity onPress={() => { onPressAddFavourite(true) }} style={{ position: 'absolute', zIndex: 1, right: 0, width: 55, height: 60, justifyContent: 'center', alignItems: 'center' }} >
                                <Image source={Images.Plus} style={{ width: 24, height: 24, resizeMode: 'contain', tintColor: theme.headerIconButtonColor }} />
                            </TouchableOpacity>
                        }

                        {displayHadithRightButtons &&
                            <HadithRightButtons
                                onPressFullScreen={onPressFullScreen}
                                onPressShare={onPressShare}
                                onPressSettings={onPressSettings}
                            />
                        }
                    </View >
                </View >
            </ShadowedView >
        </View >
    )
}

export default Localization('ScreenTitles', memo(Header));
