import firestore from '@react-native-firebase/firestore';

const getData = async (userId, limit = 10) => {
    const items = [];
    let location = `users/${userId}/favourites`

    try {

        const querySnapshot = await firestore()
            .collection(location)
            .limit(limit)
            .orderBy('created', 'asc')
            .get()

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

const getMoreData = async (userId, limit = 10, lastItem) => {
    const items = [];
    let location = `users/${userId}/favourites`

    try {
        const querySnapshot = await firestore()
            .collection(location)
            .startAfter(lastItem)
            .limit(limit)
            .orderBy('created', 'asc')
            .get()

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

const deleteFavourite = async (userId, key) => {
    let location = `users/${userId}/favourites`
    let error = null;

    await firestore()
        .collection(location)
        .doc(key)
        .delete()
        .then((res) => {
            error = null
        })
        .catch((e) => {
            error = e
        })

    return { error };
}

const api = { getData, getMoreData, deleteFavourite }

export default api