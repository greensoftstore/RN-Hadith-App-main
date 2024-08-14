// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useRef, useCallback, useEffect, useMemo } from 'react';
import { View, Text, Image, Platform, TouchableOpacity, Modal } from 'react-native';

// import { Modal, ModalContent, ModalTitle, BottomModal } from 'react-native-modals';

import BottomSheet from '@gorhom/bottom-sheet';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Components
// ===================================================================
import { MainButton } from 'components'
// =================================================================== 
// Constants
// ===================================================================
import { GlobalStyle } from 'constantsConfiguration'
import { ConstNumbers } from '../../../constantsConfiguration';
// =================================================================== 

const ModalBottom = ({
    setDisplayModal,
    displayModal,
    onFinishModal,
    title = null,
    description = null,
    image = null,
    button = null,
    autoClose,
}) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatchRedux = useDispatch()
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    const bottomSheetRef = useRef(null);;

    // variables
    const snapPoints = useMemo(() => [500], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
    }, []);

    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    /* return (
        <BottomModal
            visible={displayModal}
            onTouchOutside={() => {
                onFinishModal()
                // setDisplayModal(false)
            }}
            height={0.60}
            width={1}
            onSwipeOut={() => {
                onFinishModal()
                // setDisplayModal(false)
            }}

            onHardwareBackPress={() => {
                // setDisplayModal(false)
            }}

            modalTitle={
                <View style={{ width: '100%', paddingVertical: 10, alignItems: 'center', justifyContent: 'center' }} >
                    <View style={{ width: 50, height: 12, borderRadius: 100, backgroundColor: theme.modalTopLineBackgroundColor }} />
                </View>
            }
        >
            <ModalContent
                style={{
                    flex: 1,
                    backgroundColor: theme.modalBackgroundColor,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >

                <View style={{ width: '100%', flex: 1, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', }} >
                    {image !== null &&
                        < View style={{ width: 140, height: 140, }} >
                            <Image source={image} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                        </View>
                    }
                    {title !== null &&
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: Platform.OS === 'ios' ? 15 : 10 }}>
                            <Text style={{ ...GlobalStyle.textFontSemiBold, color: theme.modalTitle, fontSize: 24, textAlign: 'center' }}>{title}</Text>
                        </View>
                    }
                    {description !== null &&
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={{ ...GlobalStyle.textFontRegular, color: theme.modalDescription, fontSize: 15, textAlign: 'center' }}>{description}</Text>
                        </View>
                    }
                </View>

                {button !== null &&
                    <View style={{ zIndex: 999, width: '100%' }} >
                        <MainButton
                            height={60}
                            text={button}
                            onPress={() => { onFinishModal() }}
                            textWeight={GlobalStyle.textFontSemiBold}
                        />
                    </View>
                }

            </ModalContent>
        </BottomModal >
    ) */

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={displayModal}
            statusBarTranslucent={true}
            onRequestClose={() => {
                onFinishModal()
            }}
        >
            <View style={{ width: '100%', height: '100%', top: 0, left: 0, right: 0, bottom: 0, position: 'absolute', zIndex: 999 }} >
                <TouchableOpacity activeOpacity={1} onPress={() => onFinishModal()} style={{ position: 'absolute', backgroundColor: '#00000090', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }} ></TouchableOpacity>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    enablePanDownToClose={true}
                    backgroundStyle={{ backgroundColor: theme.modalBackgroundColor }}
                    handleIndicatorStyle={{ backgroundColor: theme.modalTopLineBackgroundColor, width: 35, height: 10, }}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: ConstNumbers.paddingHorizontalMain,
                        paddingBottom: ConstNumbers.paddingHorizontalMain,
                        paddingBottom: Platform.OS === 'ios' ? 40 : 20
                    }}>
                        <View style={{ width: '100%', flex: 1, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', }} >
                            {image !== null &&
                                < View style={{ width: 140, height: 140, }} >
                                    <Image source={image} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                                </View>
                            }
                            {title !== null &&
                                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: Platform.OS === 'ios' ? 15 : 10 }}>
                                    <Text style={{ ...GlobalStyle.textFontSemiBold, color: theme.modalTitle, fontSize: 24, textAlign: 'center' }}>{title}</Text>
                                </View>
                            }
                            {description !== null &&
                                <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={{ ...GlobalStyle.textFontRegular, color: theme.modalDescription, fontSize: 15, textAlign: 'center' }}>{description}</Text>
                                </View>
                            }
                        </View>

                        {button !== null &&
                            <MainButton
                                height={55}
                                text={button}
                                onPress={() => { onFinishModal() }}
                                textWeight={GlobalStyle.textFontSemiBold}
                            />
                        }
                    </View>
                </BottomSheet>
            </View>
        </Modal>

    )
};

export default memo(ModalBottom);
