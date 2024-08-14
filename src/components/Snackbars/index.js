// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useState, useEffect, useRef } from 'react';
import { View, Platform, } from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { selectApiMessages, removeApiMessage } from 'reduxConfiguration/slices/snackbarSlice';
// ===================================================================
// Local Components
// ===================================================================
import Snackbar from './Snackbar'
// ===================================================================

const Snackbars = ({ }) => {

    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatchRedux = useDispatch()

    const theme = useSelector(selectThemeMode)
    const notifications = useSelector(selectApiMessages);
    // ===================================================================

    // ===================================================================
    // State
    // -------------------------------------------------------------------
    // const [localNotifications, setLoacalNotifications] = useState([]);
    // ===================================================================

    // ===================================================================
    // Methods
    // -------------------------------------------------------------------
    const onSnackbarClose = (key) => {
        dispatchRedux(removeApiMessage({ key: key }))
    };

    // useEffect(() => {
    //     setLoacalNotifications(notifications)
    // }, [notifications])
    // ===================================================================

    if (notifications.length > 0)
        return (
            <View style={{ position: 'absolute', top: 0, paddingTop: Platform.OS === 'ios' ? 40 : 10, width: '100%', paddingHorizontal: 10, zIndex: 99999 }}>
                {notifications.map((snackbar, index) => {
                    return (
                        <Snackbar
                            key={snackbar.key + 'snackbar'}
                            snackbar={snackbar}
                            index={index}
                            onSnackbarClose={onSnackbarClose}
                        />
                    )
                })}
            </View>
        )

    return null

}

export default memo(Snackbars);
