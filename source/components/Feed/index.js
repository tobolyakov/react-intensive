//Core
import React, { Component } from 'react';

// Instruments
import Styles from './style.m.css';
import { getUniqueID } from "../../instruments";

// Components
import StatusBar from '../../components/StatusBar';
import Composer from '../../components/Composer';
import Post from '../../components/Post';

// Render

export default class Feed extends Component {
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
        const { posts: userPosts } = this.state;

        const posts = userPosts.map((post) => (
            <Post key = { post._id } { ...post } />
        ));

        return (
           <section className = { Styles.feed }>
               <StatusBar />
               <Composer
                _createPostAsync = { this._createPostAsync }
               />
               { posts }
           </section>
        )
    }
}