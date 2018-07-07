//Core
import React, { Component } from 'react';
import gsap from 'gsap';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import moment from 'moment';

// Instruments
import Styles from './style.m.css';
import { api } from '../../REST/api';
import { socket } from '../../socekt/init';
import { GROUP_ID } from "../../REST";
import dispatcher from '../../flux/dispatcher';
import postStore from '../../flux/store';
import { fetchPosts } from '../../flux/actions/posts';
import { startSpinning, stopSpinning } from '../../flux/actions/ui';


// Components
import StatusBar from '../../components/StatusBar';
import Composer from '../../components/Composer';
import Post from '../../components/Post';
import Catcher from '../../components/Catcher';
import Counter from '../../components/Counter';
import Spinner from '../../components/Spinner';
import Quote from '../../components/Quote';
import Postman from '../../components/Postman';
import { withStore } from '../HOC';

// Render
@withStore
export default class Feed extends Component {
    static defaultProps = {
        currentUserFirstName: 'Jon',
    };

    state = {
        // posts: postStore.getPosts(),
        quotes: [],
        // isSpinning: postStore.getSpinningState(),
        online: false,
        isAnimate: false,
    }

    componentDidMount () {
        const { currentUserFirstName, currentUserLastName } = this.props;

        postStore.subscribe(this._onChange);

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
        socket.on('like', (postJSON) => {
            const { data: likePost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}`
                !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState (({ posts }) => ({
                    posts: posts.map((post) => post.id === likePost.id ? likePost : post),
                }));
            }

            console.log(likePost);
            console.log(meta);
        });
        socket.on('remove', (postJSON) => {
            const { data: removePost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}`
                !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState (({ posts }) => ({
                    posts: posts.filter((post) => post.id !== removePost.id),
                }));
            }

            console.log(removePost);
            console.log(meta);
        });

    }

    componentWillUnmount () {
        postStore.unsubscribe(this._onChange);
    }

    _onChange = () => {
        console.log('Feed store change');
        const { /*posts,*/ isSpinning } = postStore.getStore();

        this.setState({
           /* posts,*/
            isSpinning,
        });
    }

    _setPostFetchingState = (isSpinning) => {
        const spinning =
            isSpinning
                ? startSpinning(isSpinning)
                : stopSpinning(isSpinning);
        dispatcher.dispatch(spinning);

        // this.setState({
        //     isSpinning,
        // });
    }

    _fetchPostAsync = async () => {
        try {
            this._setPostFetchingState(true);
            const posts = await api.fetchPosts();

            // console.log(posts);
            // this.setState({
            //     posts,
            // });
            dispatcher.dispatch(
                fetchPosts(posts),
            );
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

    _removePostAsync = async (id) => {
        try {
            this._setPostFetchingState(true);

            await api.removePosts(id);

            this.setState(({ posts }) => ({
                posts: posts.filter((post) => post.id !== id),
            }));
        } catch ({ message }) {
            console.error(message);
        } finally {
            this._setPostFetchingState(false);
        }
    }

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

    _animatePostmanEnter = (postman) => {
        gsap.fromTo(postman, 3, {  x: 350 }, { x: 0, onComplete: setTimeout(function() {
                gsap.fromTo(postman, 3, { x: 0 }, { x: 350 });
            }, 6000)});
    }

    _animatePostmanTime = (postman) => {
        const setTime = moment().format('mm');
        localStorage.setItem('setTime', setTime);
        const getTime = localStorage.getItem('setTime');

        console.log(setTime - getTime);

        // if(setTime - getTime = 2) {
        //     gsap.fromTo(postman, 3, {  x: 350 }, { x: 0, onComplete: setTimeout(function() {
        //             gsap.fromTo(postman, 3, { x: 0 }, { x: 350 });
        //         }, 6000)});
        // }
    }


    render () {
        const { /*posts: userPosts,*/ quotes: userQuotes, isSpinning, online, currentUserFirstName, currentUserLastName } = this.state;
        const { posts: userPosts } = this.props;
        const posts = userPosts.map((post) => (
            <CSSTransition
                classNames = { {
                    enter:          Styles.postInStart,
                    enterActive:    Styles.postInEnd,
                    exit:           Styles.postOutStart,
                    exitActive:     Styles.postOutEnd,
                } }
                key = { post.id }
                timeout = { { enter: 500, exit: 400 } }
            >
                <Catcher>
                    <Post { ...post } _removePostAsync = { this._removePostAsync } _likePostAsync = { this._likePostAsync } />
                </Catcher>
            </CSSTransition>
        ));

        // const quotes = userQuotes.map((quot) => (
        //     <CSSTransition
        //         classNames = { {
        //             enter:          Styles.postInStart,
        //             enterActive:    Styles.postInEnd,
        //             exit:           Styles.postOutStart,
        //             exitActive:     Styles.postOutEnd,
        //         } }
        //         key = { quot.id }
        //         timeout = { { enter: 500, exit: 400 } }
        //     >
        //         <Catcher>
        //             <Quote { ...quot } />
        //         </Catcher>
        //     </CSSTransition>
        // ));

        return (
           <section className = { Styles.feed }>
               <StatusBar online = { online } />
               <Spinner isSpinning = { isSpinning } />
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
               <TransitionGroup>
               { posts }
               </TransitionGroup>
               {/*{ quotes }*/}
               <Transition
                   appear
                   in
                   timeout = { 3000 }
                   onEnter = { this._animatePostmanEnter } >
               <Postman />
           </Transition>
           </section>
        );
    }
}