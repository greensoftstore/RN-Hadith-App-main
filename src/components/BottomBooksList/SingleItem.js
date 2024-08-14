// =================================================================== 
// Libraries
// ===================================================================
import React, { useRef, memo, useState, useCallback, useMemo, useEffect } from 'react';
import {
    View,
    Text,
    Platform,
    Pressable,
    Image
} from 'react-native';

import Animated, { FadeIn, FadeOut, BounceIn, BounceOut } from 'react-native-reanimated';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
// ===================================================================
import { ConstNumbers, GlobalStyle, Images } from 'constantsConfiguration';
// ===================================================================
import { CustomIcon } from 'components'

const SingleItem = ({ item, index, toggleActive }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatch = useDispatch()
    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)
    // ===================================================================

    const [activeLocal, setActiveLocal] = useState(item?.active)

    return (
        <View style={{ width: '100%', height: 70, overflow: 'hidden', borderBottomWidth: 0.5, borderColor: theme.itemBorderBottomSeparatorColor }} >
            <Pressable
                android_ripple={{ color: theme.buttonPressableColor1, }}
                style={({ pressed }) => [{ backgroundColor: pressed && Platform.OS === 'ios' ? theme.buttonPressableColor1 : 'transparent', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }]}
                onPress={() => {
                    let newVal = !activeLocal
                    setActiveLocal(newVal)
                    toggleActive(index, newVal)
                }}

            >
                <View style={{ width: '100%', height: '100%', overflow: 'hidden', alignItems: 'center', flexDirection: 'row', padding: ConstNumbers.paddingHorizontalMain, paddingVertical: ConstNumbers.paddingHorizontalMain / 2 }}>
                    <View style={{ flex: 1, height: '100%', overflow: 'hidden', flexDirection: 'row', alignItems: 'center', /* paddingHorizontal: ConstNumbers.paddingHorizontalMain */ }}>

                        <View style={{ width: 40, height: 40, borderRadius: 100, backgroundColor: theme.profileButtonIconBackgroundColor, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                            <Image source={themeVal === 'light' ? Images.BookFilterLight : Images.BookFilter} style={{ width: 22, height: 22, resizeMode: 'contain', tintColor: theme.categoryIconColor }} />
                        </View>
                        <View style={{ height: '100%', flex: 1, justifyContent: 'center', alignItems: 'flex-start', }}>
                            <Text style={[GlobalStyle.textFontRegular, { fontSize: 16, lineHeight: 24, color: theme.categoryTitleColor, }]} numberOfLines={1}>{item?.bookTitle || ''}</Text>
                        </View>


                        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'flex-start', }}>
                            {/* {activeLocal && */}
                            <Animated.View /* entering={BounceIn.duration(400)} exiting={BounceOut.duration(400)} */ style={{ justifyContent: 'center', alignItems: 'center' }} >
                                {/* <CustomIcon type={'Feather'} name={'check'} color={theme.textColorWhite} style={{ fontSize: 18 }} /> */}
                                <Image source={activeLocal ? themeVal === 'light' ? Images.CheckBoxLight : Images.CheckBoxDark : Images.CheckboxEmpty} style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: !activeLocal ? theme.checkBoxEmptyÇolor : null }} />
                            </Animated.View>
                            {/* } */}
                        </View>
                    </View>
                </View>
            </Pressable>
        </View>
    )
};

export default memo(SingleItem);
