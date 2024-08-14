import React, { Component, memo } from 'react';
import { BackHandler, View } from 'react-native';
// =================================================================== 
// Components
// ===================================================================
import { ErrorBoundary } from 'components';
// =================================================================== 
// Local Components
// ===================================================================
import ScreenMainComponent from './ScreenMainComponent';
// =================================================================== 

import { moduleNames, moduleGroups } from 'constantsConfiguration/enums/modules';

class ScreenMainContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            boundaryError: false,
            errorText: ''
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    static getDerivedStateFromError(error) {
        return { boundaryError: true, errorText: error };
    }

    componentDidCatch(error, errorInfo) {
        // deal with errorInfo if needed
    }

    handleBackButtonClick = () => {
        const { goBack } = this.props.navigation;
        goBack();
        // this.props.navigation.replace('Dashboard')

        return true;
    }

    render() {
        const { navigation, route } = this.props;
        const { boundaryError, errorText, } = this.state;

        return (
            <ErrorBoundary
                navigation={navigation}
                boundaryError={boundaryError}
                errorText={errorText}
                mainScreen={false}
            >

                <ScreenMainComponent
                    navigation={navigation}
                    route={route}
                />

            </ErrorBoundary>
        )
    }
};


export default memo(ScreenMainContainer);
