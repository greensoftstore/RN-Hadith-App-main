// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { View, Dimensions, Text, ScrollView } from 'react-native';
import RenderHTML, { defaultSystemFonts } from 'react-native-render-html'
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

const CollectionTopTextScroll = ({ t, text = '' }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode);
    // ===================================================================

    // ===================================================================
    //  Render
    // -------------------------------------------------------------------

    const systemFonts = [...defaultSystemFonts, 'SFProDisplay-Regular']

    const tagsStyles = {
        body: {
            color: theme.singleCollectionDescriptionColor,
            fontSize: 14,
            fontFamily: 'SFProDisplay-Regular',
            lineHeight: 24,
            letterSpacing: -0.25,
        },
        h6: {
            color: theme.singleCollectionDescriptionColor,
            fontWeight: 300,
            fontSize: 13,
            lineHeight: 21,
            fontFamily: 'SFProDisplay-Regular',
            padding: 0,
            margin: 0,
        },
        p: {
            padding: 0,
            margin: 0,
        },
        sup: {
            fontSize: 9,
            textDecorationLine: 'underline'
        },
        a: {
            color: theme.heighlightTextColor,
            // textDecorationLine: 'none'
        }
    };
    
    let lineSeparator = `<div style='width: 40%; height: 1px; background_color: ${theme.singleCollectionTopDeviderColor}; margin : 12px 0 7px 0' ></div><h6>`
    let localContent = text.includes('<h6>') ? `${text.split('<h6>')[0]}${lineSeparator}${text.split('<h6>')[1]}` : text
    
    return (
        <View style={{ width: '100%', flex: 1, paddingTop: 10, }} >
            <ScrollView
                style={{ width: '100%', }}
                contentContainerStyle={{}}
            >
                <View style={{ width: '100%', paddingHorizontal: 5, }} >
                    {/* <Text style={[GlobalStyle.textFontRegular, { fontSize: 14, color: theme.singleCollectionDescriptionColor,  }]}>{text}</Text> */}
                    <RenderHTML
                        systemFonts={systemFonts}
                        contentWidth={Dimensions.get('screen').width - (ConstNumbers.paddingHorizontalCard)}
                        source={{ html: localContent }}
                        tagsStyles={tagsStyles}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default Localization('Collection', memo(CollectionTopTextScroll));
