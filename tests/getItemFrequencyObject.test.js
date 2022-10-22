import { getItemFrequencyObject } from "../helpers/getItemFrequencyObject";

describe.each([
    {
        data: ['shahzeb', 'emma', 'kristine', 'leo', 'shahzeb'],
        expected: { shahzeb: 2, emma: 1, kristine: 1, leo: 1, }
    },
    {
        data: [1, 12, 81, 33, 92, 18, 2, 15, 12, 65, 0, 1],
        expected: { 1: 2, 12: 2, 81: 1, 33: 1, 92: 1, 18: 1, 2: 1, 15: 1, 65: 1, 0: 1, }
    }
])(
    'groups the string-items into an object and shows the quantity of each duplicate as its value',
    ({ data, expected }) => {
        test('test', () => {
            expect(getItemFrequencyObject(data)).toMatchObject(expected)
        })
    }
)