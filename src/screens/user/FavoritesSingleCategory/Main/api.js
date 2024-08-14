import firestore from '@react-native-firebase/firestore';

const getData = async (userId, favouriteCategoryId, limit = 10) => {
    const items = [];
    let location = `users/${userId}/favourites/${favouriteCategoryId}/hadithF`

    const querySnapshot = await firestore()
        .collection(location)
        .orderBy('hadithNumber', 'asc')
        .limit(limit)
        .get()

    const lastVisiable = querySnapshot.docs[querySnapshot.docs.length - 1]

    querySnapshot.forEach(documentSnapshot => {
        items.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
        });
    });

    let endReached = querySnapshot.docs.length < limit ? true : false;

    return { items, lastVisiable, endReached };
}

const getMoreData = async (userId, favouriteCategoryId, limit = 10, lastItem) => {
    const items = [];
    let location = `users/${userId}/favourites/${favouriteCategoryId}/hadithF`

    const querySnapshot = await firestore()
        .collection(location)
        .orderBy('hadithNumber', 'asc')
        .startAfter(lastItem)
        .limit(limit)
        .get()

    const lastVisiable = querySnapshot.docs[querySnapshot.docs.length - 1]

    querySnapshot.forEach(documentSnapshot => {
        items.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
        });
    });

    let endReached = querySnapshot.docs.length < limit ? true : false;

    return { items, lastVisiable, endReached };
}

const deleteFavouriteSingleItem = async (userId, favouriteCategoryId, key, selectedCategory) => {
    let location = `users/${userId}/favourites`
    let locationRest = `/${favouriteCategoryId}/hadithF`
    let error = null;

    let selectedCategoryNew = { ...selectedCategory }

    delete selectedCategoryNew['key']

    // console.log(selectedCategoryNew)

    await firestore()
        .collection(location + locationRest)
        .doc(key)
        .delete()
        .then((res) => {
            error = null
            firestore()
                .collection(location)
                .doc(favouriteCategoryId)
                .set({
                    ...selectedCategoryNew,
                    numberOfHadiths: selectedCategoryNew.numberOfHadiths - 1
                })
                .then((res) => {
                    error = null
                })
                .catch((e) => {
                    error = e
                })

        })
        .catch((e) => {
            error = e
        })

    return { error };
}

const api = { getData, getMoreData, deleteFavouriteSingleItem }

export default api