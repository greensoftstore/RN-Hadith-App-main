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
import ScreenMainComponent from './ScreenMainComponent';
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
    }

    handleBackButtonClick = () => {
        const { goBack } = this.props.navigation;
        goBack();

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
                screen={`${moduleNames.LOGIN}`}
                mainScreen={false}
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