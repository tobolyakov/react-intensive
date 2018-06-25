//Core
import React, { Component } from 'react';

// Instuments
import Styles from './style.m.css';

// Components
import { Consumer } from "../HOC/withProfile";

// Render

export default class Composer extends Component{

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
