//Core
import React, { Component } from 'react';
import gsap from 'gsap';
import { Transition } from 'react-transition-group';

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

            console.log(createdPost);
            console.log(meta);
        });
        socket.on('quote', (postJSON) => {
            console.log(postJSON);
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

    /*_deletePostAsync = async (id) => {
        try {
            this._setPostFetchingState(true);
            const deletedPost = await api.deletedPosts(id);

            this.setState(({ posts }) => ({
                posts: posts.map((post) => post.id === id ? deletedPost : post),
            }));
        } catch ({ message }) {
            console.error(message);
        } finally {
            this._setPostFetchingState(false);
        }
    }*/

    _likePostAsync = async (id) => {
        try {
            this._setPostFetchingState(true);
            const likedPost = await api.likePost(id);

            this.setState(({ posts }) => ({
                posts: posts.map((post) => post.id === id ? likedPost : post),
            }));
        } catch ({ message }) {
            console.error(message);
        } finally {
            this._setPostFetchingState(false);
        }
    }

    _animateComposerAppear = (composer) => {
        gsap.fromTo(composer, 5, { opacity: 0, y: -50, z: -50 }, { opacity: 1, y: 0, z: 0 });
    }

    render () {
        const { posts: userPosts, isSpinner, online } = this.state;

        const posts = userPosts.map((post) => (
            <Catcher key = { post.id } >
                <Post { ...post } _deletePostAsync = { this._deletePostAsync } _likePostAsync = { this._likePostAsync } />
            </Catcher>
        ));

        return (
           <section className = { Styles.feed }>
               <StatusBar online = { online } />
               <Spinner isSpinner = { isSpinner } />
               <Transition
                   appear
                   in
                   timeout = { 5000 }
                   onEnter = { this._animateComposerAppear }>
                   <Composer
                    _createPostAsync = { this._createPostAsync }
                   />
               </Transition>
               <Counter counter = { posts.length } />
               { posts }
           </section>
        );
    }
}