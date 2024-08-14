import firestore from '@react-native-firebase/firestore';

const setAsRead = async (userId, bookId, hadithId) => {

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

const getHadith = async (bookId, hadithNumber) => {
    const items = [];

    const querySnapshot = await firestore()
        .collectionGroup('hadith')
        .where('bookId', '==', bookId)
        .where('hadithNumber', '==', hadithNumber)
        .get()

    querySnapshot.forEach(documentSnapshot => {
        items.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
        });
    });

    // console.log(items)

    return { item: items.length > 0 ? items[0] : null };
}

const getHadithByID = async (hadithId) => {
    const items = [];

    const querySnapshot = await firestore()
        .collectionGroup('hadith')
        .where('hadithId', '==', hadithId)
        .get()

    querySnapshot.forEach(documentSnapshot => {
        items.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
        });
    });

    // console.log(items)

    return { item: items.length > 0 ? items[0] : null };
}

const api = { setAsRead, getHadith, getHadithByID }

export default api