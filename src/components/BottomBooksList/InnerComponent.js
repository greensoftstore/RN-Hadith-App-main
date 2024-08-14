// =================================================================== 
// Libraries
// ===================================================================
import React, { useRef, memo, useState, useCallback, useMemo, useEffect } from 'react';
import {
    View,
    Text,
    Platform,
    Pressable,
    Image
} from 'react-native';
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetModalProvider,
    useBottomSheetTimingConfigs,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';

//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
// ===================================================================
import { ConstNumbers, GlobalStyle, Images } from 'constantsConfiguration';
// ===================================================================
import { MainBackgroundWidthShadow } from 'components'
import SingleItem from './SingleItem'

const InnerComponent = ({ navigation, onPressSettings, visiable = false, books, updateBooks }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatch = useDispatch()
    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)
    // ===================================================================

    const [localUpdate, setLocalUpdate] = useState(0)
    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    const bottomSheetRef = useRef(null);;

    // variables
    const snapPoints = useMemo(() => ['80%'], []);
    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        if (index === -1) {
            onPressSettings(false)
        }
    }, []);

    useEffect(() => {
        if (visiable) bottomSheetRef.current.snapToIndex(0)
        if (!visiable) bottomSheetRef.current.close()
    }, [visiable])

    const toggleActive = useCallback((index, val) => {

        updateBooks({ index, val })
        // setLocalUpdate(val => val + 1)
    }, [])

    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );

    const renderItem = useCallback(
        ({ item, index }) => (
            <SingleItem
                item={item}
                index={index}
                toggleActive={(index, val) => { toggleActive(index, val) }}
            />
        ), []);

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={visiable ? 0 : -1}
            // snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose={true}
            backgroundStyle={{ backgroundColor: theme.modalBackgroundColor, overflow: 'hidden' }}
            handleIndicatorStyle={{ backgroundColor: '#C4C4C4', width: 60, height: 4, }}
            backdropComponent={renderBackdrop}

            snapPoints={animatedSnapPoints}
            handleHeight={animatedHandleHeight}
            contentHeight={animatedContentHeight}
        >
            <View onLayout={handleContentLayout} style={{
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: ConstNumbers.paddingHorizontalMain,
                paddingBottom: 20,
            }}>

                <MainBackgroundWidthShadow
                    customShadow={{ borderRadius: ConstNumbers.borderRadiusThird, backgroundColor: theme.modalBackgroundColor2 }}
                >
                    <View style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: ConstNumbers.borderRadiusThird, backgroundColor: theme.modalBackgroundColor2 }} >
                        <BottomSheetFlatList
                            // key={localUpdate + 'list'}
                            data={books || []}
                            keyExtractor={(i, index) => i?.key || index.toString()}
                            renderItem={renderItem}
                        // contentContainerStyle={{ width: '100%', flex: 1 /* height: '100%' */ }}
                        />
                    </View>
                </MainBackgroundWidthShadow>
            </View>
        </BottomSheet>
    );
};

export default memo(InnerComponent);
