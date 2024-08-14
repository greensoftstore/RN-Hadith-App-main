import firestore from '@react-native-firebase/firestore';

const getData = async (limit = 10) => {
    const items = [];
    try {
        const querySnapshot = await firestore()
            .collection('narrators')
            .limit(limit)
            .orderBy('name', 'asc')
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

const getMoreData = async (limit = 10, lastItem) => {
    const items = [];

    try {
        const querySnapshot = await firestore()
            .collection('narrators')
            .orderBy('name', 'asc')
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

const api = { getData, getMoreData }

export default api