import { Grid } from "@mui/material";
import { arrayOfObjectsSummarize } from "./arrayOfObjectsSummarize";
import { arraySummarize } from "./arraySummarize";
import { isArray, isObject, isArrayOfStrings, isArrayOfObjects, isEmptyArray } from "./reusable";

/* Input for "summarizer" not "summarizerNew2" - may not be same for summarizerNew2
{
    refId: 'PO-001', //* String
    totalCost: '$1,000', //* String
    commaTags: ['tag1', 'tag2', 'tag3'], //* Array of Strings
    dailySalesRepeated: [100,100,200,150,200], //* Array of Strings
    parts: //* Array of Objects - required key is a string : 'name'
      [
        { name: "Ball Lead Screw" },
        { name: "Screw" },
        { name: "Screw" },
        { name: "Screw" },
      ]
  }
 */
/* Output: A Map
  [
    "refId": 'PO-001',
    "totalCost": '$1,000',
    commaTags: 'tag1, tag2, tag3', //* Array of Strings - concatenated option
    dailySalesRepeated: [ {item:100,qty:2}, {item:200,qty:2}, {item:150,qty:1}], //* Array of Strings: remove option
    parts: [{name: "Ball Lead Screw", qty: 1}, {name: "Screw", qty: 3}] //* Array of objects reqKey @ name
  ]
 */
/**
 * The function is used to graphically present a set of data (usually from an object) in key-value pairs.
 * The function offers multiple use-cases
 *
 *
 *
 * Use-Case-1: Partial Representation of Data
 *      The data may be "completely" or "partially" presented. In the latter case, the keys which are not meant to be shown are explicitly declared in the @param {deleteKeys}. These keys are deleted from the data-set before using it for data-representation.
 * Note: A duplicate data-set is created in the start to ensure that the deletion does not manipulate the original data-set.
 *
 *
 *
 * Use-Case-2: Name Change of data-keys
 *      Sometimes the data is stored against the keys with coded terminologies to save writing effort (e.g. tc for totalCost, initCode for initialization-code etc. ). This maybe be readable/understandable by the developer but its not very intuitive and that is why it must not be used for user-facing text.
 * This is why we may want to change the name of some 'keys' to another name before letting the summarizer component use the key to represent the data-set.
 * For this reason, @param {replaceKeys}. is used to pass in the array-list of [old-key , new-key] pairs to modify the old-key to new-key.
 *
 *
 *
 * Use-Case-3: Representation of Nested-Data
 *      Often we are greeted with multiple levels of nested data in out data-sets and it is really difficult to represent the nested data in the UI. The complexity of the situation is intensified due to the fact that the nested data may be present in many forms
 *
 * 1. Array of Strings - [a,x,y,z]
 *      possible requirement of concatenating the items into a single string e.g. 'a,x,y,z'
 *
 * 2. Array of Strings (contains potential duplicates) - [a,x,x,y,y,z]
 *      possible requirement of removing the duplicates and turning the [a,x,x,y,y,z] structure to
 * [ {item:a,qty:1} , {item:x,qty:2} , {item:y,qty:2} , {item:z,qty:1} ]. This structure helps to remove duplicates and, at the same time, maintains a count of repetition for each item
 *
 * 3. Array of Objects (contain potential duplicates)
 *      Sometimes the array may simply contain many items of different properties for example in an array of person each item is an object containing many properties like bloodGroup, height, complexion, age etc.
 *      possible requirement is to select on of these properties as the focal-property (aka reqKey) and de-dupe the items against the focal-key and, at the same time, maintain a count of repetition of focal-key for each item.
 * Note: It may be noted that other properties are removed in the process of de-duping
 *
 * Possible Input for such a case:
 * @data: [
 *      { name: "Ball Lead Screw", material:'40Cr' },
 *      { name: "Screw", material:'Al' },
 *      { name: "Screw", material:'SS' },
 *      { name: "Screw", material:'Al 2024' },
 * ]
 * @focal-key: 'name'
 * Output for such input would be
 * [{name: "Ball Lead Screw", qty: 1}, {name: "Screw", qty: 3}]
 *
 *
 *
 * Input Types for "data" - multiple types of data-fields (values-of-keys) can be passed into the object:-
 * 1. key(string): value(primary-data-type)
 * 2. key(string): value(reference-data-types)
 *
 * Everything is simple and understandable with "primaries". However, "reference-data-types" bring some problems to our attention.
 * Let's see what type of ref-data-types are usually witnessed:
 *
 * 1-a. Array of Strings
 * { fruits: ['banana','apple','pear'] }
 * this type of data is best represented in two
 *
 *
 * @param {{}} data
 * @param {{}} options
 * @returns {}
 */



export function summarizerNew2(
    {
        data = {}, options = {
            // ? following 2 keys are the data-keys, and must be considered as data options
            // delete the keys
            deleteProperties: [],
            // rename the keys
            renameProperties: [],
            // manipulate the values (array) against the keys and return a concatenated string
            concatArrProperties: [{ name: 'keyName' }],

            // manipulate the values (array) against the keys and return an array of objects
            ctgArrProperties: [{ name: 'keyName' }],

            // manipulate the values (array of objects) against the keys and return an array of nested values against a specific key
            pullDataArrObjProperties: [{ objKey: 'arrObjDataKey', name: 'specific_Nested_Key' }],
            // manipulatePropertiesArrPrimary: [{name}],
            // manipulatePropertiesArrReference: [],

            replaceKeys: [ /* ['key-to-be-replaced', 'key-to-replace'] */],
            deleteKeys: [ /* 'parts', 'qty' */],

            // arrDataConcat:[],
            // arrDataCtg:[],
            // arrObjDataPull:[],

            // ? array options are only focussed on the keys holding array values and hence it is nested
            array: {
                // temporary solution: ideally separator should be allowed to be different for each array
                concatSeparator= ', ',
                concatenateKeys: [] = [ /*
                 ['key-1-values-to-concatenate', 'concatSeparatorForKey1'],
                 ['key-2-values-to-concatenate', 'concatSeparatorForKey2'],
            */],
                categorizeKeys: [ /* 'key-3-values-to-categorize' */] = [],
            } = {},
            objectKeysAndPullKeys: { /* key-whose-values-to-categorize: focal-value-of-to-be-pulled */ } = {},
        }
    }
) {
    console.log('log 1 - options: ', options);
    console.log('log 1 - data: ', data);

    const renameKeys = [['oldKeyName', 'newKeyName']]
    const deleteKeys = ['keyToDelete1', 'keyToDelete2']
    const concatenatePrimary = []
    const categorizePrimary = []
    const pullAndReplaceNested = []

    const customJsxForItems = ({ items: [] }) => {
        return (
            <Grid container >
                <Grid item container xs={12} >
                    <Grid item xs={2}>Type</Grid>
                    <Grid item xs={2}>ID</Grid>
                    <Grid item xs={2}>Price</Grid>
                    <Grid item xs={6}>Remarks</Grid>
                </Grid>
                {
                    items.map(item => {
                        return (
                            <Grid container >
                                <Grid item xs={2}>Type</Grid>
                                <Grid item xs={2}>ID</Grid>
                                <Grid item xs={2}>Price</Grid>
                                <Grid item xs={6}>Remarks</Grid>
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    }

    const myModuleList = [
        { type: 'motor', id: 'J52SY350A' },
        { type: 'motor', id: 'J64SY700C' },
        { type: 'screw', id: 'M5x12' },
        { type: 'potentiometer', id: 'MSL-130-100-S-N' },
    ]
    const myData = {
        id: 'hello my id',
        unrelated: 'adskodao adosk a',
        source: 'foreign',
        // items: [
        //     { id: 'J64SY700C', qty: 25, unitPrice: 400, currency: 'USD' }
        // ]
    }
    const myConfig = {
        renameKeys: [['id', 'Product ID']],
        deleteKeys: ['unrelated'],
        // concatenatePrimary: [],
        // renderCustomComponents: [
        //     ['items', customJsxForItems]
        // ]
    }

    myConfig.deleteKeys.forEach(
        (key) => myData.hasOwnProperty(key) && delete data[key]
    );
    myConfig.renameKeys.forEach(
        ([key, newKey]) => {
            if (!myData.hasOwnProperty(key)) return null;
            const temp = data[key];
            delete data[key];
            data[newKey] = temp;
        }
    );

    return Object(myData).entries.map(([dataKey, dataValue]) => (
        <Grid container>
            <Grid item xs={4}>{dataKey}</Grid>
            <Grid item xs={8}>{dataValue}</Grid>
        </Grid>
    ))

    const concatSeparator = '--';
    const arrDeleteKeys = options.deleteKeys; //? these keys will be deleted

    // NOT WORKING
    const replaceKeysMap = new Map(options?.replaceKeys); //? these key-names will be replaced
    const arrCtgKeys = options?.array?.categorizeKeys; //? will always be categorized
    const arrConcatKeys = options?.array?.concatenateKeys; //? will always be categorized
    const objectAndFocalKeySet = options?.objectKeysAndPullKeys; //? will always be categorized after fetching the specified nested key


    // ObjectKeysWithFocalKeyMap
    // ObjectAndFocalKeys - a collection of keys-values where keys point to the properties of the data-object that are Objects and values point to the nested key to be pulled from that object.
    // Delete unwanted keys if any
    arrDeleteKeys.forEach(
        (key) => data.hasOwnProperty(key) && delete data[key]
    );

    const mapArrResult = Object.entries(data)
        .reduce(
            // data-key, data-value
            (acc, [dataKey, val], index /* , arr */) => {
                let returnValue;

                // *String
                // ! why not just check if its a string
                if (!isArray(val) && !isObject(val)) {
                    // console.log('index: ', index, 'key: ', key, '----  String');
                    returnValue = val;
                }

                // *Array of Strings
                if (isArrayOfStrings(val)) { //"of strings"

                    /**
                        * FLOW:
                        * Check: if the key is defined for either concatenation or categorization operation
                        * Check: if the key is not defined in concatenation or categorization operation
                        * Concat the concat-keys' values
                        * Categorize the ctg-keys' values
                        */
                    returnValue = arraySummarize(arrConcatKeys, dataKey, arrCtgKeys, val, concatSeparator);

                }

                // *Array of Objects 
                if (isArrayOfObjects(val)) { //"of objects"
                    /**
                        * FLOW:
                        * Check: if the key is defined for categorization operation
                        * Check: if the focal key is present in all the object entries
                        * Return the each object with object[focalKey] in the array
                        */
                    // ObjectAndFocalKeys - a collection of keys-values where keys point to the properties of the data-object that are Objects and values point to the nested key to be pulled from that object.
                    const focalNestedKey = objectAndFocalKeySet[dataKey];
                    if (!focalNestedKey)
                        throw new Error(`Define the focal-key for categorization of array-of-objects for data-key: "${dataKey}"`);

                    returnValue = arrayOfObjectsSummarize({
                        data: val,
                        pullKey: focalNestedKey
                    });
                }

                // *Array with zero length
                if (isEmptyArray(val)) {
                    returnValue = [];
                }

                // *Object 
                // TODO: review and add support for nested objects of strings/numbers
                if (isObject(val)) {
                    returnValue = val;
                }

                // *Data key replacement
                const currentKeyReplacement = replaceKeysMap.get(dataKey);
                if (!!currentKeyReplacement) { dataKey = currentKeyReplacement; }

                acc.push([dataKey, returnValue]);
                return acc;
            }, []);

    const result = Object.fromEntries(mapArrResult);
    console.log('log 1 - result: ', result);

    return result;

}
