//Core
import React, { Component } from 'react';

// Instuments
import avatar from '../../theme/assets/homer.png';

export default class Composer extends Component{
    render () {
        return (
            <section>
                <img src={ avatar } />
                <form>
                    <textarea placeholder={ `Wat is in your mind, Igor` } />
                    <input type='submit' value='Post'/>
                </form>
            </section>
        )
    }
}
