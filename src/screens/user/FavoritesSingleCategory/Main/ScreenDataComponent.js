// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useRef, memo, useEffect, useCallback, useReducer } from 'react';
import {
    View,
    FlatList,
    RefreshControl
} from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { selectUserID } from 'reduxConfiguration/slices/authSlice';
// =================================================================== 
// Components
// ===================================================================
import { MainBackgroundWidthShadow, ListEmptyComponent, SpinnerCustom, FullScreenLoader } from 'components'
import SingleItem from './LocalComponents/SingleItem'
// ===================================================================
import { ConstNumbers } from 'constantsConfiguration';
import Api from './api';

const initialStateLocal = {
    items: null,
    lastItem: null,
    refreshLocal: false,
    displaySkeletonLoader: true,
    updateListData: 0,
    endReached: true,
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case 'reset': return { ...initialState };
        case 'updateLocalList': return { ...state, items: payload.items, lastItem: payload.lastVisiable, refreshLocal: false, displaySkeletonLoader: false, endReached: payload.endReached };
        case 'addToLocalList': return { ...state, items: [...state.items, ...payload.items], lastItem: payload.lastVisiable, endReached: payload.endReached, };
        case 'toggleRefreshlocal': return { ...state, refreshLocal: !state.refreshLocal, updateListData: state.updateListData + 1, };
        case 'toggleSkeletonLoader': return { ...state, displaySkeletonLoader: payload || !state.displaySkeletonLoader };
        default: throw new Error();
    }
}


function ScreenDataComponent({ navigation, screenSettings, selectedItem }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    const userId = useSelector(selectUserID)
    // ===================================================================

    // ===================================================================
    // Redux Local
    // -------------------------------------------------------------------
    const [state, reduce] = useReducer(reducer, { ...initialStateLocal, ...screenSettings.initialState, });
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

    useEffect(() => {
        getData()

    }, []);
    // ===================================================================

    // ===================================================================
    //  Methods
    // -------------------------------------------------------------------
    const getData = useCallback(async () => {
        let res = await Api.getData(userId, selectedItem.key, 15, state.lastItem)

        reduce({ type: 'updateLocalList', payload: res });
    }, [state])

    const getMoreItems = useCallback(async () => {
        let res = await Api.getMoreData(userId, selectedItem.key, 15, state.lastItem)

        reduce({ type: 'addToLocalList', payload: res });
    }, [state])

    const navigateToScreen = useCallback((screen, item) => {
        navigation.push(screen, item)
    }, [])

    const onRefresh = useCallback(() => {
        reduce({ type: 'toggleRefreshlocal', payload: {} });

        getData()
    }, []);
    // ===================================================================

    // ===================================================================
    //  Animations
    // -------------------------------------------------------------------
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    // console.log('selectedItem ', selectedItem)
    const renderSingleItem = (item) => {
        return (
            <SingleItem
                item={item}
                navigation={navigation}
                displaySkeletonLoader={state.displaySkeletonLoader}
                selectedItem={selectedItem}
            />
        )
    }

    return (

        <View style={{ width: '100%', flex: 1, padding: ConstNumbers.paddingHorizontalMain, paddingBottom: ConstNumbers.footerHeight + ConstNumbers.paddingHorizontalMain }}>
            <MainBackgroundWidthShadow borderRadius={ConstNumbers.borderRadiusThird} >
                <View style={{ width: '100%', height: '100%', flex: 1, alignItems: 'center', overflow: 'hidden', borderRadius: ConstNumbers.borderRadiusMain, backgroundColor: theme.singleCollectionBackgroundColor, /* borderWidth: 1, borderColor: theme.singleCollectionBackgroundBorderColor, */ paddingBottom: 5 }} >

                    <FullScreenLoader isLoading={state.displaySkeletonLoader} />

                    <FlatList
                        data={state.items}
                        keyboardShouldPersistTaps={'handled'}
                        style={{ flex: 1, width: '100%', }}

                        onEndReached={() => { if (!state.endReached && !state.displaySkeletonLoader && state.lastItem) getMoreItems() }}
                        onEndReachedThreshold={0.6}
                        scrollEventThrottle={150}

                        refreshControl={
                            <RefreshControl
                                refreshing={state.refreshLocal}
                                onRefresh={onRefresh}
                                colors={Platform.OS === 'android' ? [theme.refreshLoader] : [theme.refreshLoader]}
                                tintColor={Platform.OS === 'android' ? theme.refreshLoader : theme.refreshLoader}
                                progressViewOffset={0}
                            />
                        }

                        keyExtractor={(item, index) => {
                            return item.key;
                        }}
                        contentContainerStyle={{ minHeight: 210 }}

                        initialNumToRender={15}

                        renderItem={({ item, index }) => renderSingleItem(item, index)}

                        ListEmptyComponent={() => {
                            if (!state.displaySkeletonLoader)
                                return (
                                    <ListEmptyComponent
                                    />
                                )
                        }}

                        ListFooterComponent={() => (
                            <View style={{ width: '100%', height: ConstNumbers.footerHeight + 40, paddingBottom: ConstNumbers.footerHeight, justifyContent: 'center', alignItems: 'center' }} >
                                {!state.endReached && <SpinnerCustom size={30} color={theme.textColorReverse} type={'FadingCircleAlt'} />}
                            </View>
                        )}

                    />
                </View >
            </MainBackgroundWidthShadow>
        </View>
    );
};

export default memo(ScreenDataComponent);
