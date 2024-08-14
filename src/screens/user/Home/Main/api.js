import React, { useState, useEffect, useMemo, memo } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import firebase from "@react-native-firebase/app";
import firestore from '@react-native-firebase/firestore';
import * as RNFS from 'react-native-fs';
import { config } from "../../../../constantsConfiguration";

let query = {};

const getData = async (limit = 10) => {
    const items = [];
    // console.log('usao ======================================')
    // .collectionGroup('hadith')

    // await firestore()
    //     .collection('books')
    //     .limit(limit)
    //     .get()
    //     .then((res) => {
    //         console.log('res ', res)
    //     })
    //     .catch((e) => {
    //         console.log('e ', e)
    //     })

    //     return { error: true, items: [], lastVisiable: null, endReached: true }


    /**
     * createdAt : 2023.12.18
     * ========================================================================
     */

    try {
        const booksSnap = await config.bookBundleQuery.get({ source: 'cache' });

        if (booksSnap) {
            const lastVisiable = booksSnap.docs[booksSnap.docs.length - 1]

            booksSnap.forEach(documentSnapshot => {
                items.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });

            let endReached = booksSnap.docs.length < limit ? true : false;

            return { items, lastVisiable, endReached };
        } else {
            return { error: true, items: [], lastVisiable: null, endReached: true }
        }
    } catch (error) {
        console.log(error)
        return { error: true, items: [], lastVisiable: null, endReached: true }
    }

    // =====================================================================


    // const querySnapshot = await firestore()
    //     .collection('books')
    //     .limit(limit)
    //     .get()

    // if (querySnapshot) {

    //     const lastVisiable = querySnapshot.docs[querySnapshot.docs.length - 1]

    //     querySnapshot.forEach(documentSnapshot => {
    //         items.push({
    //             ...documentSnapshot.data(),
    //             key: documentSnapshot.id,
    //         });
    //     });

    //     let endReached = querySnapshot.docs.length < limit ? true : false;

    //     console.log(items);

    //     return { items, lastVisiable, endReached };
    // } else {
    //     return { error: true, items: [], lastVisiable: null, endReached: true }
    // }

}

const getMoreData = async (limit = 10, lastItem) => {
    const items = [];
    try {
        // const querySnapshot = await firestore()
        //     .collection('books')
        //     .startAfter(lastItem)
        //     .limit(limit)
        //     .get()
        const querySnapshot = await query.get({ source: 'cache' });
        console.log("querySnapshot ======================================= ")
        console.log(querySnapshot);

        if (querySnapshot) {
            const lastVisiable = querySnapshot.docs[querySnapshot.docs.length - 1]

            querySnapshot.forEach(documentSnapshot => {
                items.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });

            let endReached = querySnapshot.docs.length < limit ? true : false;

            return { items, lastVisiable, endReached };
        } else {
            return { error: true, items: [], lastVisiable: null, endReached: true }
        }
    } catch (error) {
        return { error: true, items: [], lastVisiable: null, endReached: true }
    }
}

const getReadHadiths = async (userId, bookId) => {
    let length = 0;
    try {
        await firestore()
            .collection(`users/${userId}/hadith_read`)
            .where("book", '==', bookId)
            .get()
            .then((querySnapshot) => {
                length = querySnapshot.docs.length
            });

        return { length: length };
    } catch (error) {
        return { length: 0 };
    }
}

const api = { getData, getMoreData, getReadHadiths }

export default api