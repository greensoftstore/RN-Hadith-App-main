// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import DeviceInfo from 'react-native-device-info'
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { selectLastRead } from 'reduxConfiguration/slices/booksSlice';
// ===================================================================
import { GlobalStyle, ConstNumbers, Images } from 'constantsConfiguration'
// =================================================================== 
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
import { MainButton, SecondaryButton, Devider } from 'components'
import { moduleNames } from "constantsConfiguration/enums/modules";

const CollectionBottom = ({ t, navigation, item }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode);
    const listOfBooks = useSelector(selectLastRead);
    // ===================================================================

    const onPress = useCallback(
        (item) => {
            navigation.navigate(moduleNames.CATEGORY, { book: item })
        },
        [],
    )

    // console.log('listOfBooks[item?.key] ', JSON.stringify(listOfBooks[item?.key], null, 2))

    // ===================================================================
    //  Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', alignItems: 'center', overflow: 'hidden', marginTop: 0, paddingVertical: ConstNumbers.paddingHorizontalCard, paddingBottom: 0 }} >
            <MainButton
                height={56}
                text={'Otvori knjigu'}
                onPress={() => { onPress(item) }}
            />

            <Devider height={10} />

            <SecondaryButton
                disabled={listOfBooks && listOfBooks[item?.key] ? false : true}
                height={56}
                text={'Nastavi čitanje'}
                // onPress={() => { navigation.navigate(moduleNames.HADITHSDETAILS, listOfBooks[item.key]) }}
                onPress={() => { navigation.navigate(moduleNames.HADITHSDETAILS, { bookId: listOfBooks[item?.key].bookId, hadithNumber: listOfBooks[item?.key].hadithNumber /* + 1 */, getHadithByNumber: true }) }}
                border={0}
            />
        </View>
    );
};

export default Localization('Collection', memo(CollectionBottom));
