//Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import Styles from './style.m.css';

// Components
import Composer from '../../components/Composer';
import Post from '../../components/Post';
import StatusBar from '../../components/StatusBar';

// Render

export default class Feed extends Component {
    static propTypes = {
        avatar:                 string.isRequire,
        currentUserFirstName:   string.isRequire,
        currentUserLastName:    string.isRequire,
    };

    static defautProps = {
        currentUserFirstName: 'Jon',
    };

    constructor () {
        super();
        this._createPost = ::this._createPost;
    }

    state = {
        posts: [],
    }

    _createPost (comment) {
        this.setState(({ posts }) => ({
            posts: [{ comment }, ...posts],
        }));
    }

    render () {
        const { avatar, currentUserFirstName } = this.props;
        const { posts: userPosts } = this.state;

        const posts = userPosts.map((post, index) => (
            <Post key = { index } { ...post } />
        ));

        return (
           <section className = { Styles.feed }>
               <StatusBar />
               <Composer
                avatar = { avatar }
                createPost = { this._createPost }
                currentUserFirstName = { currentUserFirstName }
               />
               { posts}
           </section>
        )
    }
}