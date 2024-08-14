import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';

import { moduleNames } from "constantsConfiguration/enums/modules";

import Login from "./Login";
import Registration from "./Registration";
import ResetPassword from "./ResetPassword";

const ScreenNavigation = createNativeStackNavigator();

function MainNavigator(props) {


    return (
        <ScreenNavigation.Navigator
            screenOptions={({ route, navigation }) => ({
                orientation: 'portrait',
                headerShown: false,
                gestureEnabled: false,
                animation:  'slide_from_right',
            })}

        >
            <ScreenNavigation.Screen name={moduleNames.LOGIN} component={Login} />
            <ScreenNavigation.Screen name={moduleNames.REGISTRATION} component={Registration} />
            <ScreenNavigation.Screen name={moduleNames.RESETPASSWORD} component={ResetPassword} />
        </ScreenNavigation.Navigator>
    );
}

export default MainNavigator;