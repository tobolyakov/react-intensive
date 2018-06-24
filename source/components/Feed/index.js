//Core
import React, { Component } from 'react';
import propTypes from 'prop-types';

// Instruments
import Styles from './style.m.css';

// Components
import Composer from '../../components/Composer';
import Post from '../../components/Post';

// Render

export default class Feed extends Component{
    static propTypes = {
        avatar: propTypes.string.isRequire,
        currentUserFirstName: propTypes.string.isRequire,
        currentUserLastName: propTypes.string.isRequire,
    }

    render () {
        const { avatar, currentUserFirstName } = this.props;
        return (
           <section className={Styles.feed}>
               <Composer
                   avatar = { avatar }
                   currentUserFirstName = { currentUserFirstName }
               />
               <Post { ...this.props } />
           </section>
        )
    }
}