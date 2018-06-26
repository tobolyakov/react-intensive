//Core
import React, { Component } from 'react';
import moment from 'moment';

// Instruments
import Styles from './style.m.css';
import { string, func } from "prop-types";
import { api } from '../../REST/api';

// Components
import { withProfile } from "../HOC/withProfile";
import Like from '../Like';

export class Post extends Component {
    static propTypes = {
        avatar:                 string.isRequired,
        currentUserFirstName:   string.isRequired,
        currentUserLastName:    string.isRequired,
        _likePostAsync:         func.isRequired,
        _removePostAsync:       func.isRequired,
    }

    _removePost = () => {
        const { _removePostAsync, id } = this.props;
        _removePostAsync(id);
    }

    _getCross = () => {
        const {
        currentUserFirstName,
        currentUserLastName,
        lastName,
        firstName,
        id,
        } = this.props;

        return `${firstName}${lastName}` === `${currentUserFirstName}${currentUserLastName}`
        ? <span
                className = { Styles.cross }
                onClick = { this._removePost }
            />
        : null;
    }

    render () {
        const {
            _likePostAsync,
            avatar,
            currentUserFirstName,
            currentUserLastName,
            lastName,
            firstName,
            created,
            likes,
            id,
            comment } = this.props;

        const cross = this._getCross();

        return (
            <section className = { Styles.post }>
                { cross }
                <img src = { avatar } />
                <a>{ lastName } { firstName }</a>
                <time>{ moment.unix(created).format('MMMM D h:mm:ss a') }</time>
                <p> { comment } </p>
                <Like
                    _likePostAsync = { _likePostAsync }
                    id = { id }
                    likes = { likes }
                />
            </section>
        );
    }
};

export default withProfile(Post);
