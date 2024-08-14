import React, { Component, memo } from 'react';
import { BackHandler } from 'react-native';
// ===================================================================
// Components
// ===================================================================
import { ErrorBoundary } from 'components';
// import ScreenMainComponent from 'components/ScreenDefaultMainComponents/Create/ScreenMainComponent'
// ===================================================================
// Local Components
// ===================================================================
import ScreenMainComponent from './Main/ScreenMainComponent';
// ===================================================================
// Settings
// ===================================================================
import { moduleNames, moduleGroups } from 'constantsConfiguration/enums/modules';
// ===================================================================

class ScreenMainContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            boundaryError: false,
            errorText: '',
            catchedError: null
        };
    }

    componentDidMount() {
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonClick,
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButtonClick,
        );
    }

    static getDerivedStateFromError(error) {
        return { boundaryError: true, errorText: error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ catchedError: error })
        // deal with errorInfo if needed
    }

    handleBackButtonClick = () => {
        const { goBack } = this.props.navigation;
        goBack();
        // this.props.navigation.replace(moduleNames.HOME);

        return true;
    };

    render() {
        const { navigation, route } = this.props;
        const { boundaryError, errorText, catchedError } = this.state;

        return (
            <ErrorBoundary
                navigation={navigation}
                boundaryError={boundaryError}
                errorText={errorText}
                catchedError={catchedError}

                mainScreen={true}
            >
                <ScreenMainComponent
                    navigation={navigation}
                    route={route}
                />
            </ErrorBoundary>
        );
    }
}

export default memo(ScreenMainContainer);
