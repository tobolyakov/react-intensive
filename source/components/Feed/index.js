//Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import Styles from './style.m.css';

// Components
import Composer from '../../components/Composer';
import Post from '../../components/Post';

// Render

export default class Feed extends Component{
    static propTypes = {
        avatar:                 string.isRequire,
        currentUserFirstName:   string.isRequire,
        currentUserLastName:    string.isRequire,
    };

    static defautProps = {
        currentUserFirstName: 'Jon'
    };

    render () {
        // const { avatar, currentUserFirstName } = this.props;
        return (
           <section className={Styles.feed}>
               <Compose />
               <Post />
           </section>
        )
    }
}