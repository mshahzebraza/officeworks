// ES6 import syntax also works
import { checkDataType, summarizerNew2 } from '../helpers/reusable'

// checkDataType
test('test checkDataType against all possible data input types', () => {
    [
        [['name'], 'string'],
        [[26], 'number'],
        [[[]], 'array'],
        [[{}], 'object'],
        [[null], 'null'],
        [[undefined], 'undefined'],
    ].forEach(
        pair => {
            const [inputParams, expectedResult] = pair;
            expect(checkDataType(...inputParams)).toBe(expectedResult);
        }
    )
});

// checkDataType
test('test summarizerNew2 against all possible data input types', () => {
    [
        [[{}, {}], {}],
    ].forEach(
        pair => {
            const [inputParams, expectedResult] = pair;
            expect(summarizerNew2(...inputParams)).toMatchObject(expectedResult);
        }
    )
});















// test('test summarizerNew2 against all possible data input types', () => {
//     [
//         [[
//             /* Param 1: data */
//             {
//                 myPrimary1: 'shahzeb',
//                 myPrimary2: 420,
//                 // myKeyToReplace: 'The key against this text should be changed to keyToBeReplacedWith',
//                 myKeyToDelete: 'This key-value pair must be deleted',
//                 myArrayToConcatenate: [
//                     'array-values',
//                     'must',
//                     'be',
//                     'concatenated',
//                     'therefore',
//                     'values',
//                     'must',
//                     'be',
//                     'of',
//                     'primary',
//                     'data-type'
//                 ],
//                 // myArrayToCategorize: [
//                 //     'lead screw',
//                 //     'motor',
//                 //     'mouse',
//                 //     'motor',
//                 //     'mouse',
//                 //     'pen',
//                 // ],
//                 // myArrayOfObjectsWhoseNestedKeysToReplaceObject: [
//                 //     { myNestedKey: 'hello' },
//                 //     { myNestedKey: ['my', 'name', 'is', 'shahzeb'] },
//                 //     {
//                 //         myNestedKey: {
//                 //             keyName: 'mynestedKey3',
//                 //             type: "object"
//                 //         }
//                 //     },
//                 //     // {
//                 //     //     myNestedKeyDifferent: {
//                 //     //         keyName: 'mynestedKey3',
//                 //     //         type: "object"
//                 //     //     }
//                 //     // },
//                 // ]
//             },
//             /* Param 2: options */
//             {
//                 // replaceKeys: [['myKeyToReplace', 'keyToBeReplacedWith']],// data.key-to-be-replaced -> data.key-to-replace
//                 deleteKeys: ['myKeyToDelete'], // delete data.parts, data.qty
//                 // // ? array options are only focussed on the keys holding array values and hence it is nested
//                 array: {
//                     concatSeparator: '-',
//                     concatenateKeys: ['myArrayToConcatenate'],
//                     //     categorizeKeys: ['myArrayToCategorize'],
//                 },
//                 // objectKeysAndPullKeys: {
//                 //     myArrayOfObjectsWhoseNestedKeysToReplaceObject: 'myNestedKey'
//                 // },
//             },
//         ],
//         // Expected Output
//         {
//             myPrimary1: 'shahzeb',
//             myPrimary2: 420,
//             // Throwing error
//             // keyToBeReplacedWith: 'The key against this text should be changed to keyToBeReplacedWith',
//             myArrayToConcatenate: 'array-values, must, be, concatenated, therefore, values, must, be, of, primary, data-type',
//             // myArrayToCategorize: [
//             //     'lead screw',
//             //     'motor',
//             //     'mouse',
//             //     'motor',
//             //     'mouse',
//             //     'pen',
//             // ],
//             // myArrayOfObjectsWhoseNestedKeysToReplaceObject: [
//             //     'hello! this was the value in 1st "myNestedKey"',
//             //     ['my', 'name', 'is', 'shahzeb', '2nd', 'myNestedKey'],
//             //     {
//             //         keyName: 'myNestedKey3',
//             //         type: "object"
//             //     }
//             // ]
//         }
//         ],
//     ].forEach(
//         pair => {
//             const [inputParams, expectedResult] = pair;
//             // console.log('log output: ', summarizerNew2(...inputParams))
//             expect(summarizerNew2(...inputParams)).toMatchObject(expectedResult);
//         }
//     )
// });


