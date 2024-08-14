import firestore from '@react-native-firebase/firestore';
import moment from 'moment'

const getData = async (userId) => {
    const items = [];
    let location = `users/${userId}/favourites`

    const querySnapshot = await firestore()
        .collection(location)
        .get()

    querySnapshot.forEach(documentSnapshot => {
        items.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
        });
    });

    return { items };
}

const addToFavouriteCategory = async (userId, categoryId, hadithId, hadith, category) => {
    const items = [];
    let location = `users/${userId}/favourites`
    let locationAdition = `/${categoryId}/hadithF`
    let success = false
    let customMessage = null;
    let successAdded = false;

    // if (category?.key) delete category.key

    // console.log('location ', location)
    // console.log('locationAdition ', locationAdition)

    if (categoryId) {
        const querySnapshot = await firestore()
            .collection(location + locationAdition)
            .where('id', '==', hadithId)
            .get()

        if (querySnapshot?.docs && querySnapshot.docs.length == 0) {
            await firestore()
                .collection(location + locationAdition)
                .doc(hadithId)
                .set(hadith)
                .then((res) => {
                    successAdded = true
                }).catch((e) => {
                    successAdded = false
                })

            if (successAdded)
                await firestore()
                    .collection(location)
                    .doc(categoryId)
                    .set({
                        ...category,
                        numberOfHadiths: category.numberOfHadiths + 1
                    })
                    .then((res) => {
                        success = true
                    }).catch((e) => {
                        success = false
                    })
        } else if (querySnapshot?.docs && querySnapshot.docs.length > 0) {
            customMessage = 'Hadis je već dodan u ovu grupu'
            success = false
        } else {
            success = false
        }
    }

    return { success: success, customMessage: customMessage };
}

const addNewToFavouriteCategory = async (userId, categoryName, hadithId, hadith,) => {
    const items = [];
    let location = `users/${userId}/favourites`
    let success = false
    let snapshotLocal = null;

    await firestore()
        .collection(location)
        .where('favouriteTitle', '==', categoryName)
        .get()
        .then((snapshot) => {
            snapshotLocal = snapshot
        })
        .catch((e) => { /* console.log('e ', e) */ })

    const querySnapshot = await firestore()
        .collection(location)
        .where('favouriteTitle', '==', categoryName)
        .get()

    if (querySnapshot?.docs || querySnapshot.docs == undefined || querySnapshot.docs.length == 0) {
        const category = await firestore().collection(location).add({
            favouriteTitle: categoryName,
            created: moment(new Date()).unix(),
            numberOfHadiths: 1
        });

        await firestore()
            .collection(`${location}/${category.id}/hadithF`)
            .doc(hadithId)
            .set(hadith)
            .then((res) => {
                success = true
            }).catch((e) => {
                success = false
            })
    }

    return { success: success };
}

const api = { getData, addToFavouriteCategory, addNewToFavouriteCategory }

export default api