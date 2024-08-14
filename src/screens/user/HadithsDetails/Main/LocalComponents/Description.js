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
    const systemFonts = [...defaultSystemFonts, 'SFProDisplay-Regular', 'Bookerly-Regular', 'Georgia-Regular']

    const tagsStyles = {
        body: {
            color: theme.singleHadithDescriptionColor,
            lineHeight: 24,
            fontSize: 16 + fontSize,
            fontFamily: activeFont === 'Bookerly' ? 'Bookerly-Regular' : activeFont === 'Georgia' ? 'Georgia-Regular' : 'SFProDisplay-Regular',
        },
        h6: {
            color: theme.singleHadithDescriptionColor,
            fontWeight: 300,
            lineHeight: 21,
            fontSize: 13 + fontSize,
            padding: 0,
            margin: 0,
            fontFamily: activeFont === 'Bookerly' ? 'Bookerly-Regular' : activeFont === 'Georgia' ? 'Georgia-Regular' : 'SFProDisplay-Regular'
        },
        p: {
            padding: 0,
            marginBottom: 10,
            marginTop: 0,
        },
        sup: {
            fontSize: 9 + fontSize,
            textDecorationLine: 'underline'
        },
        a: {
            padding: 0,
            marginBottom: 0,
            marginTop: 15,
            color: theme.heighlightTextColor,
            // textDecorationLine: 'none'
        },
    };

    const renderersProps = {
        a: {
            onPress(event, url, htmlAttribs, target) {
                // console.log('htmlAttribs ', htmlAttribs)

                if (htmlAttribs?.publisher_id) {/*  console.log('usao') */ }
            }
        }
    }

    let test = `<a href="link" publisher_id="1">A Link To Press</a><p>Aiša, radijallahu anha, majka pravovjernih, kazuje: “Haris b. Hišam upitao je Allahovog Poslanika, sallallahu alejhi ve sellem: ‘Allahov Poslaniče, kako tebi dolazi objava?’, a Allahov Poslanik, sallallahu alejhi ve sellem, odgovorio je: ‘Ponekad mi dolazi poput zvonjenja zvona, i to mi je najteži način objave. Kada prestane, ja potpuno zapamtim ono što mi je kazano. Nekad mi se melek pojavi u liku čovjeka, pa mi govori, a ja zapamtim ono što mi kaže.’ Jednog veoma hladnog dana vidjela sam ga u trenutku dok mu je stizala objava, i kada je prestala, čelo mu, uistinu, još kiptaše znojem.”<sup>2</sup></p><h6>(2)  Hadis je citiran i pod brojem 3215.</h6>`

    let lineSeparator = `<div style='width: 40%; height: 1px; background_color: ${theme.singleCollectionTopDeviderColor}; margin : 22px 0 7px 0' ></div><h6>`
    let localContent = text.includes('<h6>') ? `${text.split('<h6>')[0]}${lineSeparator}${text.split('<h6>')[1]}` : text
    // ===================================================================
    //  Render
    // -------------------------------------------------------------------
    return (
        <ScrollView
            style={{ width: '100%', flex: 1, }}
            contentContainerStyle={{ padding: ConstNumbers.paddingHorizontalCard, paddingTop: 0, marginTop: 9 }}
        >
            <RenderHTML
                systemFonts={systemFonts}
                contentWidth={Dimensions.get('screen').width - (ConstNumbers.paddingHorizontalMain * 2)}
                source={{ html: localContent }}
                tagsStyles={tagsStyles}
                renderersProps={renderersProps}
            />
        </ScrollView>
    );
};

export default memo(Description);
