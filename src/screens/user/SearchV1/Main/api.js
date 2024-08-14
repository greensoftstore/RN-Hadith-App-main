import firestore from '@react-native-firebase/firestore';
import { returnSingleDuplicate } from 'utilities/common'

const getBooks = async () => {
    let items = [];
    let error = false;
    // .collectionGroup('hadith')

    const querySnapshot = await firestore()
        .collection('books')
        .get()

    querySnapshot.forEach((documentSnapshot, index) => {
        items.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
            active: true
        });
    });

    if (!items || items == undefined || items.length == 0) {
        error = true
    }


    return { items: items, error: error };
}

const getAllHadiths = async () => {
    let items = [];
    let error = false;
    // 

    const querySnapshot = await firestore()
        .collectionGroup('hadith')
        .get()

    querySnapshot.forEach(documentSnapshot => {
        items.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
        });
    });

    if (!items || items == undefined || items.length == 0) {
        error = true
    }

    return { items: items, error: error };
}

const searchHadithsOld = async (arr) => {
    let items = [];
    let error = false;
    // 

    let arrnew = ['rYRWCuCC8tOcpbdUvsED', 'qDHvvBzOyp1nVcCeoRPm']

    const querySnapshot = await firestore()
        .collectionGroup('hadith')
        // .where('words', 'array-contains-any', arr)
        .orderBy('hadithNumber', 'asc')
        .where('words', 'in', arr)
        .limit(10)
        .get()

    querySnapshot.forEach(documentSnapshot => {
        items.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
        });
    });

    // console.log('arr ', arr)
    // console.log('items ', items)

    if (!items || items == undefined || items.length == 0) {
        error = true
    }

    return { items: items, error: error };
}

const searchHadiths = async (arr, bookArr, searchText) => {

    let items = [];
    let itemsTmp = [];
    let error = false;

    const queryPromises = arr.map(word => {
        return firestore()
            .collectionGroup('hadith')
            .where('bookId', 'in', bookArr)
            .where('words', 'array-contains', word)
            // .limit(10)
            .get();
    });

    await Promise.all(queryPromises)
        .then(querySnapshots => {

            querySnapshots.forEach(snapshot => {
                snapshot.forEach(doc => {
                    itemsTmp.push({
                        ...doc.data(),
                        key: doc.id,
                    });
                });
            });

            if (!itemsTmp || itemsTmp == undefined) {
                error = true
            } else if (arr.length > 1) {
                // itemsTmp = returnSingleDuplicate(itemsTmp, 'hadithId').splice(0, 10)
                itemsTmp = returnSingleDuplicate(itemsTmp, 'hadithId').sort((a, b) => parseInt(a['hadithNumber']) < parseInt(b['hadithNumber']) ? -1 : 1).splice(0, 10)
            } else {
                itemsTmp = itemsTmp.sort((a, b) => parseInt(a['hadithNumber']) < parseInt(b['hadithNumber']) ? -1 : 1).splice(0, 10)
            }

            itemsTmp.map((hadis) => {
                // console.log('hadis ', JSON.stringify(hadis, null, 2))

                let mainText = null
                let wordBefore = null;
                let wordAfter = null;
                let numberOfWordsAfter = 2

                let bookTitle = hadis.bookTitle
                let hadithTitle = hadis.hadithTitle

                let plainString = hadis?.content.replace(/<[^>]+>/g, '');
                // console.log('searchText ', searchText)

                if (hadithTitle.includes(searchText)) {
                    mainText = searchText
                    let arrTmp = hadithTitle.split(mainText);
                    let arrBefore = arrTmp[0].split(' ')
                    wordBefore = arrBefore.length > 2 ? arrBefore[arrBefore.length - 3] + ' ' + arrBefore[arrBefore.length - 2] : arrBefore[arrBefore.length - 2]
                    wordAfter = arrTmp.length > 0 ? arrTmp[1].split(' ').slice(0, numberOfWordsAfter).join(' ') : ''
                }

                else if (hadithTitle.includes(arr[0])) {
                    mainText = arr[0]
                    let arrTmp = hadithTitle.split(mainText);
                    let arrBefore = arrTmp[0].split(' ')
                    wordBefore = arrBefore.length > 2 ? arrBefore[arrBefore.length - 3] + ' ' + arrBefore[arrBefore.length - 2] : arrBefore[arrBefore.length - 2]
                    wordAfter = arrTmp.length > 0 ? arrTmp[1].split(' ').slice(0, numberOfWordsAfter).join(' ') : ''
                }

                else if (plainString.includes(searchText)) {
                    mainText = searchText
                    let arrTmp = plainString.split(mainText);
                    let arrBefore = arrTmp[0].split(' ')
                    wordBefore = arrBefore.length > 2 ? arrBefore[arrBefore.length - 3] + ' ' + arrBefore[arrBefore.length - 2] : arrBefore[arrBefore.length - 2]
                    wordAfter = arrTmp.length > 0 ? arrTmp[1].split(' ').slice(0, numberOfWordsAfter).join(' ') : ''
                }

                else if (plainString.includes(arr[0])) {
                    mainText = arr[0]
                    let arrTmp = plainString.split(mainText);
                    let arrBefore = arrTmp[0].split(' ')
                    wordBefore = arrBefore.length > 2 ? arrBefore[arrBefore.length - 3] + ' ' + arrBefore[arrBefore.length - 2] : arrBefore[arrBefore.length - 2]
                    wordAfter = arrTmp.length > 0 ? arrTmp[1].split(' ').slice(0, numberOfWordsAfter).join(' ') : ''
                }

                // console.log('wordBefore ', wordBefore)
                // console.log('mainText ', mainText)
                // console.log('wordAfter ', wordAfter)

                let hadisNew = { ...hadis, searchTitle: { wordBefore: wordBefore, mainText: mainText, wordAfter: wordAfter } }

                items.push(hadisNew)
            })

        })
        .catch(error => {
            error = true
        });

    return { items: items, error: error };

}

const api = { getBooks, getAllHadiths, searchHadiths }

export default api

