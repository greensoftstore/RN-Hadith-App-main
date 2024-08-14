// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useRef, memo, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    Dimensions,
    Animated,
    Image,
    Platform
} from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, } from 'reduxConfiguration/slices/themeSlice';
import { selectAppIntro, toggleAppIntro } from 'reduxConfiguration/slices/settingsSlice';
// =================================================================== 
// Components
// ===================================================================
import { CustomIcon, GradientButton, GradientChackboxSingle } from 'components'
import { LogoSVG } from 'components/SVGImages'
// =================================================================== 
// Local Components
// ===================================================================
import Screen from './LocalComponents/Screen'
import RenderDots from './LocalComponents/RenderDots'
import BackgroundImages from './LocalComponents/BackgroundImages'
import Skip from './LocalComponents/Skip'
// =================================================================== 
// Constants
// ===================================================================
import { GlobalStyle, Images } from 'constantsConfiguration'
// ===================================================================
import { moduleNames } from "constantsConfiguration/enums/modules";
import { ConstNumbers } from 'constantsConfiguration'
// =================================================================== 
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 

// =================================================================== 
// AnimatedElements
// ===================================================================
// =================================================================== 
// Data
// ===================================================================
const introData = [
    {
        title: 'titleintro1',
        title_en: 'Napredni pretraživač',
        description: 'descriptionintro1',
        description_en: 'Aplikacija nudi mogućnost lakog pretraživanja po pojmu ili broju hadisa, stim da imate mogućnost korištenja filtera i na taj način možete odabrati samo određene hadiske zbirke za pretragu.',
        background: Images.IntroImage1,
    },
    {
        title: 'titleintro2',
        title_en: 'Favoriti +',
        description: 'descriptionintro2',
        description_en: 'Svaki hadis možete dodati u favorite i da pri tome kreirate posebnu kategoriju. Ovo će  olakšati tematsku podijelu pa tako ćete na primjer moći imati kategoriju “Vrijednost posta” a u drugoj kategoriji “O abdestu”.',
        background: Images.IntroImage2,
    },
    {
        title: 'titleintro3',
        title_en: 'Bilješke',
        description: 'descriptionintro3',
        description_en: 'Omogućili smo naprednu funkciju pisanja bilješki na hadis. Nakon što se registrirate i logirate u mobilnu ili web aplikaciju imat ćete mogućnost pisanja bilješki te sve će biti pohranjene na vaš korisnički račun.',
        background: Images.IntroImage3,
    },
    {
        title: 'titleintro4',
        title_en: 'Swipe',
        description: 'descriptionintro4',
        description_en: 'Prateći trendove korisničkog sučelja interakciju brisanja hadisa iz bilješki i favorita smo omogućili popularnim “swipeom”.',
        background: Images.IntroImage4,
    },
    {
        title: 'titleintro5',
        title_en: 'Upravljanje izgledom',
        description: 'descriptionintro5',
        description_en: 'Aplikacija pruža mogućnost korištenja tamnog moda, odabira fontova koji su kreirani samo za čitanje knjiga te povećavanje veličine teksta hadisa.',
        background: Images.IntroImage5,
    },
]

// ===================================================================


function ScreenDataComponent({ t, navigation, }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatchRedux = useDispatch()
    const theme = useSelector(selectThemeMode)
    const appIntroActive = useSelector(selectAppIntro)
    // ===================================================================

    const xOffset = new Animated.Value(0);
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('window').height;
    const scrollViewRef = useRef(null);

    let fullSize = screenWidth * introData.length;;
    let paddingTop = Platform.OS === 'ios' ? 50 : 20;
    let bottomHeight = 60;

    const [activeScreen, setActiveScreen] = useState(0)
    let canmomentum = useRef(false).current

    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', height: '100%', }}>

            <View style={{ width: '100%', height: '65%', top: 0, justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: -1, }}>
                <BackgroundImages introData={introData} xOffset={xOffset} screenWidth={screenWidth} />
                {/* <FrontImages introData={introData} xOffset={xOffset} screenWidth={screenWidth} activeScreen={activeScreen} /> */}
            </View>

            <Animated.ScrollView
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: xOffset } } }],
                    { useNativeDriver: false }
                )}
                onScrollBeginDrag={(e) => {
                    canmomentum = true

                }}
                onMomentumScrollEnd={(e) => {
                    if (fullSize !== e.nativeEvent.contentSize.width) fullSize = e.nativeEvent.contentSize.width;

                    if (canmomentum) {
                        canmomentum = false

                        let nexIndex = Math.round(((e.nativeEvent.contentOffset.x * 100 / fullSize) * introData.length) / 100)
                        setActiveScreen(nexIndex)
                    }

                }}
                horizontal
                pagingEnabled
                style={{ flex: 1 }}
                ref={scrollViewRef}
            >
                {introData.map((data, index) => {
                    return (
                        <Screen
                            key={index + 'item'}
                            introData={introData}
                            data={data}
                            index={index}
                            navigation={navigation}
                            xOffset={xOffset}
                            screenWidth={screenWidth}
                            screenHeight={screenHeight}
                            scrollViewRef={scrollViewRef}
                            paddingTop={paddingTop}
                            bottomHeight={bottomHeight}
                            dataHeight={'35%'}
                            setActiveScreen={setActiveScreen}
                        />
                    )
                })
                }
            </Animated.ScrollView>

            <RenderDots navigation={navigation} introData={introData} xOffset={xOffset} scrollViewRef={scrollViewRef} screenWidth={screenWidth} bottomHeight={bottomHeight} setActiveScreen={setActiveScreen} activeScreen={activeScreen} length={introData.length} />

            <Skip navigation={navigation} />
        </View >
    )
};

export default Localization('Intro', memo(ScreenDataComponent));
