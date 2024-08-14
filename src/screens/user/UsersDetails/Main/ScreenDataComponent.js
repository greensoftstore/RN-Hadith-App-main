// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useRef, memo, useEffect, useCallback, } from 'react';
import {
    View,
    ScrollView,
    Text,
    Dimensions
} from 'react-native';
import RenderHTML, { defaultSystemFonts } from 'react-native-render-html'
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Components
// ===================================================================
import { Header, MainBackgroundWidthShadow } from 'components'
// ===================================================================
import { GlobalStyle, ConstNumbers } from 'constantsConfiguration'

function ScreenDataComponent({ navigation, screenSettings, selectedItem }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    let userName = selectedItem?.name || ''
    let userDescriptionSmall = selectedItem?.shortDescription || ''
    let userDescription = selectedItem?.narrator || ''

    const systemFonts = [...defaultSystemFonts, 'SFProDisplay-Regular']

    const tagsStyles = {
        body: {
            color: theme.usersTitleColor,
            fontSize: 16,
            lineHeight: 24,
            fontFamily: 'SFProDisplay-Regular',
            padding: 0,
            marginBottom: 10,
            marginTop: 0
        },
        h6: {
            color: theme.usersTitleColors,
            fontWeight: 300,
            lineHeight: 21,
            fontSize: 13,  
            padding: 0,
            margin: 0,     
            fontFamily: 'SFProDisplay-Regular'
        },
        p: {
            padding: 0,
            marginBottom: 10,
            marginTop: 10
        },
        a: {
            padding: 0,
            marginBottom: 10,
            marginTop: 0,
            color: theme.heighlightTextColor,
            // textDecorationLine: 'none'
        }
    };

    let lineSeparator = `<div style='width: 40%; height: 1px; background_color: ${theme.singleCollectionTopDeviderColor}; margin : 22px 0 7px 0' ></div><h6>`
    let localContent = userDescription.includes('<h6>') ? `${userDescription.split('<h6>')[0]}${lineSeparator}${userDescription.split('<h6>')[1]}` : userDescription
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
        <>
            <Header
                title={userName}
                navigation={navigation}
                displayBackButton={true}
            />
            <View style={{ width: '100%', flex: 1, padding: ConstNumbers.paddingHorizontalCard, paddingBottom: Platform.OS == 'ios' ? ConstNumbers.paddingHorizontalCard + 30 : ConstNumbers.paddingHorizontalCard }}>
                <MainBackgroundWidthShadow borderRadius={ConstNumbers.borderRadiusThird} >

                    <View style={{ width: '100%', height: '100%', paddingVertical: ConstNumbers.paddingHorizontalMain, borderRadius: ConstNumbers.borderRadiusMain, overflow: 'hidden', backgroundColor: theme.singleCollectionBackgroundColor, /* borderWidth: 1, borderColor: theme.singleCollectionBackgroundBorderColor */ }} >
                        <ScrollView
                            style={{ flex: 1 }}
                            contentContainerStyle={{ paddingHorizontal: ConstNumbers.paddingHorizontalMain, }}
                        >
                            {/* <Text style={[GlobalStyle.textFontRegular, { fontSize: 16, color: theme.usersTitleColor, }]}>{userDescription}</Text> */}

                            <RenderHTML
                                systemFonts={systemFonts}
                                contentWidth={Dimensions.get('screen').width - (ConstNumbers.paddingHorizontalMain * 2)}
                                source={{ html: localContent }}
                                tagsStyles={tagsStyles}
                            />
                        </ScrollView>
                    </View>
                </MainBackgroundWidthShadow>
            </View>
        </>
    );
};

export default memo(ScreenDataComponent);
