// Core
import React from 'react';
import ReactDOM from 'react-dom';

// Theme
import './theme/init';

//Components
import { App } from './pages/App';

const start = (
    <div
        style = { {
            display:         'flex',
            justifyContent:  'center',
            alignItems:      'center',
            minHeight:       '100vh',
            backgroundColor: 'slateblue',
            color:           'white',
            fontSize:        24,
            fontWeight:      '600',
        } }>
        Интенсив по React: стартовая точка
    </div>
);

// const ellementOne = <h1 title={Hi}> Hi </h1>;
const list =[...Array(10).keys()].map((num, inedex) => <li key={inedex}> List item: {num} </li>);

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
