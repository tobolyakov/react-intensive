//Core
import React, { Component } from 'react';

// Instruments
import Styles from './style.m.css';
import { getUniqueID } from "../../instruments";

// Components
import StatusBar from '../../components/StatusBar';
import Composer from '../../components/Composer';
import Post from '../../components/Post';
import Catcher from '../../components/Catcher';
import Counter from '../../components/Counter';

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
            <Catcher key = { post._id } >
                <Post key = { post._id } { ...post } />
            </Catcher>
        ));

        return (
           <section className = { Styles.feed }>
               <StatusBar />
               <Composer
                _createPostAsync = { this._createPostAsync }
               />
               <Counter counter = { posts.length } />
               { posts }
           </section>
        )
    }
}