//Core
import React, { Component } from 'react';
import cs from 'classnames';

// Instruments
import Styles from './styles.m.css';
import { Consumer } from "../HOC/withProfile";


// Components


export default class StatusBar extends Component{
    render () {
        return (
            <Consumer>
                {
                    (context)=> (
                        <section className={Styles.statusBar}>

                        </section>
                    )
                }
            </Consumer>
        )
    }
}