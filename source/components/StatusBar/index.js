//Core
import React, { Component } from 'react';
import cs from 'classnames';

// Instruments
import Styles from './styles.m.css';
import { withProfile } from "../HOC/withProfile";
import { bool } from "prop-types";

// Components

@withProfile
export default class StatusBar extends Component {
    static propTypes = {
        online: bool.isRequired,
    }

    render () {
        const { online, avatar, currentUserFirstName, currentUserLastName } = this.props;
        const status = cs({
            [Styles.status]:  true,
            [Styles.offline]: !online,
            [Styles.online]: online,
        });
        const statusString = online ? 'Online' : 'Offline';

        return (
            <section className = { Styles.statusBar }>
                <div className = { status }>
                    <div> {statusString} </div>
                    <span />
                </div>
                <button>
                    <img src = { avatar } />
                    <span>{ currentUserFirstName }</span>
                    &nbsp;
                    <span>{ currentUserLastName }</span>
                </button>
            </section>
        );
    }
};

// @withProfile === export default withProfile(StatusBar);