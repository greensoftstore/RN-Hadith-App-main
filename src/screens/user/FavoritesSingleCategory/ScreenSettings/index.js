import settings from './Settings'
import uuid from 'react-native-uuid'

const ScreenSettings = {
    // MAIN
    settings: settings,

    initialState: {
        items: null
        // [
        //     { 'key': uuid.v4(), skeletonLoaderItem: true },
        //     { 'key': uuid.v4(), skeletonLoaderItem: true },
        //     { 'key': uuid.v4(), skeletonLoaderItem: true },
        // ],
    },
}

export default ScreenSettings