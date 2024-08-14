
// =================================================================== 
// Libraries
// ===================================================================
import { ConstNumbers } from "constantsConfiguration";
import React, { useEffect, memo, useMemo, useState, useRef } from "react";
import {
    View,
} from "react-native";
import Animated, { BounceIn, ZoomInRight, FadeInUp, FadeOut } from 'react-native-reanimated';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';

import Loader from './Loader';

const SkeletonLoader = ({ children, mode, style, customBackground = null, displaySkeletonLoader, customStyleMainContainer, customSkeletonSecondColor = null, fadeDuration = 500, skeletonLoaderItem }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    // ===================================================================
    // State
    // -------------------------------------------------------------------
    // ===================================================================

    return (
        <View style={[{ width: '100%', flex: 1, borderRadius: skeletonLoaderItem ? ConstNumbers.borderRadiusMain : 0, overflow: 'hidden', }, customStyleMainContainer]}>
            {displaySkeletonLoader &&
                <Animated.View exiting={FadeOut.duration(fadeDuration)} style={{ width: '100%', height: '100%', position: 'absolute' }}>
                    <Loader
                        style={style}
                        customBackground={customBackground}
                        displaySkeletonLoader={displaySkeletonLoader}
                        customSkeletonSecondColor={customSkeletonSecondColor}
                    />
                </Animated.View>
            }
            {!displaySkeletonLoader && children}
        </View>
    );
};
export default memo(SkeletonLoader);
