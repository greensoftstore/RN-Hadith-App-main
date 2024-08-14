// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
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
import { SkeletonLoader } from 'components'
// ===================================================================

const SingleCollection = ({ t, navigation, item, selectedItem, displaySkeletonLoader }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode);
    // ===================================================================

    let subCategoryTitle = item?.subCategoryTitle || ''

    const onPress = useCallback(
        (item) => {
            navigation.navigate(moduleNames.HADITHS, { ...selectedItem, subCategory: item })
        },
        [],
    )

    // ===================================================================
    //  Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', minHeight: 50, overflow: 'hidden', }} >
            <Pressable
                disabled={displaySkeletonLoader}
                android_ripple={{ color: theme.buttonPressableColor1, }}
                style={({ pressed }) => [{ backgroundColor: pressed && Platform.OS === 'ios' ? theme.buttonPressableColor1 : 'transparent', width: '100%', /* height: '100%', */ justifyContent: 'center', alignItems: 'center', flex: 1, }]}
                onPress={() => { onPress(item) }}

            >
                <View style={{ width: '100%', flex: 1, /* height: 50, */ /* height: '100%', */ overflow: 'hidden', alignItems: 'center', flexDirection: 'row', padding: 12, paddingLeft: item.skeletonLoaderItem ? 10 : 4, paddingVertical: item.skeletonLoaderItem ? 10 : 9, borderBottomWidth: /* !displaySkeletonLoader && */ item?.skeletonLoaderItem ? 0 : 0.5, borderColor: theme.itemBorderBottomSeparatorColor }}>
                    <SkeletonLoader
                        displaySkeletonLoader={displaySkeletonLoader}
                        customStyleMainContainer={{ width: '100%', height: '100%', }}
                        skeletonLoaderItem={item?.skeletonLoaderItem}
                    >
                        <View style={{ width: '100%', flex: 1, /* height: '100%', */ overflow: 'hidden', alignItems: 'center', flexDirection: 'row', }}>
                            <View style={{ flex: 1, /* height: '100%', */ overflow: 'hidden', flexDirection: 'row', alignItems: 'center', /* paddingHorizontal: ConstNumbers.paddingHorizontalMain */ }}>

                                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 4 }}>
                                    <Image source={Images.Subcategory} style={{ width: 32, height: 32, resizeMode: 'contain', tintColor: theme.categoryIconColor }} />
                                </View>
                                <View style={{ /* height: '100%', */ flex: 1, justifyContent: 'center', alignItems: 'flex-start', }}>
                                    <Text style={[GlobalStyle.textFontRegular, { fontSize: 16, lineHeight: 20, color: theme.categoryTitleColor, }]} numberOfLines={2}>{subCategoryTitle}</Text>
                                </View>
                            </View>

                            <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 6 }} >
                                <Image source={Images.Right} style={{ width: 7, height: 18, marginRight: 4, resizeMode: 'contain', tintColor: theme.usersRightIconColor }} />
                            </View>
                        </View>
                    </SkeletonLoader>
                </View>
            </Pressable>
        </View>
    );

    /* return (
        <View style={{ width: '100%', height: 50, overflow: 'hidden', }} >
            <Pressable
                disabled={displaySkeletonLoader}
                android_ripple={{ color: theme.buttonPressableColor1, }}
                style={({ pressed }) => [{ backgroundColor: pressed && Platform.OS === 'ios' ? theme.buttonPressableColor1 : 'transparent', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }]}
                onPress={() => { onPress(item) }}

            >
                <View style={{ width: '100%', height: '100%', overflow: 'hidden', alignItems: 'center', flexDirection: 'row', padding: 12, paddingLeft: item.skeletonLoaderItem ? 10 : 4, paddingVertical: item.skeletonLoaderItem ? 10 : 0, borderBottomWidth: 0.5, borderColor: theme.itemBorderBottomSeparatorColor }}>
                    <SkeletonLoader
                        displaySkeletonLoader={displaySkeletonLoader}
                        customStyleMainContainer={{ width: '100%', height: '100%', }}
                        skeletonLoaderItem={item?.skeletonLoaderItem}
                    >
                        <View style={{ width: '100%', height: '100%', overflow: 'hidden', alignItems: 'center', flexDirection: 'row', }}>
                            <View style={{ flex: 1, height: '100%', overflow: 'hidden', flexDirection: 'row', alignItems: 'center',  }}>

                                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 4 }}>
                                    <Image source={Images.Subcategory} style={{ width: 32, height: 32, resizeMode: 'contain', tintColor: theme.categoryIconColor }} />
                                </View>
                                <View style={{ height: '100%', flex: 1, justifyContent: 'center', alignItems: 'flex-start', }}>
                                    <Text style={[GlobalStyle.textFontRegular, { fontSize: 16, lineHeight: 19, color: theme.categoryTitleColor, }]} numberOfLines={1}>{subCategoryTitle}</Text>
                                </View>
                            </View>

                            <View style={{ justifyContent: 'center', alignItems: 'center', }} >
                               <Image source={Images.Right} style={{ width: 7, height: 18, marginRight: 4, resizeMode: 'contain', tintColor: theme.usersRightIconColor }} />
                            </View>
                        </View>
                    </SkeletonLoader>
                </View>
            </Pressable>
        </View>
    ); */
};

export default Localization('Collection', memo(SingleCollection));
