//Core
import React, { Component } from 'react';
import moment from 'moment';

// Instuments
import Styles from './style.m.css';

// Components
import {withProfile} from "../HOC/withProfile";
import {Composer} from "../Composer";

// Render

export class Post extends Component {

    render () {
        const time = moment().format('MMMM D h:mm:ss a');

        const { avatar, currentUserFirstName, currentUserLastName, comment  } = this.props;

        return (
            <section className = { Styles.post }>
                <span className = { Styles.cross }></span>
                <img src = { avatar } />
                <a>{ currentUserFirstName} { currentUserLastName}</a>
                <time>{ time }</time>
                <p> { comment } </p>
            </section>
        );
    }
};

export default withProfile(Post);
