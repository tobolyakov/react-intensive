//Core
import React from 'react';
import { render, mount } from 'enzyme';
import { Composer } from "./index";


const mocks = {
    _cteatePostAsyncMock: jest.fn(() => Promise.resolve()),
    preventDefaultMock: jest.fn(),
};

const avatar = 'http://www.anatar.com';
const currentUserFirstName = 'Igor';

const props = {
    _cteatePostAsync: mocks._cteatePostAsyncMock,
    currentUserFirstName,
    avatar,
};

const testComment = 'Test comment';

const initialState = {
    comment: '',
};

const updatedState = {
    comment: 'testComment',
};

const result = mount(<Composer {  ...props }/>);
const markup = render(<Composer {  ...props }/>);

//Spion

const spies = {
    _updateCommentSpy: jest.spyOn(result.instance(), '_updateComment'),
    _submitCommentSpy: jest.spyOn(result.instance(), '_submitComment'),
    _handleFormSubmitSpy: jest.spyOn(result.instance(), '_hendleFormSubmit'),
    _submitCommentOnEnterSpy: jest.spyOn(result.instance(), '_submitCommentEnter'),
};

describe('Composer comment:', () => {

    describe('should have valid elements:', () => {
        // beforeAll() выполнется перед всех
        // beforeEach() выполнить перед тестов
        // afterAll() выполнить после всех
        // afterEach() dsgjлнить после теста
        test('cote JSX', () => {
            expect(result.find('section.composer')).toHaveLength(1);
            expect(result.find('img')).toHaveLength(1);
            expect(result.find('form')).toHaveLength(1);
            expect(result.find('textarea')).toHaveLength(1);
            expect(result.find('input')).toHaveLength(1);
        });
    });
});