// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useState, useEffect } from 'react';
import { View, Pressable, Text, Platform, Image } from 'react-native';
import Animated, { BounceIn, SlideInUp, ZoomInEasyUp } from 'react-native-reanimated';
import { ShadowedView } from 'react-native-fast-shadow';
// =================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
import { selectRole } from 'reduxConfiguration/slices/authSlice';
// =================================================================== 
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
import { ConstNumbers, GlobalStyle } from 'constantsConfiguration'
import { CustomIcon } from 'components'
import links from 'constantsConfiguration/routes/BottomLinks'
import { moduleNames } from 'constantsConfiguration/enums/modules';


const BottomTabBar = ({ t, navigation, settings, delay, animate = false, absolute = true, customBottomStyle }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)
    const role = useSelector(selectRole)
    // ===================================================================

    let selectedLinks = links[role] ? links[role] : links['2']

    return (
        <Animated.View style={[{ position: absolute ? 'absolute' : 'relative', zIndex: 99, width: '100%', height: ConstNumbers.footerHeight, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.footerBackgroundColor, }, customBottomStyle]}>
            <ShadowedView style={[{ width: '100%', height: '100%', paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.footerBackgroundColor, }, themeVal === 'light' ? GlobalStyle.shadowReverse : {}]}>
                {selectedLinks && Object.keys(selectedLinks).map((selectedItem, index) => {
                    let item = selectedLinks[selectedItem]
                    return (
                        <Animated.View key={item.label} style={{ height: '100%', flex: 1, }}>
                            <Animated.View style={{ height: '100%', width: '100%', paddingBottom: Platform.OS === 'ios' ? 15 : 0, }}>
                                <Pressable
                                    android_ripple={{ color: theme.buttonPressableColor1, }}
                                    style={({ pressed }) => [{ backgroundColor: pressed && Platform.OS === 'ios' ? theme.buttonPressableColor1 : 'transparent', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }]}
                                    onPress={() => { navigation.navigate(item.label) }}

                                >
                                    <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingBottom: Platform.OS === 'ios' ? 5 : 5, }}>
                                        <View style={{ width: '100%', flex: 2, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 2 }}>
                                            {item?.image
                                                ? <Image source={settings?.label && settings.label === item.label ? item.image[themeVal].active : item.image[themeVal].inactive} style={{ width: 25, height: 25, resizeMode: 'contain' }} />
                                                : <CustomIcon type={item.icon.type} name={item.icon.name} color={settings?.label && settings.label === item.label ? theme.footerIconColorActive : theme.footerIconColorInactive} style={{ fontSize: item.icon.fontSize }} />
                                            }

                                        </View>
                                        <View style={{ width: '100%', flex: 1.2, justifyContent: 'flex-start', alignItems: 'center', }}>
                                            <Text style={[settings?.label && settings.label === item.label ? GlobalStyle.textFontMedium : GlobalStyle.textFontRegular, { fontSize: 10, color: settings?.label && settings.label === item.label ? theme.footerTitleActiveColor : theme.footerTitleInactiveColor, textAlign: 'center' }]}>{t(item.title, item.title)}</Text>
                                        </View>
                                    </View>

                                </Pressable>
                            </Animated.View>
                        </Animated.View>
                    )
                })}
            </ShadowedView >
        </Animated.View >
    )
}

export default Localization('ScreenTitles', memo(BottomTabBar));
