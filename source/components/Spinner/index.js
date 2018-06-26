//Core
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

// Instruments
import Style from './style.m.css';

// Components


const portal = document.getElementById('spinner');

export default class Spinner extends Component {
    render () {
        const { isSpinning } = this.props;

        return createPortal(
            isSpinning ? <div className = { Style.spinner } /> : null,
            portal
        );
    }
}