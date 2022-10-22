import { Grid } from "@mui/material";
import { arrayOfObjectsSummarize } from "./arrayOfObjectsSummarize";
import { arraySummarize } from "./arraySummarize";
import { isArray, isObject, isArrayOfStrings, isArrayOfObjects, isEmptyArray, deepClone } from "./reusable";

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
 * @param {{}} renderConfig - this should contain the info about deletion, renaming, customRendering of values
 * @returns {}
 */



export function summarizer({
    data = false,
    renderConfig = false,
    viewRawData = false,
}) {
    if (!data) throw new Error('No Data received in summarizer!')
    if (!renderConfig) throw new Error('No configuration received in summarizer!')

    data = deepClone(data);
    if (viewRawData) {
        return (
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
        )
    }


    const myModuleList = [
        { type: 'motor', id: 'J52SY350A' },
        { type: 'motor', id: 'J64SY700C' },
        { type: 'screw', id: 'M5x12' },
        { type: 'potentiometer', id: 'MSL-130-100-S-N' },
    ]

    renderConfig.deleteKeys.forEach(
        (key) => data.hasOwnProperty(key) && delete data[key]
    );

    renderConfig.renameKeys.forEach(
        ([key, newKey]) => {
            if (!data.hasOwnProperty(key)) return null;
            const temp = data[key];
            delete data[key];
            data[newKey] = temp;
        }
    );
    const result = Object.entries(data).map(([dataKey, dataValue]) => {
        // const type = getTypeOfValue(value)
        const type = 'primary';
        return (
            {
                label: dataKey,
                value: dataValue,
                type
            }
        )
    })
    console.log('data: ', data)
    console.log('result: ', result)

    return result

}
/**
 * Received:
 * {
 *  id: "myStringName",
 *  colData: {
 *      name: 'someName'
 *  },
 *  arrColData: [
 *      {name:'anna',qty:12},
 *      {name:'eros',qty:11},
 *  ]
 * }
 * 
 * Result:
 * [
 *  {type:'string', label:'id', value: 'myStringName' },
 *  {type:'object', label:'colData', value: {name: 'someName'} },
 *  {type:'arrayOfObjects', label:'arrColData', value: [{name:'anna',qty:12},{name:'eros',qty:11},] },
 * ]
 */