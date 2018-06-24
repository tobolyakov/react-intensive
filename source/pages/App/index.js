//Core
import React, {Component} from 'react';
import {hot} from 'react-hot-loader';

//Instrument
import avatar from '../../theme/assets/homer.png';

// Components
import Feed from '../../components/Feed';

const options = {
    avatar,
    currentUserFirstName: 'Igor',
    currentUserLastName: 'Tobolyakov',
};

@hot(module)
export class App extends Component {
    render() {
        return (
            <section>
                <Feed { ...options }/>
            </section>
        )
    }
}
