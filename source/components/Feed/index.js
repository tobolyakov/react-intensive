//Core
import React, { Component } from 'react';

// Instruments
import Styles from './style.m.css';
import { getUniqueID } from "../../instruments";
import { api } from '../../REST/api';

// Components
import StatusBar from '../../components/StatusBar';
import Composer from '../../components/Composer';
import Post from '../../components/Post';
import Catcher from '../../components/Catcher';
import Counter from '../../components/Counter';
import Spinner from '../../components/Spinner';

// Render

export default class Feed extends Component {
    static defautProps = {
        currentUserFirstName: 'Jon',
    };

    state = {
        posts: [],
    }

    componentDidMount () {
        this._fetchPostAsync();
    }

    _setPostFetchingState = (isSpinning) => {
        this.setState({
            isSpinning,
        });
    }

    _fetchPostAsync = async () => {
        try {
            this._setPostFetchingState(true);
            const posts = await api.fetchPosts();

            this.setState({
                posts,
            });
        } catch ({ message }) {
            console.error(message);
        } finally {
            this._setPostFetchingState(false);
        }
    }

    _createPostAsync = async (comment) => {
        try {
            this._setPostFetchingState(true);

            const post = await api.createPost(comment);

            this.setState((prevState) => ({
                posts: [post, ...prevState.posts],
            }));

        } catch ({ message }) {
            console.error(message);
        } finally {
            this._setPostFetchingState(false);
        }
    }

    render () {
        const { posts: userPosts, isSpinner } = this.state;

        const posts = userPosts.map((post) => (
            <Catcher key = { post.id } >
                <Post key = { post.id } { ...post } />
            </Catcher>
        ));

        return (
           <section className = { Styles.feed }>
               <StatusBar />
               <Spinner isSpinner = { isSpinner } />
               <Composer
                _createPostAsync = { this._createPostAsync }
               />
               <Counter counter = { posts.length } />
               { posts }
           </section>
        );
    }
}