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

const BottomSettings = ({ navigation, visiable = false, footerVisiable = true, onPressSettings, books, updateBooks }) => {
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
            books={books}
            updateBooks={updateBooks}
        />
    );

    return null
};

export default memo(BottomSettings);