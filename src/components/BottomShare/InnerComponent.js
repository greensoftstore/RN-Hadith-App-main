// =================================================================== 
// Libraries
// ===================================================================
import React, { useRef, memo, useState, useCallback, useMemo, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';

import { getStorage, ref, listAll, getDownloadURL } from "@react-native-firebase/storage";


import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
// const bg = require('./bg.png');

//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
// ===================================================================
import { ConstNumbers, GlobalStyle, Images } from 'constantsConfiguration';
// ===================================================================
import { moduleNames } from "constantsConfiguration/enums/modules";
import { generateRandomNumber } from "utilities/common";
import { MainButton, SpinnerCustom } from 'components'

const InnerComponent = ({ navigation, onClose, footerVisiable = true, visiable = false, item }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatch = useDispatch()
    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)
    // ===================================================================
    const storage = getStorage();

    const [orjentationType, setOrjentationType] = useState(2)
    const [image, setImage] = useState(null)

    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    const bottomSheetRef = useRef(null);;
    const ref = useRef();
    const refStorage = getStorage().ref('books_images');

    const imageWidth = Dimensions.get('window').width - (ConstNumbers.paddingHorizontalMain * 4)

    let content = item?.content || null;
    let textFull = content ? content.replace(/<[^>]+>/g, '') : '';
    // console.log('textFull ', textFull)
    // let text = 'test neki pokusaj da vidim sta se desi pa nastavim pisati pa ovo asdf asf asdfasdfsfd f asd asdf sdf sdf sdf asf sdf as f sdff as afdasdf  sdfasdfasdf  sdf asf  sadf asdf asf  asdfasdfasdf  afasdfsdf  sdfasdfasdfsaf sdfasdfasdfasdf asdfasdfsadf sadfasfasdf';
    let text = textFull.includes('“') ? `${textFull.split('“')[1].split('”')[0]}` : textFull;
    text = text.length > 500 ? `${textFull.includes('“') ? '“' : ''}${text.split('.')[0]}. ${text.split('.')[1]}. ${text.split('.')[2]}.${textFull.includes('“') ? '”' : ''}` : `${textFull.includes('“') ? '“' : ''}${text}${textFull.includes('“') ? '”' : ''}`
    let textFinal = text.split(' undefined.')[0]

    let bookTitle = item?.bookTitle || item?.book?.bookTitle || '';
    let hadithNumber = item?.hadithNumber || '';
    let categoryName = item?.categoryName || item?.category?.categoryName || '';
    let offsetFirst = orjentationType === 2 ? parseInt(textFinal.length / 66) : parseInt(textFinal.length / 36)
    let offsetFinal = offsetFirst > 11 ? 11 : offsetFirst

    const saveImage = useCallback(() => {
        ref.current.capture().then(uri => {

            Share.open({
                title: bookTitle,
                // message: "Message:",
                url: uri,
                // subject: "Report",
            })
        })
    }, []);

    useEffect(() => {
        if (refStorage)
            getImage()
    }, [])

    const getImage = useCallback(async () => {
        listAll(refStorage)
            .then((res) => {
                if (res && res?.items && res.items.length > 0) {
                    let randomNum = generateRandomNumber(0, res.items.length)

                    let urlRef = getStorage().ref(res.items[randomNum].path)
                    // console.log('urlRef ', urlRef)
                    getDownloadURL(urlRef).then((item) => {
                        setImage(item)
                    })
                }
            }).catch((error) => {
                // Uh-oh, an error occurred!
            });
    })

    // variables
    const snapPoints = useMemo(() => [Dimensions.get('window').height * 0.85], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        if (index === -1) onClose(false)
    }, []);

    useEffect(() => {
        if (visiable) {
            // getImage()
            bottomSheetRef.current.snapToIndex(0)
        }
        if (!visiable) bottomSheetRef.current.close()
    }, [visiable])

    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );


    // console.log('text ', text.length)
    // console.log('textFinal ', textFinal.length)
    // console.log('offsetFirst ', offsetFirst)

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={visiable ? 0 : -1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose={true}
            backgroundStyle={{ backgroundColor: theme.modalBackgroundColor, overflow: 'hidden' }}
            handleIndicatorStyle={{ backgroundColor: '#C4C4C4', width: 60, height: 4, }}
            backdropComponent={renderBackdrop}
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: ConstNumbers.paddingHorizontalMain,
                paddingBottom: 20,
            }}>

                <View style={{ width: imageWidth, height: imageWidth * 1.3, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }} >
                    <View style={{ width: imageWidth, height: orjentationType === 2 ? imageWidth * 1.3 : imageWidth * 0.6, }} >
                        {image ?
                            <ViewShot ref={ref}>
                                <View style={{ width: '100%', height: '100%', borderRadius: ConstNumbers.borderRadiusMain, overflow: 'hidden' }}>
                                    <Image source={{ uri: image }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                                    <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#00000090' }} >
                                        <Text style={[GlobalStyle.textFontBookerlyRegular, { fontSize: orjentationType === 2 ? 24 : 16, color: '#FFFFFF', textAlign: 'center' }]}>{bookTitle}, {hadithNumber}</Text>
                                        <View style={{ /* backgroundColor: '#CFAD6563', */ paddingHorizontal: 5, paddingVertical: 2, marginVertical: 8, }} >
                                            <Text style={[GlobalStyle.textFontBookerlyRegular, {
                                                fontSize: orjentationType === 2 ? 22 - offsetFinal : 20 - offsetFinal, lineHeight: orjentationType === 2 ? 30 - offsetFinal : 26 - offsetFinal, color: '#FFFFFF', textAlign: 'center',
                                            }]}>{textFinal}</Text>
                                        </View>
                                        <Text style={[GlobalStyle.textFontBookerlyRegular, { fontSize: orjentationType === 2 ? 13 : 10, color: '#FFFFFF', textAlign: 'center' }]}>{'#Hadiske zbirke app'}</Text>
                                    </View>
                                </View>
                            </ViewShot>
                            : <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }} >
                                <SpinnerCustom size={35} color={theme.textColorReverse} type={'FadingCircleAlt'} />
                            </View>
                        }
                    </View>
                </View>

                <View style={{ width: '100%', marginBottom: 20, backgroundColor: theme.singleCollectionTopButtonsBackgroundColor, flexDirection: 'row', padding: ConstNumbers.paddingHorizontalMain / 2, borderRadius: ConstNumbers.borderRadiusMain, alignItems: 'center', justifyContent: 'space-between' }} >
                    <TouchableOpacity disabled={image == null ? true : orjentationType === 1 ? true : false} onPress={() => { setOrjentationType(1) }} style={{ width: '48%', height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: ConstNumbers.borderRadiusThird, backgroundColor: orjentationType === 1 ? theme.singleCollectionTopButtonsActiveBackgroundColor : 'transparent' }} >
                        <Text style={[GlobalStyle.textFontRegular, { fontSize: 13, color: orjentationType === 1 ? theme.singleCollectionTopButtonsActiveTextColor : theme.singleCollectionTopButtonsInactiveTextColor }]}>{'Landscape'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity disabled={image == null ? true : orjentationType === 2 ? true : false} onPress={() => { setOrjentationType(2) }} style={{ width: '48%', height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: ConstNumbers.borderRadiusThird, backgroundColor: orjentationType === 2 ? theme.singleCollectionTopButtonsActiveBackgroundColor : 'transparent' }} >
                        <Text style={[GlobalStyle.textFontRegular, { fontSize: 13, color: orjentationType === 2 ? theme.singleCollectionTopButtonsActiveTextColor : theme.singleCollectionTopButtonsInactiveTextColor }]}>{'Portrait'}</Text>
                    </TouchableOpacity>
                </View>

                <MainButton
                    disabled={image == null ? true : false}
                    height={60}
                    text={'Podijeli'}
                    onPress={() => { saveImage() }}
                    textWeight={GlobalStyle.textFontSemiBold}
                />


            </View>
        </BottomSheet >
    );
};

export default memo(InnerComponent);
