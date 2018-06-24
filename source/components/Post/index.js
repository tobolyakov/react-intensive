//Core
import React, { Component } from 'react';
import moment from 'moment';

// Instuments
import avatar from '../../theme/assets/homer.png';

const style = {
    display: 'inline-block'
}

export default class Post extends Component{
    render () {
        const time = moment().format('MMMM D h:mm:ss a');
        return (
            <section>
                <div>
                    <div style={ style }>
                        <img src={ avatar } />
                    </div>
                    <a>Igor</a>
                    <time style={ style }>{ time }</time>
                </div>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </section>
        )
    }
}
