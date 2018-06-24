//Core
import React, { Component } from 'react';

// Instruments
import Styles from './style.m.css';

// Components
import Composer from '../../components/Composer';
import Post from '../../components/Post';



export default class Feed extends Component{
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