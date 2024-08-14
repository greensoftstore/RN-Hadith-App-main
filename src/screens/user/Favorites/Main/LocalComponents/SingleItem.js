// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback } from 'react';
import { View, Pressable, Text, Image, Dimensions } from 'react-native';

import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
    PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    Extrapolate,
    interpolate,
    FadeIn,
    useDerivedValue
} from 'react-native-reanimated';
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { selectUserID } from 'reduxConfiguration/slices/authSlice';
// ===================================================================
import { GlobalStyle, ConstNumbers, Images } from 'constantsConfiguration'
// =================================================================== 
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
import { moduleNames } from "constantsConfiguration/enums/modules";
// =================================================================== 
// Components
// ===================================================================
import { SkeletonLoader, CustomIcon } from 'components'
// ===================================================================

import Api from '../api'

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const SingleItem = ({ t, navigation, item, displaySkeletonLoader }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode);
    const userId = useSelector(selectUserID);
    // ===================================================================
    const translateX = useSharedValue(0);
    const itemHeightAnimated = useSharedValue(60);
    const opacity = useSharedValue(1);

    const onDismiss = async (userIdA, key) => {
        const res = await Api.deleteFavourite(userIdA, key)

        if (res.error != null) {
            translateX.value = withTiming(0);
            itemHeightAnimated.value = withTiming(70);
        }
    }

    let favouriteTitle = item?.favouriteTitle || ''
    let numberOfHadiths = item?.numberOfHadiths || 0

    const onPress = useCallback(
        () => {
            navigation.push(moduleNames.FAVORITESSINGLECATEGORY, item)
        },
        [],
    )

    // ===================================================================
    // Animations
    // -------------------------------------------------------------------

    function callback(userId, key) {
        'worklet'
        runOnJS(onDismiss)(userId, key)
    }

    const panGesture = useAnimatedGestureHandler({
        onActive: (event) => {
            translateX.value = event.translationX > 0 ? 0 : event.translationX;
        },
        onEnd: () => {
            const shouldBeDismissedLeft = translateX.value < TRANSLATE_X_THRESHOLD;
            const shouldBeDismissedRight = translateX.value > TRANSLATE_X_THRESHOLD * -1;

            if (shouldBeDismissedLeft) {
                translateX.value = withTiming(-SCREEN_WIDTH + (ConstNumbers.paddingHorizontalMain * 2));
                itemHeightAnimated.value = withTiming(0);
                opacity.value = withTiming(0, undefined, (isFinished) => {
                    if (isFinished) {
                        callback(userId, item.key);
                    }
                });
            } else if (shouldBeDismissedRight) {
                translateX.value = withTiming(SCREEN_WIDTH - (ConstNumbers.paddingHorizontalMain * 2));
                itemHeightAnimated.value = withTiming(0);
                opacity.value = withTiming(0, undefined, (isFinished) => {
                    if (isFinished) {
                        callback(userId, item.key);
                    }
                });
            } else {
                translateX.value = withTiming(0);
            }
        },
    });

    const rStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
            },
        ],
    }));

    const itemHeight = useAnimatedStyle(() => ({
        height: itemHeightAnimated.value,
    }));

    const rIconContainerStyleRight = useAnimatedStyle(() => {
        const scale = interpolate(translateX.value, [SCREEN_WIDTH / -3, 0,], [1, 0], {
            extrapolateLeft: Extrapolate.CLAMP,
            extrapolateRight: Extrapolate.CLAMP,
        })

        const width = interpolate(translateX.value, [-SCREEN_WIDTH, 0,], [SCREEN_WIDTH, 0], {
            extrapolateLeft: Extrapolate.CLAMP,
            extrapolateRight: Extrapolate.CLAMP,
        })

        return {
            transform: [{ scale: scale }],
            width: width,
        };
    });
    const rIconContainerStyleRightImage = useAnimatedStyle(() => {
        const scale = interpolate(translateX.value, [SCREEN_WIDTH / -3, 0,], [1, 0], {
            extrapolateLeft: Extrapolate.CLAMP,
            extrapolateRight: Extrapolate.CLAMP,
        })

        // const width = interpolate(translateX.value, [-SCREEN_WIDTH, 0,], [SCREEN_WIDTH, 0], {
        //     extrapolateLeft: Extrapolate.CLAMP,
        //     extrapolateRight: Extrapolate.CLAMP,
        // })

        return {
            transform: [{ scale: scale }],
            // width: width,
        };
    });


    const rIconContainerStyleRightOpacity = useAnimatedStyle(() => {
        const opacity = interpolate(translateX.value, [-1, 0,], [1, 0], {
            extrapolateLeft: Extrapolate.CLAMP,
            extrapolateRight: Extrapolate.CLAMP,
        })

        return {
            opacity: opacity
        };
    });
    // ===================================================================

    // ===================================================================
    //  Render
    // -------------------------------------------------------------------

    return (
        <Animated.View style={[{ width: '100%', overflow: 'hidden', justifyContent: 'flex-end' }, itemHeight]} >
            <View style={{ width: '100%', height: 60, }} >
                <Animated.View style={[{ width: '100%', height: '100%', position: 'absolute', zIndex: -1, right: 0, top: 0, overflow: 'hidden', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: theme.deleteBackgroundColor }, rIconContainerStyleRightOpacity]}>
                    <Animated.View style={[{ height: '100%', paddingLeft: 20, justifyContent: 'center', alignItems: 'flex-start', }, rIconContainerStyleRight]}>
                        {/* <CustomIcon type={'AntDesign'} name={'delete'} color={theme.textColorWhite} style={{ fontSize: 30 }} /> */}
                        <Animated.Image source={Images.Trash} style={[{ width: 21, height: 24 }, rIconContainerStyleRightImage]} />
                    </Animated.View>
                </Animated.View>

                <PanGestureHandler
                    onGestureEvent={panGesture}
                    activeOffsetX={[-50, 50]}
                >
                    <Animated.View style={[{ width: '100%', height: '100%', backgroundColor: theme.singleCollectionBackgroundColor, borderBottomWidth: 0.6, borderColor: theme.itemBorderBottomSeparatorColor }, rStyle]} >
                        <Pressable
                            disabled={displaySkeletonLoader}
                            android_ripple={{ color: theme.buttonPressableColor1, }}
                            style={({ pressed }) => [{ backgroundColor: pressed && Platform.OS === 'ios' ? theme.buttonPressableColor1 : 'transparent', width: '100%', justifyContent: 'center', alignItems: 'center' }]}
                            onPress={onPress}

                        >
                            <View style={{ width: '100%', height: '100%', overflow: 'hidden', alignItems: 'center', flexDirection: 'row', padding: 10, paddingVertical: item.skeletonLoaderItem ? ConstNumbers.paddingHorizontalMain : 0 }}>
                                <SkeletonLoader
                                    displaySkeletonLoader={displaySkeletonLoader}
                                    customStyleMainContainer={{ width: '100%', height: '100%', }}
                                    skeletonLoaderItem={item?.skeletonLoaderItem}
                                >
                                    <View style={{ width: '100%', height: '100%', overflow: 'hidden', alignItems: 'center', flexDirection: 'row', }}>
                                        <View style={{ width: 40, height: 40, borderRadius: 100, backgroundColor: theme.profileButtonIconBackgroundColor, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                            <Image source={Images.Heart} style={[{ width: 25, height: 25, resizeMode: 'contain', tintColor: theme.profileButtonIconColor }]} />
                                        </View>
                                        <View style={{ height: '100%', flex: 1, justifyContent: 'center', alignItems: 'flex-start', }}>
                                            <Text style={[GlobalStyle.textFontRegular, { fontSize: 16, color: theme.usersTitleColor, }]}>{favouriteTitle}</Text>
                                        </View>

                                        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', paddingRight: 10 }}>
                                            <Text style={[GlobalStyle.textFontRegular, { fontSize: 16, color: theme.usersTitleColor, lineHeight: 18, letterSpacing: 0.5 }]}>{`(${numberOfHadiths})`}</Text>
                                        </View>
                                    </View>
                                </SkeletonLoader>
                            </View>
                        </Pressable>
                    </Animated.View>
                </PanGestureHandler>
            </View>
        </Animated.View>
    );
};

export default Localization('Settings', memo(SingleItem));
