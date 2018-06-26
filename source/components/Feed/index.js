//Core
import React, { Component } from 'react';

// Instruments
import Styles from './style.m.css';
import { api } from '../../REST/api';
import { socket } from '../../socekt/init';
import { GROUP_ID } from "../../REST";

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
        isSpinning: false,
        online: false,
    }

    componentDidMount () {
        const { currentUserFirstName, currentUserLastName  } = this.props;
        this._fetchPostAsync();
        socket.on('connect', () => {
            this.setState({
                online: true,
            });
        });
        socket.on('disconnect', () => {
            this.setState({
                online: false,
            });
        });
        socket.emit('join', GROUP_ID);
        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}`
                !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState (({ posts }) => ({
                    posts: [createdPost, ...posts],
                }));
            }
        });

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

            console.log(posts);
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
        const { posts: userPosts, isSpinner, online } = this.state;

        const posts = userPosts.map((post) => (
            <Catcher key = { post.id } >
                <Post key = { post.id } { ...post } />
            </Catcher>
        ));

        return (
           <section className = { Styles.feed }>
               <StatusBar online = { online } />
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