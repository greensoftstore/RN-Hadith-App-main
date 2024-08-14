import React, { memo } from 'react'
import { Text } from 'react-native';
// ===================================================================
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
// ===================================================================
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
import { GlobalStyle } from 'constantsConfiguration'
// ===================================================================

const PackageStatus = ({ t, syncMessage }) => {

    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    return (
        <Text style={{ ...GlobalStyle.textFontRegular, marginTop: 30, fontSize: 16, textAlign: "center", color: theme.mainTextColor }}>{syncMessage}</Text>
    )
}

export default Localization('AppCenter', memo(PackageStatus));
