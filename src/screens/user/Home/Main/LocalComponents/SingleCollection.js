// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useEffect, useState, useCallback } from 'react';
import { View, Image, Text, TouchableOpacity, Pressable, Platform } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { selectUserID, selectAuthenticated } from 'reduxConfiguration/slices/authSlice';
// ===================================================================
import { GlobalStyle, ConstNumbers, Images } from 'constantsConfiguration'
// =================================================================== 
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// ===================================================================
// Components
// ===================================================================
import { SkeletonLoader, MainBackgroundWidthShadow } from 'components'
// ===================================================================
import Api from '../api'

const SingleCollection = ({ t, onPress, index, item, displaySkeletonLoader }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode);
    const userId = useSelector(selectUserID);
    const authenticated = useSelector(selectAuthenticated)
    // ===================================================================

    let image = item?.coverImg || null;
    let bookTitle = item?.bookTitle || '';
    let author = item?.author || '';
    let numberOfHadith = item?.numberOfHadith || 0;

    const [percent, setPercent] = useState('0%');

    useEffect(() => {
        if (!item.skeletonLoaderItem && authenticated) {
            calculatePercent()
        }
    }, [])

    const calculatePercent = useCallback(async () => {
        let res = await Api.getReadHadiths(userId, item.key)

        let numberOfHadithLocal = item?.numberOfHadith || 0;

        let percentLocal = res?.length ? res.length * 100 / numberOfHadithLocal : 0
        setPercent(`${percentLocal > parseInt(percentLocal) ? parseInt(percentLocal) + 1 : parseInt(percentLocal)}%`)
    }, [])

    // ===================================================================
    //  Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', /* borderRadius: ConstNumbers.borderRadiusMain, backgroundColor: theme.homeItemSingleBackgroundColorMain, */ marginBottom: ConstNumbers.paddingHorizontalMain }} >
            <MainBackgroundWidthShadow shadow={item?.skeletonLoaderItem ? false : true} shadowSecond >
                <View style={{ width: '100%', padding: ConstNumbers.paddingHorizontalCard / 2, }} >
                    {/* <TouchableOpacity disabled={displaySkeletonLoader} activeOpacity={0.8} onPress={() => { onPress({ ...item, progress: percent }) }} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', }} > */}

                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', borderRadius: ConstNumbers.borderRadiusMain, backgroundColor: theme.homeItemSingleBackgroundColorSecond, overflow: 'hidden' }} >
                        <Pressable
                            disabled={displaySkeletonLoader}
                            android_ripple={{ color: theme.buttonPressableColorHome, }}
                            style={({ pressed }) => [{ backgroundColor: pressed && Platform.OS === 'ios' ? theme.buttonPressableColorHome : 'transparent', width: '100%', flexDirection: 'row', alignItems: 'center', }]}
                            onPress={() => { onPress({ ...item, progress: percent }) }}

                        >
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', borderRadius: ConstNumbers.borderRadiusMain, padding: ConstNumbers.paddingHorizontalCard / 2 }} >

                                <View style={{ width: 92, height: 135, marginRight: ConstNumbers.paddingHorizontalMain }} >
                                    <SkeletonLoader
                                        displaySkeletonLoader={displaySkeletonLoader}
                                        skeletonLoaderItem={item?.skeletonLoaderItem}
                                    >
                                        {image && <Image source={{ uri: image }} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />}
                                    </SkeletonLoader>
                                </View>

                                <View style={{ flex: 1 }} >
                                    <SkeletonLoader
                                        displaySkeletonLoader={displaySkeletonLoader}
                                        skeletonLoaderItem={item?.skeletonLoaderItem}
                                    >
                                        <View style={{ flex: 1, justifyContent: 'center' }} >
                                            <Text style={[GlobalStyle.textFontBookerlyRegular, { fontSize: 20, lineHeight: 24, color: theme.homeItemSingleTextColor, }]} numberOfLines={2}>{bookTitle}</Text>
                                            <Text style={[GlobalStyle.textFontRegular, { fontSize: 12, lineHeight: 12, color: theme.homeItemSingleSubtitleTextColor, }]} numberOfLines={1}>{author}</Text>
                                            <Text style={[GlobalStyle.textFontRegular, { fontSize: 12, lineHeight: 12, color: theme.homeItemSingleSubtitleTextColor, marginVertical: 8 }]} numberOfLines={1}>{`${numberOfHadith} hadisa`}</Text>

                                            <View style={{ width: '100%', alignItems: 'flex-end' }} >
                                                <Text style={[GlobalStyle.textFontRegular, { fontSize: 12, lineHeight: 12, color: theme.homeItemSingleTextSecondColor, }]}>{`${percent} pročitano`}</Text>

                                                <View style={{ width: '100%', height: 6, overflow: 'hidden', marginTop: 4, borderRadius: 100, backgroundColor: theme.homeItemSingleLineColorMain }} >
                                                    <View style={{ width: percent, height: '100%', backgroundColor: theme.homeItemSingleLineColorSecond }} ></View>
                                                </View>
                                            </View>
                                        </View>
                                    </SkeletonLoader>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                    {/* </TouchableOpacity> */}
                </View>
            </MainBackgroundWidthShadow >
        </View >
    );
};

export default Localization('Settings', memo(SingleCollection));
