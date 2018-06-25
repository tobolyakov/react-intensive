//Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

//Instrument
import avatar from '../../theme/assets/homer.png';

// Components
import Feed from '../../components/Feed';
import { Provider } from "../../components/HOC/withProfile";
import Catcher from '../../components/Catcher';

const options = {
    avatar,
    currentUserFirstName: 'Игорь',
    currentUserLastName: 'Тоболяков',
};

@hot(module)
export class App extends Component {
    render() {
        return (
            <Catcher>
                <Provider value={ options }>
                    <Feed { ...options } />
                </Provider>
            </Catcher>
        )
    }
}
