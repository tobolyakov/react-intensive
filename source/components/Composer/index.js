//Core
import React, { Component } from 'react';

// Instuments
import Styles from './style.m.css';

// Components
import { withProfile } from "../HOC/withProfile";
import { string } from "prop-types";

// Render

export class Composer extends Component {
    static propTypes = {
        avatar:                 string.isRequired,
        currentUserFirstName:   string.isRequired,
    }

    state = {
        comment: "",
    };

    _hendleFormSubmit = (e) => {
        e.preventDefault();
        this._submitComment();
    }

    _updateComment = (e) => {
        const { value: comment } = e.target;
        this.setState({ comment });
    }

    _submitComment = (e) => {
        const { comment } = this.state;

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
        const { avatar, currentUserFirstName } = this.props;

        return (
            <section className = { Styles.composer }>
                <img src = { avatar } />
                <form onSubmit = { this._hendleFormSubmit }>
                    <textarea
                        placeholder = { `Wat is in your mind, ${currentUserFirstName}` }
                        value = { comment }
                        onChange = { this._updateComment }
                    />
                    <br />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}

export default withProfile(Composer);