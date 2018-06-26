//Core
import React, { Component } from 'react';

// Instruments
import Style from './style.m.css';

// Components


const portal = document.getElementById('paginator');

export default class Paginator extends Component {
    render () {

        return (
            <section>
                <div className = { Style.paginator } />
            </section>
        );
    }
}