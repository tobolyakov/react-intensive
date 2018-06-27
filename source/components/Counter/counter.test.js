//Core
import React from 'react';
import Counter from './index';
import dom from 'react-test-renderer';


const renderTree = dom.create(<Counter counter = { 9 } />).toJSON();

test('Counter component should correspond to their snapshot', () => {
    expect(renderTree).toMatchSnapshot();
});