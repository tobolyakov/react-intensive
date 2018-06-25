//Core
import React, { Component } from 'react';

// Instuments
import Styles from './style.m.css';

// Components
import { Consumer } from "../HOC/withProfile";

// Render

export default class Composer extends Component {
    constructor () {
        super();
        this._handleUpdate = ::this._handleUpdate;
        this._handleSubmit = ::this._handleSubmit;
    }

    state = {
        comment: "",
    };

    _handleUpdate (e) {
        const { value: comment } = e.target;

        this.setState({ comment });

    }

    // _handleSubmit (e) {
    //     e.preventDefault();
    //     const {comment} = this.props;
    //
    //     const {createPost} = this.props;
    //
    //     createPost(comment);
    // }

    _handleSubmit (e) {
        e.preventDefault();
        const { comment } = this.props;

        const { createPost } = this.props;

        createPost(comment);

        // if (comment) {
        //     const { createPost } = this.props;
        //
        //     createPost(comment);
        //
        //     this.setState({
        //         comment: "",
        //     });
        // }

        console.log(comment);

    }

    render () {
        const { comment } = this.state;

        return (
            <Consumer>
                {
                    (context) => (
                        <section className = { Styles.composer }>
                            <img src = { context.avatar } />
                            <form onSubmit = { this._handleSubmit }>
                                <textarea
                                    placeholder = { `Wat is in your mind, ${context.currentUserFirstName}` }
                                    value = { comment }
                                    onChange = { this._handleUpdate }
                                />
                                <br />
                                <input type = 'submit' value = 'Post' />
                            </form>
                        </section>
                    )
                }
            </Consumer>
        );
    }
}
