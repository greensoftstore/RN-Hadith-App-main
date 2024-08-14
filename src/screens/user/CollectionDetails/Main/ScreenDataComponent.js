// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useRef, memo, useEffect, useCallback, } from 'react';
import {
    View,
    Platform,
} from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Components
// ===================================================================
import { Header, ModalHadithNumber, BottomTabBar } from 'components'
import CollectionTop from './LocalComponents/CollectionTop'
import CollectionBottom from './LocalComponents/CollectionBottom'
// ===================================================================
import { ConstNumbers } from 'constantsConfiguration';

function ScreenDataComponent({ navigation, screenSettings, item }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    // ===================================================================
    // State
    // -------------------------------------------------------------------
    const [visiableSettings, toggleVisiableSettings] = useState(false)
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

    const onPressSettings = useCallback((val) => {
        toggleVisiableSettings(val)
    }, [])
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
            <View style={{ width: '100%', flex: 1, overflow: 'hidden', zIndex: 0 }} >
                <View style={{ width: '100%', flex: 1, paddingBottom: ConstNumbers.footerHeight + 0 }} >
                    <Header
                        title={item?.bookTitle || ''}
                        subtitle={`${item?.numberOfHadith || 0} hadisa`}
                        navigation={navigation}
                        displayBackButton={true}
                        displaySearchButton={true}
                        onPresSearchButtonCustom={onPressSettings}
                    />

                    <View style={{ width: '100%', flex: 1, padding: ConstNumbers.paddingHorizontalCard, paddingTop: ConstNumbers.paddingHorizontalCard + 2, }}>
                        <CollectionTop
                            item={item}
                        />

                        <CollectionBottom
                            navigation={navigation}
                            item={item}
                        />

                    </View>
                </View>

                {/* <BottomTabBar
                    navigation={navigation}
                    settings={screenSettings.settings}
                    delay
                    animate
                /> */}
            </View>

            <ModalHadithNumber
                onPressSettings={onPressSettings}
                visiable={visiableSettings}
                navigation={navigation}
                item={item}
            />
        </>
    );
};

export default memo(ScreenDataComponent);
