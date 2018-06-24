//Core
import React, { Component } from 'react';
import {string} from 'prop-types';

// Instuments
import Styles from './style.m.css';

// Render

export default class Composer extends Component{
    static propTypes = {
        avatar:                 string.isRequire,
        currentUserFirstName:   string.isRequire,
    };

    render () {
        const { avatar, currentUserFirstName } = this.props;
        return (
            <section className={Styles.composer}>
                <img src={ avatar } />
                <form>
                    <textarea placeholder={ `Wat is in your mind, ${currentUserFirstName}` } />
                    <br />
                    <input type='submit' value='Post'/>
                </form>
            </section>
        )
    }
}
