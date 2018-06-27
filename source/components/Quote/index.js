//Core
import React, { Component } from 'react';
import gsap from 'gsap';
import { Transition } from 'react-transition-group';

// Instruments
import Styles from './style.m.css';
import { withProfile } from "../HOC/withProfile";
import { string } from "prop-types";

// Components


export class Quote extends Component {
    static propTypes = {
        author:  string.isRequired,
        quote:   string.isRequired,
    }


    render () {
        const { author, quote } = this.props;

        return (
            <section className = { Styles.quote }>
                <div>{`${author} <br /> ${quote}`}</div>
            </section>
        );
    }
};

export default withProfile(Quote);