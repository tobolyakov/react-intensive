//Core
import React, { Component } from 'react';

// Instuments
import avatar from '../../theme/assets/homer.png';
import Styles from './style.m.css';

export default class Composer extends Component{
    render () {
        return (
            <section className={Styles.composer}>
                <img src={ avatar } />
                <form>
                    <textarea placeholder={ `Wat is in your mind, Igor` } />
                    <br />
                    <input type='submit' value='Post'/>
                </form>
            </section>
        )
    }
}
