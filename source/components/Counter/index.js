//Core
import React, { Component } from 'react';

// Instruments
import Style from './style.m.css';


// Components

const Counter = ({ counter }) =>
    <section className = { Style.counter }> {`Posts count: ${counter}`} </section>;

export default Counter;