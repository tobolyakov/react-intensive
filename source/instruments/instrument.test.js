import {delay, getUniqueID, getFullApiUrl, sum} from './index';

describe('Instruments module:', () => {
    describe('sum function:', () => {
        test('<sum> should be a function', () => {
            expect(sum).toBeInstanceOf(Function);
        });

        test('<sum> should add two number', () => {
            const a = 1;
            const b = 3;
            const result = a + b;
            console.log(a);
            console.log(result);
            expect(sum(1, 3)).toBe(result);
        });

        test('should throw if first is not a number', () => {
            const result = () => sum('a', 2);

            expect(result).toThrow('Operand 1 should be a number.');
        });

        test('should throw if tow is not a number', () => {
            const result = () => sum(2, 'a');

            expect(result).toThrow('Operand 2 should be a number.');
        });
    });

    describe('del function:', () => {
        test('should resolve a promise', () => {
            return expect(delay(2000)).resolves.toBeUndefined();
        });

        test('should resolve a promise of 1000ms as default parameter', async () => {
            await expect(delay()).resolves.toBeUndefined();
            // await expect(delay()).resolves.toBe('success');
        });

    });

    describe('getUniqueID function:', () => {
        test('getUniqueID function', () => {
            expect(getUniqueID).toBeInstanceOf(Function);
        });

        test('result string', () => {
            const result = () => getUniqueID('a');
            expect(result).toThrow('The function argument should be a number!');
        });

    });

    describe('getFullApiUrl function:', () => {
        test('getFullApiUrl function', () => {
            expect(getUniqueID).toBeInstanceOf(Function);
        });

    });

});

// test('<sum> should be a function', () => {
//     expect(sum).tobeInstanceOf(function);
// });
//
// test('<sum> should add two number', () => {
//     expect(sum(1,3)).tobe(4);
// });