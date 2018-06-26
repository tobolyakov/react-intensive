//Core
import React, { Component } from 'react';
import { string, func, arrayOf, shape } from 'prop-types';
import cs from 'classnames';

// Instruments
import Styles from './style.m.css';
import { withProfile } from "../HOC/withProfile";

// Components


class Like extends Component {
    static propType = {
        _likePostAsync: func.isRequired,
        id:             string.isRequired,
        likes:          arrayOf(
                            shape({
                                firstName: string.isRequired,
                                LastName:  string.isRequired,
                             }),
                        ).isRequired,
    }

    static defaultProps = {
        likes: [],
    }

    state = {
        showLikers: false,
    }

    _showLikers = () => {
        this.setState({
            showLikers: true,
        });
    }

    _hideLikers = () => {
        this.setState({
            showLikers: false,
        });
    }

    _getLikedByMe = () => {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;

        return likes.some(({ firstName, lastName }) =>
            `${firstName} ${lastName}`
            ===
            `${currentUserFirstName} ${currentUserLastName}`
        );
    }

    _getLikeStyles = () => {
        const likedByMe = this._getLikedByMe();

        return cs(Styles.icon, {
            [Styles.liked]: likedByMe,
        });
    }

    _getLikerstList = () => {
        const { showLikers } = this.state;
        const { likes } = this.props;

        const likesJSX = likes.map(({ firstName, lastName, id }) => (
            <li key = { id } >{ `${firstName} ${lastName}` }</li>
        ));

        return likes.length && showLikers ? <ul>{ likesJSX }</ul> : null;
    }

    _getLikesDescription = () => {
        const { likes, currentUserFirstName, currentUserLastName } = this.props;

        let result = likes.length;

        const likedByMe = this._getLikedByMe();

        if (likes.length === 1 && likedByMe) {
            result = `${currentUserFirstName} ${currentUserLastName}`;
        } else if (likes.length === 2 && likedByMe) {
            result = `You end 1 other`;
        } else if (likedByMe) {
            result = `You end ${likes.length -1} others`;
        }

        return result;

    }

    _likePost = () => {
        const { id, _likePostAsync } = this.props;

        _likePostAsync(id);
    }

    render () {
        const likes = this._getLikerstList();
        const likeStyles = this._getLikeStyles();
        const likesDescription = this._getLikesDescription();

        return (
           <section className = { Styles.like }>
               <span className = { likeStyles } onClick = { this._likePost }>Like</span>
               <div>
                   { likes }
                   <span onMouseEnter = { this._showLikers } onMouseLeave = { this._hideLikers }>{ likesDescription }</span>
               </div>
           </section>
        );
    }
};

export default withProfile(Like);