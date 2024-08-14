// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useRef, memo, useEffect, useCallback, } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Components
// ===================================================================
import { BottomShare } from 'components'
import Title from './LocalComponents/Title'
import SingleCollection from './LocalComponents/SingleCollection'
// ===================================================================
import { ConstNumbers } from 'constantsConfiguration';
import { moduleNames } from "constantsConfiguration/enums/modules";

import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';

const bg = require('./bg.png');

function ScreenDataComponent({ navigation, screenSettings }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    // ===================================================================
    // State
    // -------------------------------------------------------------------
    const [shareVisiable, setShareVisiable] = useState(false)
    // ===================================================================

    // ===================================================================
    // Ref
    // -------------------------------------------------------------------
    // ===================================================================

    // ===================================================================
    // Api
    // -------------------------------------------------------------------

    // ===================================================================

    // ===================================================================
    //  Methods
    // -------------------------------------------------------------------
    const navigateToScreen = useCallback((screen) => {
        navigation.navigate(screen)
    }, [])
    // ===================================================================

    // ===================================================================
    //  Animations
    // -------------------------------------------------------------------
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    const ref = useRef();

    const saveImage = useCallback(() => {
        ref.current.capture().then(uri => {
            Share.open({
                title: "Test image share",
                message: "Message:",
                url: uri,
                subject: "Report",
            })
        })
    }, []);

    return (
        <View style={{ width: '100%', flex: 1, alignItems: 'center', backgroundColor: 'blue' }}>

            {/* <View style={{ width: 200, height: 200, }} >
                <ViewShot ref={ref}>
                    <Image source={bg} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                    <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ color: '#000000' }} >...Something to rasterize...</Text>
                    </View>
                </ViewShot>
            </View> */}

            <TouchableOpacity onPress={() => { setShareVisiable(true) }} style={{ width: 100, height: 50, marginTop: 50, backgroundColor: 'red' }}>

            </TouchableOpacity>

            <BottomShare
                visiable={shareVisiable}
                onClose={setShareVisiable}
            />

        </View>
    );
};

export default memo(ScreenDataComponent);
