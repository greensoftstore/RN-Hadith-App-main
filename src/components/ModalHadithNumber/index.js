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

const ModalHadithNumber = ({ navigation, visiable = false, footerVisiable = true, onPressSettings, item }) => {
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
            item={item}
        />
    );

    return null
};

export default memo(ModalHadithNumber);