
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { moduleNames } from "constantsConfiguration/enums/modules";

import Main from "./Main";
import FontSettingsScreen from "./FontSettingsScreen";
import ThemeSettingsScreen from "./ThemeSettingsScreen";

//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';

const ScreenNavigation = createNativeStackNavigator();

function MainNavigator(props) {

    return (
        <ScreenNavigation.Navigator
            screenOptions={({ route, navigation }) => ({
                orientation: 'portrait',
                headerShown: false,
                gestureEnabled: false,
                animation: 'slide_from_right',
            })}

        >
            <ScreenNavigation.Screen name={moduleNames.MAIN} component={Main} />
            <ScreenNavigation.Screen name={moduleNames.FONTSETTINGSSCREEN} component={FontSettingsScreen} />
            <ScreenNavigation.Screen name={moduleNames.THEMESETTINGSSCEEN} component={ThemeSettingsScreen} />
        </ScreenNavigation.Navigator>
    );
}

export default MainNavigator;