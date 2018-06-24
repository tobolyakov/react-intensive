//Core
import React, {Component} from 'react';

// Components
import Composer from '../../components/Composer';
import Post from '../../components/Post';

export class App extends Component {
    render() {
        return (

            <section>
                <Composer />
                <Post />
            </section>
        )
    }
}
