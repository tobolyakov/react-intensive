//Core
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

// Instruments
import Style from './style.m.css';

// Components


const quote = document.getElementById('quote');

export default class Quote extends Component {
    render () {
        return createPortal(
            <div className = { Style.spinner } /> : null,
            quote
        );
    }
}