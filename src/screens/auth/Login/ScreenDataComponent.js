// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useRef, memo, useEffect, useCallback, useReducer } from 'react';
import {
    View,
    Keyboard,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    BackHandler,
    ScrollView,
    findNodeHandle,
    Dimensions,
    Alert
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import TouchID from 'react-native-touch-id';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import auth from '@react-native-firebase/auth';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { createApiMessage } from "reduxConfiguration/slices/snackbarSlice"
import { login, selectAuthenticated } from "reduxConfiguration/slices/authSlice";
// =================================================================== 
// Components
// ===================================================================
import { Devider, FullScreenLoader, ExternalLogin } from 'components'
// ===================================================================
// Local Components
// ===================================================================
import ForgotPassword from './LocalComponents/ForgotPassword'
import BottomButtons from './LocalComponents/BottomButtons'
import Inputs from './LocalComponents/Inputs'
import LogoComponent from './LocalComponents/LogoComponent'
import SaveData from './LocalComponents/SaveData'
// ===================================================================
// Constants
// ===================================================================
import { ConstNumbers } from 'constantsConfiguration'
// ===================================================================
// Utilities
// ===================================================================
import { validateFields } from 'utilities/validation'
// ===================================================================
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
import { apiErrorSnackbarOptions } from 'api/globalResponseErrorHandler'
import { moduleNames } from "constantsConfiguration/enums/modules";

const initialState = {
    items: {},
    refreshLocal: false,
    update: 0,
    saveData: true,
};

// ===================================================================
// Reducer Function
// -------------------------------------------------------------------
const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'reset':
            return { ...state, items: payload, refreshLocal: false };

        case 'changeInput':
            let itemsNew = { ...state.items };
            itemsNew[payload.name].value = payload.value;
            return { ...state, items: itemsNew };

        case 'toggleSaveData':
            return { ...state, saveData: !state.saveData };

        default:
            throw new Error();
    }
};
// ===================================================================

function ScreenDataComponent({ t, navigation, screenSettings, api }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatchRedux = useDispatch()
    const theme = useSelector(selectThemeMode)
    const authenticated = useSelector(selectAuthenticated)

    // ===================================================================

    // ===================================================================
    // Reducer
    // -------------------------------------------------------------------
    const [state, reduce] = useReducer(reducer, {
        ...initialState,
        items: screenSettings?.createAndEditList?.initialState ? { ...screenSettings.createAndEditList.initialState } : {},
    });

    // ===================================================================

    const optionalConfigObject = {
        title: 'Authentication Required', // Android
        imageColor: theme.mainColor1, // Android
        imageErrorColor: '#ff0000', // Android
        sensorDescription: 'Touch sensor', // Android
        sensorErrorDescription: 'Failed', // Android
        cancelText: 'Cancel', // Android
        fallbackLabel: '', // iOS (if empty, then label is hidden)
        unifiedErrors: false, // use unified error messages (default false)
        passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not availabel. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };


    // ===================================================================
    // State
    // -------------------------------------------------------------------
    const [triedToSubmitAtLeastOnce, setTriedToSubmitAtLeastOnce] = useState(false)
    const [loading, setLoading] = useState(false);
    const [keyboardOpenedHeight, setKeyboardVisible] = useState(0);

    // const [saveData, setSaveData] = useState(true)
    // ===================================================================

    const scrollRef = useRef(null)

    // ===================================================================
    // UseEffects
    // -------------------------------------------------------------------
    useEffect(() => {
        const keyboardDidShowListener = Platform.OS === 'android' ? Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                setKeyboardVisible(parseInt(e.endCoordinates.height));
            }
        ) : Keyboard.addListener(
            'keyboardWillShow',
            (e) => {
                setKeyboardVisible(parseInt(e.endCoordinates.height));
            }
        )

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            (e) => {
                setKeyboardVisible(0);
            }
        )

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);



    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            handlebackButton
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        if (authenticated)
            navigation.navigate(moduleNames.HOME)
    }, [authenticated])

    // ===================================================================

    // ===================================================================
    // Methods
    // -------------------------------------------------------------------
    const handlebackButton = useCallback(() => {
        navigation.goBack()
        return true;
    }, []);

    const touchIdLogin = () => {
        TouchID.isSupported(optionalConfigObject)
            .then(biometryType => {
                // Success code
                if (biometryType === 'FaceID') {
                    TouchID.authenticate('', optionalConfigObject)
                        .then(success => {
                            checkUserStatus()
                        })
                        .catch(error => {
                        });
                } else {
                    TouchID.authenticate('', optionalConfigObject)
                        .then(success => {
                            checkUserStatus()
                        })
                        .catch(error => {
                        });
                }
            })
            .catch(error => {
            });
    }


    const handleSubmit = useCallback((email = null, password = null, touchId = false) => {

        let emailNew = email ? email : state.items.email.value
        let passwordNew = password ? password : state.items.password.value

        let formHasErrors = !validateFields(screenSettings.createAndEditList.fields, state.items)

        if (!triedToSubmitAtLeastOnce && !touchId) setTriedToSubmitAtLeastOnce(true)

        if (keyboardOpenedHeight > 0) Keyboard.dismiss()

        if (formHasErrors && !touchId) return

        setTimeout(() => {
            setLoading(true)

            setTimeout(() => {
                auth()
                    .signInWithEmailAndPassword(emailNew, passwordNew)
                    .then((user) => {
                        saveCreditentialsLocally(emailNew, passwordNew)
                        const currentUser = auth().currentUser;
                        let newUser = {
                            "photoURL": currentUser?.photoURL || null,
                            "phoneNumber": currentUser?.phoneNumber || null,
                            "displayName": currentUser?.displayName || null,
                            "uid": currentUser?.uid || null,
                            "email": currentUser?.email || null,
                        }

                        dispatchRedux(login({ user: newUser, saveData: state.saveData }))
                    })
                    .catch(error => {
                        setLoading(false)
                        // console.log('error?.code ', error?.code)
                        let message = error?.code ? t(error.code, error.code) : '';
                        const key = new Date().getTime() + Math.random()

                        dispatchRedux(createApiMessage({ message, key, options: apiErrorSnackbarOptions(key) }))

                    });
            }, 100)

        }, 100)

    }, [state, triedToSubmitAtLeastOnce, loading, /* saveData */])


    const saveCreditentialsLocally = async (email, password) => {
        await Keychain.setGenericPassword(email, password);
    }

    const checkUserStatus = async () => {
        try {
            const credentials = await Keychain.getGenericPassword();
            let username = '';
            let password = '';

            if (credentials) {
                username = credentials.username;
                password = credentials.password;

                handleSubmit(username, password, true)

            } else {
                Alert.alert(t('creditentialsNotSaved', 'Credentials are not saved, please login to save your credentials'))
            }
        }
        catch (error) {
            setLoading(false)
            Alert.alert(t('Error', 'Error'))
        }
    }

    const onFocusAddition = useCallback((e) => {
        scrollToInput(findNodeHandle(e.target))
    }, [])

    const scrollToInput = useCallback((target) => {
        scrollRef.current.props.scrollToFocusedInput(target, 40);
    }, [scrollRef])

    // ===================================================================

    // ===================================================================
    // Animations
    // -------------------------------------------------------------------


    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    return (
        <>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps='handled'
                innerRef={(ref) => { scrollRef.current = ref ? ref.getScrollResponder() : null; }}
            >
                <View style={{ width: '100%', flex: 1, paddingHorizontal: ConstNumbers.paddingHorizontalMain, minHeight: Dimensions.get('window').height - 50 }}>

                    <View style={{ width: '100%', flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', }}>

                        <LogoComponent />

                        <Inputs
                            screenSettings={screenSettings}
                            reduce={reduce}
                            triedToSubmitAtLeastOnce={triedToSubmitAtLeastOnce}
                            disabled={loading}
                            onFocusAddition={onFocusAddition}
                        />

                        <SaveData
                            saveData={state.saveData}
                            setSaveData={() => { reduce({ type: 'toggleSaveData', payload: null }) }}
                            touchIdLogin={() => { touchIdLogin() }}
                        />

                        <Devider height={20} />

                        <BottomButtons
                            navigation={navigation}
                            onPressLogin={() => { handleSubmit() }}
                            disabled={loading}
                            loading={loading}
                        />

                        <Devider height={10} />

                        <ForgotPassword navigation={navigation} />

                    </View>


                </View>
            </KeyboardAwareScrollView>

            {/* <FullScreenLoader
                isLoading={loading}
            /> */}
        </>
    );
};

// export default memo(ScreenDataComponent);
export default Localization('Auth', memo(ScreenDataComponent));
