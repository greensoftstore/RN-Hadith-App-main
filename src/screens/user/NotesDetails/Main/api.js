import firestore from '@react-native-firebase/firestore';

const getData = async (userId, selectedItem) => {
    let location = `users/${userId}/notes`

    let error = null;
    let selectedItemNew = {
        ...selectedItem,
        note: '',
        lastEdited: null
    }

    // console.log('selectedItem ', selectedItem)
    // console.log('userId ', userId)

    await firestore()
        .collection(location)
        .doc(selectedItem.key)
        .get()
        .then((snapshot) => {
            // console.log('snapshot ', snapshot.data())
            if (snapshot.data()) {
                selectedItemNew = {
                    ...selectedItemNew,
                    note: snapshot.data()?.note,
                    lastEdited: snapshot.data()?.lastEdited

                }
            }
        })
        .catch((e) => {
            error = e
            // console.log('e2 ', e)
        })

    return { item: selectedItemNew, error: error };
}

const editNote = async (userId, hadithId, item) => {
    let location = `users/${userId}/notes`
    let error = false;

    await firestore()
        .collection(location)
        .doc(hadithId)
        .set(item)
        .then(() => {
            error = null;
            // console.log('success ')
        })
        .catch((e) => {
            error = e
            // console.log('e ', e)

        })

    return { error: error };
}

const api = { getData, editNote }

export default api