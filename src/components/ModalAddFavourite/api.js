import firestore from '@react-native-firebase/firestore';
import moment from 'moment'

const addNewCategoryOld = async (userId, categoryName) => {
    let location = `users/${userId}/favourites`
    let success = false
    try {

        await firestore().collection(location).add({
            favouriteTitle: categoryName,
            created: moment(new Date()).unix(),
            numberOfHadiths: 0
        }).then(() => {
            success = true
        }).catch((error) => {
            success = false
        })


    } catch (error) {
        success = false
    }

    return { success }
}

const addNewCategory = async (userId, categoryName) => {
    let location = `users/${userId}/favourites`
    let success = false
    let customMessage = null;
    let snapshotLocal = null;

    try {

        await firestore()
            .collection(location)
            .where('favouriteTitle', '==', categoryName)
            .get()
            .then((snapshot) => {
                snapshotLocal = snapshot
            })
            .catch((e) => {/*  console.log('e ', e) */ })

        if (!snapshotLocal?.docs || snapshotLocal.docs == undefined || snapshotLocal.docs.length == 0) {
            await firestore().collection(location).add({
                favouriteTitle: categoryName,
                created: moment(new Date()).unix(),
                numberOfHadiths: 0
            }).then(() => {
                success = true
            }).catch((error) => {
                success = false
            })

        } else {
            customMessage = 'Kategorija već postoji'
            success = false
        }

    } catch (error) {
        success = false
    }

    return { success: success, customMessage: customMessage }
}

const api = { addNewCategory }

export default api


