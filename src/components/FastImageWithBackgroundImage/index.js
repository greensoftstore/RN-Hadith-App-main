// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useState } from 'react';
import { Image, View } from 'react-native';
import FastImage from 'react-native-fast-image'
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Constants
// ===================================================================
import { GlobalStyle, Images, ConstNumbers } from 'constantsConfiguration'
// =================================================================== 


const FastImageWithBackgroundImage = ({
    url
}) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)
    // ===================================================================

    const [displayDefaultImage, toggledisplayDefaultImage] = useState(true)

    // const 

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: theme.headerBackgroundColor }} >
            <FastImage
                style={{ width: '100%', height: '100%', }}
                source={{
                    uri: url,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
                onLoad={() => toggledisplayDefaultImage(false)}
            // defaultSource={Images.EmptyImageLight}
            />
        </View>
    )
};

export default memo(FastImageWithBackgroundImage);
