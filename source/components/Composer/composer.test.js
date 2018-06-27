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
    _createPostAsync: mocks._cteatePostAsyncMock,
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
        // afterEach() выполнить после теста
        test('cote JSX', () => {
            expect(result.find('section.composer')).toHaveLength(1);
            expect(result.find('img')).toHaveLength(1);
            expect(result.find('form')).toHaveLength(1);
            expect(result.find('textarea')).toHaveLength(1);
            expect(result.find('input')).toHaveLength(1);
        });
    });

    describe('should have valid props:', () => {
        test('_cteatePostAsync should be an function', async () => {
            await expect(
                result.prop('_createPostAsync')(),
            ).resolves.toBeUndefined();
        });

        test('currentUserFirstName should be a string', () => {
            expect(typeof result.prop('currentUserFirstName')).toBe('string');
        });

        test('avatar should be a string', () => {
            expect(typeof result.prop('avatar')).toBe('string');
        });
    });

    describe('should have valid state:', () => {
        test('comment should be a string', () => {
            expect(result.state('comment')).toBe('');
        });
    });

    describe('should have core class methods, defined as class arrow function properties:', () => {
        describe('_hendleFormSubmit', () => {
            test('should call preventDefault whet invoked as onSubmit event handler', () => {
                result.instance()._hendleFormSubmit({
                    preventDefault: mocks.preventDefaultMock,
                });

                expect(mocks.preventDefaultMock).toHaveBeenCalledTimes(1);
            });

            test('should call this._submitComment class method', () => {
                expect(spies._handleFormSubmitSpy).toHaveBeenCalledTimes(1);

                jest.clearAllMocks();
            });
        });

        describe('_submitComment', () => {
            afterEach(() => {
               result.setState(initialState);
            });

            test('should do nothing if state.comment property is an ampty string', () => {
                result.instance()._submitComment();

                expect(spies._submitCommentSpy).toHaveReturnedWith(null);
                expect(mocks._cteatePostAsyncMock).not.toHaveBeenCalled();
                expect(result.state()).toEqual(initialState);
            });

            test('should call this._cteatePostAsync with a comment as an argument', () => {
                result.setState({
                    comment: testComment,
                });
                result.instance()._submitComment();

                expect(mocks._cteatePostAsyncMock).toHaveBeenNthCalledWith(
                    1,
                    testComment,
                );

                expect(result.state()).toEqual(initialState);
            });
        });
    });
});