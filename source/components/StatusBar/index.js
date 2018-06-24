//Core
import React, { Component } from 'react';
import cs from 'classnames';

// Instruments
import Styles from './styles.m.css';
import { Consumer } from "../HOC/withProfile";


// Components


export default class StatusBar extends Component{
    render () {
        const status = cs({
            [Styles.status]:  true,
            [Styles.offline]: true,
        });
        return (
            <Consumer>
                {
                    (context)=> (
                        <section className={Styles.statusBar}>
                            <div className={ status }>
                                <div>Offline</div>
                                <span />
                            </div>
                            <button>
                                <img src={ context.avatar } />
                                <span>{ context.currentUserFirstName }</span>
                                &nbsp;
                                <span>{ context.currentUserLastName }</span>
                            </button>
                        </section>
                    )
                }
            </Consumer>
        )
    }
}