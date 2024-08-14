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

const ModalAddFavourite = ({ navigation, visiable = false, footerVisiable = true, onPressSettings, refresh }) => {
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
            footerVisiable={footerVisiable}
            onPressSettings={onPressSettings}
            refresh={refresh}
        />
    );

    return null
};

export default memo(ModalAddFavourite);