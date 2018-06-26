//Core
import React, { Component } from 'react';
import gsap from 'gsap';
import { Transition } from 'react-transition-group';

// Instruments
import Styles from './style.m.css';
import {withProfile} from "../HOC/withProfile";
import { string } from "prop-types";

// Components


export class Postman extends Component {
    static propTypes = {
        avatar:                 string.isRequired,
        currentUserFirstName:   string.isRequired,
        currentUserLastName:    string.isRequired,
    }


    render () {
        const {
            avatar,
            currentUserLastName,
            currentUserFirstName,
        } = this.props;


        return (
            <section className = { Styles.postman }>
                <img src = { avatar } />
                <span>Welcome online, <br /> <b>{`${currentUserFirstName} ${currentUserLastName}`}</b>!</span>
            </section>
        );
    }
};

export default withProfile(Postman);