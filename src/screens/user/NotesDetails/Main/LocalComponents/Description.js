// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import RenderHTML, { defaultSystemFonts } from 'react-native-render-html'
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { selectActiveFont, selectFontSize } from 'reduxConfiguration/slices/fontSlice';
// ===================================================================
import { GlobalStyle, ConstNumbers, Images } from 'constantsConfiguration'
// =================================================================== 
import { moduleNames } from "constantsConfiguration/enums/modules";

const Description = ({ navigation, text = '', }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode);

    const activeFont = useSelector(selectActiveFont)
    const fontSize = useSelector(selectFontSize)
    // ===================================================================

    const systemFonts = [...defaultSystemFonts, 'SFProDisplay-Regular']

    const tagsStyles = {
        body: {
            color: theme.singleHadithDescriptionColor,
            lineHeight: 24,
            fontSize: 16,
            fontFamily: 'SFProDisplay-Regular'
        },
        h6: {
            color: theme.singleHadithDescriptionColor,
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
            marginTop: 0
        },
        sup: {
            fontSize: 9,
            textDecorationLine: 'underline'
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
    let localContent = text.includes('<h6>') ? `${text.split('<h6>')[0]}${lineSeparator}${text.split('<h6>')[1]}` : text
    // ===================================================================
    //  Render
    // -------------------------------------------------------------------

    return (
        <ScrollView
            style={{ width: '100%', flex: 1 }}
            contentContainerStyle={{ padding: ConstNumbers.paddingHorizontalCard, paddingTop: 0, marginTop: 9 }}
        >
            {/* <Text style={[
                GlobalStyle.textFontRegular,
                {
                    fontSize: 15, color: theme.singleHadithDescriptionColor,
                }]}>
                {text}
            </Text> */}

            <RenderHTML
                systemFonts={systemFonts}
                contentWidth={Dimensions.get('screen').width - (ConstNumbers.paddingHorizontalMain * 2)}
                source={{ html: localContent }}
                tagsStyles={tagsStyles}
            />
        </ScrollView>
    );
};

export default memo(Description);
