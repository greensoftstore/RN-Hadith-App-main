import React, { useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectAppIntro } from 'reduxConfiguration/slices/settingsSlice';

//=================================================================== 
// Constant
// ===================================================================
import { moduleNames } from "constantsConfiguration/enums/modules";

import Home from "./Home";
import Notes from "./Notes";
import Search from "./Search";
import Favorites from "./Favorites";
import Users from "./Users";

import Settings from "./Settings";
import Profile from "./Profile";

import CollectionDetails from "./CollectionDetails";

import Categories from "./Categories";
import SubCategories from "./SubCategories";
import Hadiths from "./Hadiths";
import HadithsDetails from "./HadithsDetails";
import HadithsDetailsFullScreen from "./HadithsDetailsFullScreen";

import UsersDetails from "./UsersDetails";

import NotesDetails from "./NotesDetails";

import FavoritesSingleCategory from "./FavoritesSingleCategory";

import Test from "./Test";

import AppIntro from "./AppIntro";

import BundleDownload from "./BundleDownload";

import Login from "../auth/Login";
import Registration from "../auth/Registration";
import ResetPassword from "../auth/ResetPassword";

const Bottom = createNativeStackNavigator();

function BottomNavigator(props) {

    return (
        <Bottom.Navigator
            screenOptions={({ route, navigation }) => {
                return ({
                    orientation: 'portrait',
                    headerShown: false,
                    gestureEnabled: true,
                    animation: 'none',
                })
            }}

        >
            <Bottom.Screen name={moduleNames.HOME} component={Home} />
            <Bottom.Screen name={moduleNames.NOTES} component={Notes} />
            <Bottom.Screen name={moduleNames.SEARCH} component={Search} />
            <Bottom.Screen name={moduleNames.FAVORITES} component={Favorites} />
            <Bottom.Screen name={moduleNames.USERS} component={Users} />

        </Bottom.Navigator>
    );
}

const Main = createNativeStackNavigator();

function MainNavigator(props) {

    const appIntro = useSelector(selectAppIntro)
    
    return (
        <Main.Navigator
            screenOptions={({ route, navigation }) => {
                return ({
                    orientation: 'portrait',
                    headerShown: false,
                    gestureEnabled: true,
                    animation:
                        route.name === moduleNames.HOME ||
                            route.name === moduleNames.NOTES ||
                            route.name === moduleNames.SEARCH ||
                            route.name === moduleNames.FAVORITES ||
                            route.name === moduleNames.USERS ||
                            route.name === moduleNames.HADITHSDETAILSFULLSCREEN
                            ? 'none'
                            // : route.name === moduleNames.HADITHSDETAILSFULLSCREEN
                            //     ? Platform.OS == 'ios'
                            //         ? 'fade'
                            //         : 'flip'
                            : 'slide_from_right',
                })
            }}
            // initialRouteName={appIntro ? moduleNames.APPINTRO : moduleNames.HOME}
            initialRouteName={moduleNames.BUNDLEDOWNLOAD}
        // initialRouteName={appIntro ? moduleNames.APPINTRO : moduleNames.BOTTOM_TABS}
        // initialRouteName={moduleNames.COLLECTIONDETAILS}
        >
            <Main.Screen name={moduleNames.BUNDLEDOWNLOAD} component={BundleDownload} />

            <Main.Screen name={moduleNames.HOME} component={Home} />
            <Main.Screen name={moduleNames.NOTES} component={Notes} />
            <Main.Screen name={moduleNames.SEARCH} component={Search} />
            <Main.Screen name={moduleNames.FAVORITES} component={Favorites} />
            <Main.Screen name={moduleNames.USERS} component={Users} />

            {/* <Main.Screen name={moduleNames.BOTTOM_TABS} component={BottomNavigator} /> */}

            <Main.Screen name={moduleNames.PROFILE} component={Profile} />
            <Main.Screen name={moduleNames.SETTINGS} component={Settings} />

            <Main.Screen name={moduleNames.COLLECTIONDETAILS} component={CollectionDetails} />

            <Main.Screen name={moduleNames.CATEGORY} component={Categories} />
            <Main.Screen name={moduleNames.SUBCATEGORY} component={SubCategories} />
            <Main.Screen name={moduleNames.HADITHS} component={Hadiths} />
            <Main.Screen name={moduleNames.HADITHSDETAILS} component={HadithsDetails} />
            <Main.Screen name={moduleNames.HADITHSDETAILSFULLSCREEN} component={HadithsDetailsFullScreen} />

            <Main.Screen name={moduleNames.APPINTRO} component={AppIntro} />

            <Main.Screen name={moduleNames.USERSDETAILS} component={UsersDetails} />

            <Main.Screen name={moduleNames.NOTESDETAILS} component={NotesDetails} />

            <Main.Screen name={moduleNames.FAVORITESSINGLECATEGORY} component={FavoritesSingleCategory} />

            <Main.Screen name={'test'} component={Test} />

            <Main.Screen name={moduleNames.LOGIN} component={Login} />
            <Main.Screen name={moduleNames.REGISTRATION} component={Registration} />
            <Main.Screen name={moduleNames.RESETPASSWORD} component={ResetPassword} />
        </Main.Navigator>
    );
}

export default MainNavigator;