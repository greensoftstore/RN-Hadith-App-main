import { moduleNames } from 'constantsConfiguration/enums/modules';
import { enumRoles } from "constantsConfiguration/enums/authorization";
import { Images } from 'constantsConfiguration'

const _bottomButtonsListUser = {
    [moduleNames.HOME]: {
        label: moduleNames.HOME,
        icon: null,
        image: {
            dark: {
                active: Images.HomeActiveDark,
                inactive: Images.HomeInactiveDark,
            },
            light: {
                active: Images.HomeActiveLight,
                inactive: Images.HomeInactiveLight,
            }
        },
        title: moduleNames.HOME,
        main: false,
    },
    [moduleNames.NOTES]: {
        label: moduleNames.NOTES,
        icon: null,
        image: {
            dark: {
                active: Images.NotesActiveDark,
                inactive: Images.NotesInactiveDark,
            },
            light: {
                active: Images.NotesActiveLight,
                inactive: Images.NotesInactiveLight,
            }
        },
        title: moduleNames.NOTES,
        main: false,
    },
    [moduleNames.SEARCH]: {
        label: moduleNames.SEARCH,
        icon: null,
        image: {
            dark: {
                active: Images.SearchActiveDark,
                inactive: Images.SearchInactiveDark,
            },
            light: {
                active: Images.SearchActiveLight,
                inactive: Images.SearchInactiveLight,
            }
        },
        title: moduleNames.SEARCH,
        main: false,
    },
    [moduleNames.FAVORITES]: {
        label: moduleNames.FAVORITES,
        icon: null,
        image: {
            dark: {
                active: Images.FavoriteActiveDark,
                inactive: Images.FavoriteInactiveDark,
            },
            light: {
                active: Images.FavoriteActiveLight,
                inactive: Images.FavoriteInactiveLight,
            }
        },
        title: moduleNames.FAVORITES,
        main: false,
    },
    [moduleNames.USERS]: {
        label: moduleNames.USERS,
        icon: null,
        image: {
            dark: {
                active: Images.UsersActiveDark,
                inactive: Images.UsersInactiveDark,
            },
            light: {
                active: Images.UsersActiveLight,
                inactive: Images.UsersInactiveLight,
            }
        },
        title: moduleNames.USERS,
        main: false,
    },
}

const _bottomButtonsListAdmin = {
    [moduleNames.HOME]: {
        label: moduleNames.HOME,
        icon: null,
        image: {
            dark: {
                active: Images.HomeActiveDark,
                inactive: Images.HomeInactiveDark,
            },
            light: {
                active: Images.HomeActiveLight,
                inactive: Images.HomeInactiveLight,
            }
        },
        title: moduleNames.HOME,
        main: false,
    },
}

const _bottomButtonsListDefault = {
    [moduleNames.HOME]: {
        label: moduleNames.HOME,
        icon: null,
        image: {
            dark: {
                active: Images.HomeActiveDark,
                inactive: Images.HomeInactiveDark,
            },
            light: {
                active: Images.HomeActiveLight,
                inactive: Images.HomeInactiveLight,
            }
        },
        title: moduleNames.HOME,
        main: false
    },
}

export const bottomButtonsListUser = _bottomButtonsListUser;
export const bottomButtonsListAdmin = _bottomButtonsListAdmin;


const routes = { 0: _bottomButtonsListDefault, [enumRoles.ADMIN]: _bottomButtonsListAdmin, [enumRoles.USER]: _bottomButtonsListUser, }
export default routes;
