//Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import Styles from './style.m.css';
import { getUniqueID } from "../../instruments";

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

    state = {
        posts: [],
    }

    _createPostAsync = (comment) => {
        this.setState(({ posts }) => ({
            posts: [{ comment, _id: getUniqueID() }, ...posts],
        }));
    }

    render () {
        const { avatar, currentUserFirstName } = this.props;
        const { posts: userPosts } = this.state;

        const posts = userPosts.map((post, _id) => (
            <Post key = { post._id } { ...post } />
        ));

        return (
           <section className = { Styles.feed }>
               <StatusBar />
               <Composer
               _createPostAsync = { this._createPostAsync }
               avatar = { avatar }
                currentUserFirstName = { currentUserFirstName }
               />
               { posts }
           </section>
        )
    }
}