// =================================================================== 
// Libraries
// ===================================================================
import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { selectAuthenticated,  } from 'reduxConfiguration/slices/authSlice';
// =================================================================== 
// Screens
// ===================================================================

// -------------------------------------------------------------------
// Auth
// -------------------------------------------------------------------
import AuthScreens from 'screens/auth';
// -------------------------------------------------------------------
// Main Navigator User
// -------------------------------------------------------------------
import UserScreens from 'screens/user';

const Stack = createNativeStackNavigator();

function AppNavigator(props) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const authenticated = useSelector(selectAuthenticated)
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    const navTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: theme.mainBackgroundColor,
        },
    };

    return (
        <NavigationContainer
            theme={navTheme}
        >
            <Stack.Navigator
                screenOptions={({ route, navigation, }) => ({
                    headerShown: false,
                    orientation: 'portrait',
                    gestureEnabled: true,
                    animation: 'flip',
                    cardStyle: {

                    }
                })}
            >
                {/* {authenticated
                    ? < Stack.Screen name="UserScreens" component={UserScreens} />
                    : < Stack.Screen name="AuthScreens" component={AuthScreens} />
                } */}

                < Stack.Screen name="UserScreens" component={UserScreens} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;