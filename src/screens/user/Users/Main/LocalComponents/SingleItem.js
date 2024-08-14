// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback } from 'react';
import { View, Pressable, Text, Image } from 'react-native';
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

const SingleItem = ({ t, navigation, item, displaySkeletonLoader }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode);
    // ===================================================================

    let userName = item?.name || ''
    let userDescriptionSmall = item?.shortDescription || ''

    const onPress = useCallback(
        () => {
            navigation.navigate(moduleNames.USERSDETAILS, item)
        },
        [],
    )

    // ===================================================================
    //  Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', height: 60, }} >
            <Pressable
                disabled={displaySkeletonLoader}
                android_ripple={{ color: theme.buttonPressableColor1, }}
                style={({ pressed }) => [{ backgroundColor: pressed && Platform.OS === 'ios' ? theme.buttonPressableColor1 : 'transparent', width: '100%', justifyContent: 'center', alignItems: 'center' }]}
                onPress={onPress}

            >
                <View style={{ width: '100%', height: '100%', overflow: 'hidden', alignItems: 'center', flexDirection: 'row', padding: ConstNumbers.paddingHorizontalCard, paddingVertical: item.skeletonLoaderItem ? ConstNumbers.paddingHorizontalMain : 0, borderBottomWidth: /* !displaySkeletonLoader &&  */item?.skeletonLoaderItem ? 0 : 0.5, borderColor: theme.itemBorderBottomSeparatorColor }}>
                    <SkeletonLoader
                        displaySkeletonLoader={displaySkeletonLoader}
                        customStyleMainContainer={{ width: '100%', height: '100%', }}
                        skeletonLoaderItem={item?.skeletonLoaderItem}
                    >
                        <View style={{ width: '100%', height: '100%', overflow: 'hidden', alignItems: 'center', flexDirection: 'row', }}>
                            <View style={{ flex: 1, }}>
                                <Text style={[GlobalStyle.textFontRegular, { fontSize: 16, color: theme.usersTitleColor, }]} numberOfLines={1}>{userName}</Text>
                                <Text style={[GlobalStyle.textFontRegular, { fontSize: 12, color: theme.usersSubTitleColor, }]} numberOfLines={1}>{userDescriptionSmall}</Text>
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
};

export default Localization('Settings', memo(SingleItem));
