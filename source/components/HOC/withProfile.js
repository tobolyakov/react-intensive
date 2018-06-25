//Core
import React, { createContext, Component } from 'react';

const { Provider, Consumer } = createContext();

// Components

const withProfile = (Enhanceable) =>
    class  WithProfile extends Component {
        render () {
            return (
                <Consumer>
                    {
                        (context) => <Enhanceable { ...context } { ...this.props } />
                    }
                </Consumer>
            );
        }
    };

export {
    Provider,
    Consumer,
    withProfile,
};