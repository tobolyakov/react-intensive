//Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instuments
import Styles from './style.m.css';

// Components
import { Consumer } from "../HOC/withProfile";

// Render

export default class Composer extends Component{
    // static propTypes = {
    //     avatar:                 string.isRequire,
    //     currentUserFirstName:   string.isRequire,
    // };

    render () {
        // const { avatar, currentUserFirstName } = this.props;
        return (
            <Consumer>
                {
                    (context) => (
                        <section className={Styles.composer}>
                            <img src={ context.avatar } />
                            <form>
                                <textarea placeholder={ `Wat is in your mind, ${context.currentUserFirstName}` } />
                                <br />
                                <input type='submit' value='Post'/>
                            </form>
                        </section>
                    )
                }
            </Consumer>
        )
    }
}
