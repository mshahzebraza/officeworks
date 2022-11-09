import { listOfModuleTypes } from "../client/constants/listOfModuleTypes"
import { attachModuleTypes } from "../helpers/specific"

describe.each([
    {
        testStatement: 'comparing the "id" fields of moduleData and moduleTypes',
        moduleTypesList: listOfModuleTypes,
        moduleDataCollection: [
            { id: 'J52SY350A' },
            { id: 'J64SY700C' },
            { id: 'M5x12' }
        ],
        expected: [
            { id: 'J52SY350A', type: 'motor' },
            { id: 'J64SY700C', type: 'motor' },
            { id: 'M5x12', type: 'screw' }
        ]
    },
    {
        testStatement: 'comparing "itemModel" key of moduleData with "id" key of moduleTypes',
        moduleTypesList: listOfModuleTypes,
        moduleDataCollection: [
            { itemModel: 'J52SY350A' },
            { itemModel: 'J64SY700C' },
            { itemModel: 'M5x12' }
        ],
        searchKeys: ['itemModel', 'id'],
        expected: [
            { itemModel: 'J52SY350A', type: 'motor' },
            { itemModel: 'J64SY700C', type: 'motor' },
            { itemModel: 'M5x12', type: 'screw' }
        ]
    },
    {
        testStatement: 'set a fallback module type if the moduleID is not found in the module Types',
        moduleTypesList: [],
        moduleDataCollection: [
            { id: 'J52SY350A' },
        ],
        expected: [
            { id: 'J52SY350A', type: 'No Type Found' }
        ]
    },
])(
    'fetch the module-type of a each module in the list and insert the type property in each module based on the matching moduleTypeData',
    ({
        testStatement = 'test',
        moduleTypesList,
        moduleDataCollection,
        searchKeys,
        expected
    }) => {
        test(testStatement, () => {
            expect(attachModuleTypes(moduleDataCollection, moduleTypesList, searchKeys))
                .toMatchObject(expected)
        })
    }
)