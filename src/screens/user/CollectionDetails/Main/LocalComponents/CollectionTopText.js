// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { View, Text, } from 'react-native';
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

const CollectionTopText = ({ t, text = '' }) => {
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
            lineHeight: 24,
            letterSpacing: -0.25,
            fontFamily: 'SFProDisplay-Regular'
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
        a: {
            color: theme.heighlightTextColor,
            // textDecorationLine: 'none'
        }
    };

    return (
        <View style={{ width: '100%', flex: 1, padding: ConstNumbers.paddingHorizontalMain / 2, }} >
            {/* <Text style={[GlobalStyle.textFontRegular, { fontSize: 14, color: theme.singleCollectionDescriptionColor, }]}>{text}</Text> */}
            <RenderHTML
                systemFonts={systemFonts}
                contentWidth={Dimensions.get('screen').width - (ConstNumbers.paddingHorizontalMain )}
                source={{ html: text }}
                tagsStyles={tagsStyles}
            />
        </View>
    );
};

export default Localization('Collection', memo(CollectionTopText));
