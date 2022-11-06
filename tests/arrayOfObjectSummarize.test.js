import { arrayOfObjectsSummarize } from "../helpers/arrayOfObjectsSummarize";


describe.each(
    [
        {
            data: [
                { myPullKey: 'hello1' },
            ],
            pullKey: 'myPullKey',
            expected: { hello1: 1, },
            testTitle: `replaces & categorizes parent property with nested property`
        }
    ]
)(
    'Summarize Array-of-objects against a nested-key whose value a primary data-type',
    ({ data, pullKey, expected, testTitle }) => {
        test(testTitle, () => {
            expect(arrayOfObjectsSummarize({ data, pullKey }))
                .toMatchObject(expected);
        });
    }
);
