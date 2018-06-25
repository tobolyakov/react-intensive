//Core
import React, { createContext, Component } from 'react';

// Instruments

//

const { Provider, Consumer } = createContext();

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


// Components


export {
    Provider,
    Consumer,
    withProfile,
};