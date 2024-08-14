import firestore from '@react-native-firebase/firestore';

const getData = async (limit = 10, userId) => {
    const items = [];
    let location = `users/${userId}/notes`
    
    try {
        const querySnapshot = await firestore()
            .collection(location)
            .limit(limit)
            .orderBy('lastEdited', 'desc')
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

const getMoreData = async (limit = 10, userId, lastItem) => {
    const items = [];
    let location = `users/${userId}/notes`

    try {
        const querySnapshot = await firestore()
            .collection(location)
            .orderBy('lastEdited', 'desc')
            .startAfter(lastItem)
            .limit(limit)
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

const deleteNote = async (userId, key) => {
    let location = `users/${userId}/notes`
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

const api = { getData, getMoreData, deleteNote }

export default api