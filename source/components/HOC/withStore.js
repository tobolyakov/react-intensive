//Core
import React, { Component } from 'react';
import postsStore from '../../flux/store';
import dispatcher from '../../flux/dispatcher';

// Components

const withStore = (Enhanceable) =>
    class WithStore extends Component {
    state = postsStore.getStore();

    componentDidMount () {
        postsStore.subscribe(this._onStoreChange);

        setTimeout(() => {
            this.setState({
                posts: [],
            });
        }, 10000);
    }

    componentWillUnmount = () => {
        postsStore.unsubscribe(this._onStoreChange);
    }

    _onStoreChange = () => {
        const store = postsStore.getStore();

        this.setState({
            ...store,
        });
    }
        render () {
            return (
                <Enhanceable { ...this.state } { ...this.props } />
            );
        }
    };

export {
    withStore,
};