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
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Components
// ===================================================================
// ===================================================================
import { ConstNumbers, Images, GlobalStyle } from 'constantsConfiguration';
// ===================================================================
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 

const SearchButton = ({ t, text, image, onPress }) => {
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
        <View style={{ width: '100%', height: 50, borderRadius: ConstNumbers.borderRadiusThird, overflow: 'hidden', backgroundColor: theme.searchButtonBackgroundColor, borderWidth: 0.3, borderColor: theme.singleCollectionBackgroundBorderColor }} >
            <Pressable
                android_ripple={{ color: theme.buttonPressableColor1, }}
                style={({ pressed }) => [{ backgroundColor: pressed && Platform.OS === 'ios' ? theme.buttonPressableColor1 : 'transparent', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }]}
                onPress={onPress}

            >
                <View style={{ width: '100%', height: '100%', overflow: 'hidden', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 2 }}>
                    <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginRight: 0 }}>
                        <Image source={Images.Search} style={{ width: 40, height: 40, resizeMode: 'contain', tintColor: theme.searchButtonIconColor }} />
                    </View>
                    <View style={{ height: '100%', flex: 1, justifyContent: 'center', alignItems: 'flex-start', }}>
                        <Text style={[GlobalStyle.textFontRegular, { fontSize: 16, color: theme.searchButtonTextColor, }]}>{t('searchByCollections', 'Search by collections')}</Text>
                    </View>
                </View>

            </Pressable>
        </View>
    );
};

export default Localization('Search', memo(SearchButton));
