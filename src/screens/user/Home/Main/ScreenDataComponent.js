// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useRef, memo, useEffect, useCallback, useReducer } from 'react';
import {
    View,
    FlatList,
    RefreshControl,
    Alert
} from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { createApiMessage } from "reduxConfiguration/slices/snackbarSlice"
// =================================================================== 
// Components
// ===================================================================
import { SearchButton, ListEmptyComponent, SpinnerCustom, FullScreenLoader } from 'components'
import Title from './LocalComponents/Title'
import SingleCollection from './LocalComponents/SingleCollection'
// ===================================================================
import { ConstNumbers } from 'constantsConfiguration';
import { moduleNames } from "constantsConfiguration/enums/modules";
import { apiErrorSnackbarOptions } from 'api/globalResponseErrorHandler'

import Api from './api';

const initialStateLocal = {
    items: null,
    lastItem: null,
    refreshLocal: false,
    displaySkeletonLoader: true,
    updateListData: 0,
    endReached: false,
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


function ScreenDataComponent({ navigation, screenSettings }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatch = useDispatch()
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    // ===================================================================
    // State
    // -------------------------------------------------------------------

    // ===================================================================

    // ===================================================================
    // Redux Local
    // -------------------------------------------------------------------
    const [state, reduce] = useReducer(reducer, { ...initialStateLocal, ...screenSettings.initialState, });
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
        let res = await Api.getData(10, state.lastItem)

        if (res?.error) {
            let message = 'Došlo je do greške';
            const key = new Date().getTime() + Math.random()

            dispatch(createApiMessage({ message, key, options: apiErrorSnackbarOptions(key) }))

        }

        reduce({ type: 'updateLocalList', payload: res });
    }, [state, state.updateListData])

    const getMoreItems = useCallback(async () => {
        let res = await Api.getMoreData(10, state.lastItem)

        if (res?.error) {
            let message = 'Došlo je do greške';
            const key = new Date().getTime() + Math.random()

            dispatch(createApiMessage({ message, key, options: apiErrorSnackbarOptions(key) }))

        }
        reduce({ type: 'addToLocalList', payload: res });
    }, [state])

    const navigateToScreen = useCallback((screen, item) => {
        navigation.navigate(screen, item)
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

    const renderSingleItem = (item, index) => {
        return (
            <SingleCollection
                item={item}
                index={index}
                displaySkeletonLoader={state.displaySkeletonLoader}
                onPress={(item) => { navigateToScreen(moduleNames.COLLECTIONDETAILS, item) }}
            />
        )
    }

    const renderHeader = () => {
        return (
            <View style={{ width: '100%', paddingTop: ConstNumbers.paddingHorizontalCard, paddingBottom: 8 }} >
                <SearchButton
                    onPress={() => navigateToScreen(moduleNames.SEARCH, { autoFocus: true })}
                />

                <Title />
            </View>
        )
    }

    return (
        <View style={{ width: '100%', flex: 1, }}>

            <View style={{ width: '100%', flex: 1, }} >

                <FullScreenLoader isLoading={state.displaySkeletonLoader} />

                <FlatList
                    scrollEnabled={!state.displaySkeletonLoader}
                    data={state.items}
                    keyboardShouldPersistTaps={'handled'}
                    style={{ flex: 1, width: '100%', }}

                    keyExtractor={(item, index) => {
                        return item.key + state.updateListData;
                    }}

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

                    contentContainerStyle={{ paddingHorizontal: ConstNumbers.paddingHorizontalCard, paddingBottom: 40, }}

                    initialNumToRender={4}

                    renderItem={({ item, index }) => renderSingleItem(item, index)}

                    ListEmptyComponent={() => {
                        if (!state.displaySkeletonLoader)
                            return (
                                <ListEmptyComponent
                                />
                            )
                    }}

                    ListHeaderComponent={renderHeader}

                    ListFooterComponent={() => (
                        <View style={{ width: '100%', height: ConstNumbers.footerHeight + 40, paddingBottom: ConstNumbers.footerHeight, justifyContent: 'center', alignItems: 'center' }} >
                            {!state.endReached && <SpinnerCustom size={30} color={theme.textColorReverse} type={'FadingCircleAlt'} />}
                        </View>
                    )}

                />
            </View>

        </View>
    );
};

export default memo(ScreenDataComponent);
