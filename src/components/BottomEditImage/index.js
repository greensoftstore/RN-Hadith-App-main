// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, } from 'react';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectCarsComparison, } from 'reduxConfiguration/slices/carSlice';
// ===================================================================
// ===================================================================
import InnerComponent from './InnerComponent'

const BottomSettings = ({ navigation, visiable = false, onPressImage, setLoadingImage }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatch = useDispatch()
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    return (
        <InnerComponent
            visiable={visiable}
            navigation={navigation}
            onPressImage={onPressImage}
            setLoadingImage={setLoadingImage}
        />
    );

    return null
};

export default memo(BottomSettings);