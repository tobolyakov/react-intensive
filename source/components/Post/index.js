//Core
import React, { Component } from 'react';
import moment from 'moment';

// Instuments
import Styles from './style.m.css';

// Components
import { Consumer } from "../HOC/withProfile";

// Render

export default class Post extends Component {

    render () {
        const time = moment().format('MMMM D h:mm:ss a');

        const { avatar, currentUserFirstName, currentUserLastName, comment  } = this.props;

        return (
            <Consumer>
                {
                    (context) => (
                        <section className = { Styles.post }>
                            <span className = { Styles.cross }></span>
                            <img src = { context.avatar } />
                            <a>{ context.currentUserFirstName} { context.currentUserLastName}</a>
                            <time>{ time }</time>
                            <p> { comment } </p>
                        </section>
                    )
                }
            </Consumer>
        );
    }
}
