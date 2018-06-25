//Core
import React, { Component } from 'react';

// Instuments
import Styles from './style.m.css';

// Components
import { Consumer } from "../HOC/withProfile";

// Render

export default class Composer extends Component {
    state = {
        comment: "",
    };

    _hendleFormSubmit = (e) => {
        e.preventDefault();
        this._submitComment();
    }

    _updateComment = (e) => {
        const { value: comment } = e.target;
        console.log(comment);
        this.setState({ comment });
    }

    _submitComment = (e) => {
        const { comment } = this.state;
console.log(comment)

        if (!comment) {
            return null;
        }

        const { _createPostAsync } = this.props;

        _createPostAsync(comment);

        this.setState({
            comment: "",
        });
    }

    render () {
        const { comment } = this.state;

        return (
            <Consumer>
                {
                    (context) => (
                        <section className = { Styles.composer }>
                            <img src = { context.avatar } />
                            <form onSubmit = { this._hendleFormSubmit }>
                                <textarea
                                    placeholder = { `Wat is in your mind, ${context.currentUserFirstName}` }
                                    value = { comment }
                                    onChange = { this._updateComment }
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
