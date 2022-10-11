import * as Yup from 'yup'
import { getOf } from '../helpers/specific';


function checkDataType(testEl) {
    const elType = typeof (testEl)
    let result;

    if (elType === 'object') {
        // Array
        if (Array.isArray(testEl)) {
            result = 'array'
            // console.log('Array Input');
        } else if (testEl === null) {
            result = 'null'
            // console.log('Null Input');
        } else {
            result = 'object'
            // console.log('Object Input');
        }
    } else if (elType == 'undefined') {
        result = 'undefined'
        // console.log('Undefined Input');
    } else { // String & Number
        result = elType
        // console.log(elType);
    }
    return result;
}

function getObjectWithValuesAt(index, source, nestedKeysWrapper = false) {
    // Input: //? index:1, source: {x:['x1','x2'],y:['y1','y2']}
    // Output //? {x: 'x2', y: 'y2'}

    const responseObj = {};
    for (const key in source) {

        const [firstKey, ...nestedKeys] = key.split('.');

        if (!!nestedKeys.length) { // if nested keys exist
            const [secondKey, ...deepNestedKeys] = nestedKeys;
            if (!!deepNestedKeys.length) throw new Error('Multi-Nested keys are not supported yet');

            // if the first key is not defined already set it to {}
            responseObj[firstKey] = responseObj[firstKey] ?? {};
            responseObj[firstKey][secondKey] = source[key][index];


        } else { // if nested keys do not exist
            responseObj[firstKey] = source[key][index]
        }
    }

    // Wrap the nested keys in a nestedKeysWrapper object
    if (nestedKeysWrapper) {
        // check if any nested keys exist
        const wrappedResponseObj = Object.entries(responseObj).reduce(
            (acc, [key, value]) => {
                // check if the value is an object
                checkDataType(value) === 'object'
                    ? acc[key] = nestedKeysWrapper(value)
                    : acc[key] = value;
                return acc;
            }, []
        )
        return Object.fromEntries(wrappedResponseObj);
    }
    return responseObj;

}

function getOf(sourceObject, desiredDataKey) {
    // desiredDataKey === 'key2'
    // Input
    /* { 
        id: {key1:'',key2:'hello'} , 
        name: {key1:'',key2:'Jane Doe'} 
    } */
    // Output
    /* { 
        id: 'hello' , 
        name: 'Jane Doe' 
    } */

    const sourceEntries = Object.entries(sourceObject);
    /* 
    [ 
        ['id', {key1:'',key2:'hello'} ], 
        ['name', {key1:'',key2:'Jane Doe'} ] 
    ]
    */
    const reducedObject = sourceEntries.reduce(
        (prev, cur) => {
            const [sourceKey, sourceValue] = cur;
            prev[sourceKey] = sourceValue[desiredDataKey];
            return prev;
        }, {}
    )
    return reducedObject;
}

const inputConfig = {
    x: {
        isNested: true, // if field is nested then navigate through nested fields differently
        initialValue: {
            a: '',
            b: '',
        },
        validation: Yup.object().shape({
            a: Yup.string().required('Required'),
            b: Yup.string().required('Required')
        }),
        config: {
            a: {
                configPropName: 'mouse',
                configPropInventory: 5,
            },
            b: {
                configPropName: 'keyboard',
                configPropInventory: 12,
            },
        },
    }
}

getOf(inputConfig, 'initialValue')

/**
 * Final/Desired Result
 * 
 * initialValue: {
 *    x: {
 *      a: 'nested a',
 *      b: 'nested b',
 *    }
 *    
 * validation: {
 *    x: Yup.object(),shape({
 *      a: Yup.string().required('Required'),
 *      b: Yup.string().required('Required'),
 *    })
 * }
 *    
 *    
 */


/**
 * For Reference: 
 * nestedValidationObject : {
 *    a: Yup.string().required('Required'),
 *    b: Yup.string().required('Required')
 * }
 * 
 * 
 * Input Config: { 
 *    x: {
 *       isNested: true, // if field is nested then navigate through nested fields differently
 *       
 *       initialValue: {
 *          a: '',
 *          b: '',
 *       },
 *       validation: Yup.object().shape({ 
 *          a: Yup.string().required('Required'),
 *          b: Yup.string().required('Required')
 *       }), 
 *       config: {
 *           a : {
 *              configPropName: 'mouse',
 *              configPropInventory: 05,
 *           },
 *           b : {
 *              configPropName: 'keyboard',
 *              configPropInventory: 12,
 *           },
 *       }, 
 *    }
 * }
 *    
 *    
 */


const x = {
    "inv.total": [
        0,
        "validation",
        {
            "control": "input",
            "type": "number",
            "label": "Total Inventory",
            "name": "inv.total"
        }
    ]
}


const y = getObjectWithValuesAt(2, x, (val) => ({ o: val }));
console.log('res: ', y)


const p = getObjectWithValuesAt(1, x, (val) => { return { 'asd': val } })
