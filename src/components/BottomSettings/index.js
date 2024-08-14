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

const BottomSettings = ({ navigation, visiable = false, footerVisiable = true, onPressNote, onPressSettings, copyText, selectedItem }) => {
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
            copyText={copyText}
            onPressNote={onPressNote}
            selectedItem={selectedItem}
        />
    );

    return null
};

export default memo(BottomSettings);