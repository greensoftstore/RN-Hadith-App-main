// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useState } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import DeviceInfo from 'react-native-device-info'
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
// ===================================================================
import { GlobalStyle, ConstNumbers, Images } from 'constantsConfiguration'
// =================================================================== 
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
import CollectionTopImage from './CollectionTopImage'
import CollectionTopButtons from './CollectionTopButtons'
import CollectionTopText from './CollectionTopText'
import CollectionTopTextScroll from './CollectionTopTextScroll'

import { MainBackgroundWidthShadow } from 'components'

// let textTmp = `Pod svodom nebeskim, nakon Časnoga Kur’ana, ne postoji vjerodostojnija knjiga od Sahih El-Buhari-a poznata i kao El-Buharijeva zbirka hadisa. Autor je u njoj izabrao i izveo najvjerodostojnije hadise, jer je prilikom prihvatanja istih i ocjenjivanja prenosilaca imao posebne i stroge uslove koje nije imao niti jedan drugi imam, a što je sve na kraju kao rezultat došao „Sahih“. Ova knjiga ne sadrži u sebi samo hadis, nego i fikh, tefsir kao i druge islamske nauke. Rečeno je da onaj ko želi da upozna fikh Imama Buharije neka pročita njegov Sahih. Pod svodom nebeskim, nakon Časnoga Kur’ana, ne postoji vjerodostojnija knjiga od Sahih El-Buhari-a poznata i kao El-Buharijeva zbirka hadisa. Autor je u njoj izabrao i izveo najvjerodostojnije hadise, jer je prilikom prihvatanja istih i ocjenjivanja prenosilaca imao posebne i stroge uslove koje nije imao niti jedan drugi imam, a što je sve na kraju kao rezultat došao „Sahih“. Ova knjiga ne sadrži u sebi samo hadis, nego i fikh, tefsir kao i druge islamske nauke. Rečeno je da onaj ko želi da upozna fikh Imama Buharije neka pročita njegov Sahih. Pod svodom nebeskim, nakon Časnoga Kur’ana, ne postoji vjerodostojnija knjiga od Sahih El-Buhari-a poznata i kao El-Buharijeva zbirka hadisa. Autor je u njoj izabrao i izveo najvjerodostojnije hadise, jer je prilikom prihvatanja istih i ocjenjivanja prenosilaca imao posebne i stroge uslove koje nije imao niti jedan drugi imam, a što je sve na kraju kao rezultat došao „Sahih“. Ova knjiga ne sadrži u sebi samo hadis, nego i fikh, tefsir kao i druge islamske nauke. Rečeno je da onaj ko želi da upozna fikh Imama Buharije neka pročita njegov Sahih.`
// let textTmp2 = `sdf asdf as asdfasdfasfd asdf asdfa fQFW fsdf asdfasdfda gdsfg sdgsdf gsdg sdg sdg sdg sdg sdg sdg s  sgfsgfsdgsdgdfsgdsgPod svodom nebeskim, nakon Časnoga Kur’ana, ne postoji vjerodostojnija knjiga od Sahih El-Buhari-a poznata i kao El-Buharijeva zbirka hadisa. Autor je u njoj izabrao i izveo najvjerodostojnije hadise, jer je prilikom prihvatanja istih i ocjenjivanja prenosilaca imao posebne i stroge uslove koje nije imao niti jedan drugi imam, a što je sve na kraju kao rezultat došao „Sahih“. Ova knjiga ne sadrži u sebi samo hadis, nego i fikh, tefsir kao i druge islamske nauke. Rečeno je da onaj ko želi da upozna fikh Imama Buharije neka pročita njegov Sahih. `

const CollectionTop = ({ t, item }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode);
    // ===================================================================

    const [activeText, toggleActiveText] = useState(1)

    let text1 = item?.bookDescription || '';
    let text2 = item?.biography || '';
    let image = item?.coverImg || '';
    let progress = item?.progress || '0%'

    // console.log('text1 ',text1)


    // ===================================================================
    //  Render
    // -------------------------------------------------------------------

    return (
        <MainBackgroundWidthShadow >
            <View style={{ width: '100%', flex: 1, alignItems: 'center', overflow: 'hidden', borderRadius: ConstNumbers.borderRadiusMain, backgroundColor: theme.singleCollectionBackgroundColor, /* borderWidth: 1, borderColor: theme.singleCollectionBackgroundBorderColor, */ paddingVertical: ConstNumbers.paddingHorizontalCard, paddingBottom: 10 }} >

                {/* <ScrollView
                style={{ width: '100%' }}
                contentContainerStyle={{}}
                scrollEnabled={false}
            > */}
                <View style={{ paddingHorizontal: ConstNumbers.paddingHorizontalCard, width: '100%', alignItems: 'center', flex: 1 }} >
                    <CollectionTopImage
                        image={image}
                        progress={progress}
                    />

                    <CollectionTopButtons
                        activeText={activeText}
                        toggleActiveText={toggleActiveText}
                    />

                    {/* <CollectionTopText
                        text={activeText === 1 ? text1 : text2}
                    /> */}

                    <CollectionTopTextScroll
                        text={activeText === 1 ? text1 : text2}
                    />

                </View>
                {/* </ScrollView > */}
            </View >

            {/* <View style={{width: 10, height: 10, position: 'absolute', backgroundColor: 'red', bottom: 267, left: 100}} ></View> */}
        </MainBackgroundWidthShadow>
    );
};

export default Localization('Collection', memo(CollectionTop));
