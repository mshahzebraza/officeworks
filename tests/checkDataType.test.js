import { checkDataType } from "../helpers/refactored/checkArrType";


describe.each(
    [
        { data: 'name', expected: 'string' },
        { data: 26, expected: 'number' },
        { data: [], expected: 'array' },
        { data: {}, expected: 'object' },
        { data: null, expected: 'null' },
        { data: undefined, expected: 'undefined' }
    ]
)(
    'Checks data-type of multiple types of data input',
    ({ data, expected }) => {
        test(`Input: ${data}`, () => {
            expect(checkDataType(data))
                .toBe(expected);
        });
    }
)
