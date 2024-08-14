import firestore from '@react-native-firebase/firestore';

export const setAsRead = async (userId, bookId, hadithId) => {

    try {
        const querySnapshot = await firestore()
            .collection(`users/${userId}/hadith_read`)
            .where('hadith', '==', hadithId)
            .get()

        if (querySnapshot?.docs && querySnapshot.docs.length > 0) {
            return { itemSetAsRead: false };
        } else {
            firestore()
                .collection(`users/${userId}/hadith_read`)
                .add(
                    {
                        book: bookId,
                        hadith: hadithId
                    }
                )
                .then((res) => {
                    return { itemSetAsRead: true };
                })
                .catch((e) => { return { itemSetAsRead: false }; })
        }
    } catch (error) {
        return { itemSetAsRead: false };
    }


}

const getInitialData = async (userId, limit = 2, selectedItem) => {
    const items = [selectedItem];

    const querySnapshot = await firestore()
        .collectionGroup('hadith')
        .where('hadithNumber', '==', selectedItem.hadithNumber)
        .limit(1)
        .get()

    const lastVisiable = querySnapshot.docs[0]

    const querySnapshotLeft = await firestore()
        .collectionGroup('hadith')
        .where('bookId', '==', selectedItem.bookId)
        .orderBy('hadithNumber', 'desc')
        .startAfter(lastVisiable)
        .limit(limit)
        .get()

    const firstItem = querySnapshotLeft.docs.length > 0 ? querySnapshotLeft.docs[querySnapshotLeft.docs.length - 1] : lastVisiable
    let endReachedLeft = querySnapshotLeft.docs.length < limit ? true : false;

    querySnapshotLeft.forEach(documentSnapshot => {
        if (documentSnapshot.id !== selectedItem.key) {
            items.unshift({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });

            if (userId != null) setAsRead(userId, selectedItem.bookId, documentSnapshot.id)
        }
    });

    const querySnapshotRight = await firestore()
        .collectionGroup('hadith')
        .where('bookId', '==', selectedItem.bookId)
        .orderBy('hadithNumber', 'asc')
        .startAfter(lastVisiable)
        .limit(limit)
        .get()

    querySnapshotRight.forEach(documentSnapshot => {
        if (documentSnapshot.id !== selectedItem.key) {
            items.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });

            if (userId != null) setAsRead(userId, selectedItem.bookId, documentSnapshot.id)
        }
    });

    const lastItem = querySnapshotRight.docs.length > 0 ? querySnapshotRight.docs[querySnapshotRight.docs.length - 1] : lastVisiable
    let endReachedRight = querySnapshotRight.docs.length < limit ? true : false;

    return { items, lastVisiable, endReachedLeft, endReachedRight, firstItem, lastItem, leftLength: querySnapshotLeft.docs.length };
}

const getMoreData = async (userId, limit = 2, selectedItem, lastItem) => {
    const items = [];

    const querySnapshotRight = await firestore()
        .collectionGroup('hadith')
        .where('bookId', '==', selectedItem.bookId)
        .orderBy('hadithNumber', 'asc')
        .startAfter(lastItem)
        .limit(limit)
        .get()

    const lastVisiable = querySnapshotRight.docs.length > 0 ? querySnapshotRight.docs[querySnapshotRight.docs.length - 1] : null

    querySnapshotRight.forEach(documentSnapshot => {
        if (documentSnapshot.id !== selectedItem.key) {
            items.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });

            if (userId != null) setAsRead(userId, selectedItem.bookId, documentSnapshot.id)
        }
    });

    let endReachedRight = querySnapshotRight.docs.length < limit ? true : false;

    return { items, lastVisiable, endReachedRight, };
}

const getMoreDataLeft = async (userId, limit = 2, selectedItem, lastItem) => {
    const items = [];

    const querySnapshotLeft = await firestore()
        .collectionGroup('hadith')
        .where('bookId', '==', selectedItem.bookId)
        .orderBy('hadithNumber', 'desc')
        .startAfter(lastItem)
        .limit(limit)
        .get()

    let endReachedLeft = querySnapshotLeft.docs.length < limit ? true : false;

    querySnapshotLeft.forEach(documentSnapshot => {
        if (documentSnapshot.id !== selectedItem.key) {
            items.unshift({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });

            if (userId != null) setAsRead(userId, selectedItem.bookId, documentSnapshot.id)
        }
    });
    const firstVisiable = querySnapshotLeft.docs.length > 0 ? querySnapshotLeft.docs[querySnapshotLeft.docs.length - 1] : null

    return { items, firstVisiable, endReachedLeft };
}



const api = { getInitialData, getMoreData, getMoreDataLeft, setAsRead }

export default api