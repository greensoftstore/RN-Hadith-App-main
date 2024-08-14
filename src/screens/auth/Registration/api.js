import firestore from '@react-native-firebase/firestore';
import moment from 'moment'

const createUser = async (email, userId) => {
    let success = true;

    // console.log('email ', email)
    // console.log('userId ', userId)

    firestore()
        .collection(`users`)
        .doc(userId)
        .set(
            {
                email: email,
                role: 'user'
            }
        )
        .then((res) => {
            firestore()
                .collection(`users/${userId}/favourites`)
                .add(
                    {
                        favouriteTitle: 'Omiljeni hadisi',
                        created: moment(new Date()).unix(),
                        numberOfHadiths: 0
                    }
                )
                .then((res) => {
                    // console.log('res ', res);
                    success = true
                })
                .catch((e) => {
                    // console.log('e1 ', e);
                    success = false
                })
        })
        .catch((e) => {
            success = false
        })


    return { success: success };
}

const api = { createUser }

export default api