// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-spinkit';
// ===================================================================

const SpinnerCustom = ({ size, type, color }) => {

    return (
        <Spinner isVisible={true} size={size} type={type ? type : 'ChasingDots'} color={color} />
    )
}

const styles = StyleSheet.create({

})

export default memo(SpinnerCustom);