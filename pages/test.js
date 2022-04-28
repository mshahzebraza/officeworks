import { checkArrType, checkDataType, concatStrings, removeDuplicateAndCategorize } from "../helpers/reusable";

/* Input

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
function summarizer(
     data = {},
     arrOptions = [/* 
     [
         ['commaTags', '___' ], //? concatenate AoS with ___ as separator
         ['dailySalesRepeated', 'removeUnique'] //? categorize AoS
          //? Other than this, every AoS will be concatenated with ', '
          ['AoO_name', 'objKeyToCategorize']
          //? And every AoO, will first be reduced to AoS (strings being the 'objKeyToCategorize'), then will be categorized 
       ] */
     ],
     objOptions = false

  // * indicates at parent key of objects, the child keys to be used
  /* objOptions example:
    [
      ['parts', 'name'],
      ['modules', 'nomenclature']
    ]
  */,
     objDeleteKeys = false
     /* 
       objDeleteKeys example:
       [ 'index', '_id']
      */
) {

     // Delete unwanted keys if any
     if (objDeleteKeys) {
          objDeleteKeys.forEach(
               (key) => data.hasOwnProperty(key) && delete data[key]
          )
     }

     // Assuming that the arrOptions & objOptions are both array of arrays with 2 elements
     const arrOptionsMap = arrOptions && new Map(arrOptions);
     const objOptionsMap = objOptions && new Map(objOptions);

     const result = Object.entries(data)
          .reduce(
               (acc, [key, val]/* , index, arr */) => {
                    let returnValue;

                    const valDataType = checkDataType(val);

                    // *String
                    if (valDataType !== 'array' && valDataType !== 'object') {
                         returnValue = val;
                    }

                    // *Array of Strings
                    if (valDataType === 'array' && checkArrType(val) === 'string') { //"of strings"

                         /* //? What is the purpose of this?
                         There are two ways to transform the array values.
                              1. concatenate the values
                              2. remove the unique values
                              - To control the choice of the transformation, key-value pair for each data-field is passed to the function.
                              - Each key-value pair is an array of two elements.
                              - Each key indicates the name of data-field. and Each value indicates the transformation choice for that data-field.
                              - By Default, the transformation choice is concatenation for each data-type and the default separator is ','. 
                              - However, if it is intended to change the separator, from ',' to '||', then the key-value pair should be passed to the function as arrOptions.
                         
                              Let's say that the data contains three arrays of strings. X, Y, Z. 
                              We want X's items to be concatenated by ',' by default. 
                              But we want Y's items to be concatenated by '||'. 
                              As per the Z's items, we don't want them concatenated, we want them categorized.
                              
                              Thereby we pass the following argument to arrOptions:
                              [
                                   ['commaTags', '___' ], //? Here, we intend to concatenate array at key: 'commaTags' with concatSeparator: '___'
                                   ['dailySalesRepeated', 'removeUnique'] //? Here, we intend to categorize array at key: 'dailySalesRepeated'
                                        ? Here, For all the other keys, we concatenate (default array transformation choice) with ',' (default separator)
                              ]

                          */


                         /* //? How is logic executed in this block?
                         Does current dataField-key matches any key in the arrOptions (is arrOptions for the current dataField-key is specifically defined?)
                              - If Not: use the "defaultConcatSeparator" to "concatenate" the values
                              - If Yes: check if the value against that key is 'removeUnique'
                                   -- If NO: define the value against key as 'overrideConcatSeparator, use the "overrideConcatSeparator" to "concatenate" the values
                                   -- If YES: DO not concatenate the values; remove the duplicates instead
                         */

                         // If the key is in the arrOptionsMap, then value against that key would be the 'concatenateSeparator', unless the value is 'removeUnique'
                         const arrOptionDefinedForKey = arrOptionsMap.get(key) || ', ';
                         const shouldConcatenate = arrOptionDefinedForKey !== 'removeUnique';
                         // Either concatenate or remove-duplicates-and-categorize the items
                         returnValue = shouldConcatenate
                              ? concatStrings(val, arrOptionDefinedForKey)
                              : removeDuplicateAndCategorize(val);
                    }

                    // *Array of Objects - required key is a string : 'name'
                    if (valDataType === 'array' && checkArrType(val) === 'object') { //"of objects"


                         /* //? What happens in this block?
                              First we want to reduce the "array of objects" to "array of strings". We do this by fetching the "selectedKey" out of each "object of the array"
                              Upon receiving an AoO, we need to check if the there is a "selectedKey" defined for the the AoO-key.
                                   - If Not, then return false against the AoO-key, as no key is selected to be categorized
                                   - If true, then do 2 things:
                                        - Replace the AoO against the AoO-key with an AoS (where the string is the value of selectedKey)
                                        - Categorize the AoS
                              */

                         const selectedKeyToCategorize = arrOptionsMap.get(key);
                         if (!selectedKeyToCategorize) return acc // Don't bother to return anything at all against the current-data-key, if no key is selected from the objects in AoO

                         returnValue = removeDuplicateAndCategorize(
                              val.map(AoOitem => AoOitem[selectedKeyToCategorize])
                              // filter only the required key'values from the each element of array of objects and return an array of strings
                         )


                         // check if curKey matches any of the keys in the objOptionsMap otherwise return false
                         // filter only the required key from the array of objects into an array of strings
                         if (objOptions) {
                              // TODO: Review the logic, it looks too similar to AoO logic
                              // const selectedKeyToCategorize = objOptionsMap.get(key);
                              console.error('Manual: I didn\'t think that is really used')

                              returnValue =
                                   [...objOptionsMap.keys()].includes(key)
                                        ? removeDuplicateAndCategorize(
                                             val.map(el => el[objOptionsMap.get(key)]) // filter only the required key'values from the each element of array of objects and return an array of strings
                                        )
                                        : false;
                         } else {
                              returnValue = false;
                         }


                    }

                    if (valDataType === 'array' && val.length === 0) {
                         returnValue = [];
                    }

                    // TODO: Add support for nested objects of strings/numbers
                    acc.push([key, returnValue]);
                    return acc;
               }, [])

     return result

}


// create a page component
const Page = () => {

     console.log(
          summarizer(
               {
                    refId: 'PO-001', //* String
                    totalCost: '$1,000', //* String
                    commaTags: ['tag1', 'tag2', 'tag3'], //* Array of Strings
                    // dailySalesRepeated: [100, 100, 200, 150, 200], //* Array of Strings
                    // parts: //* Array of Objects - required key is a string : 'name'
                    //      [
                    //           { name: "Ball Lead Screw" },
                    //           { name: "Screw" },
                    //           { name: "Screw" },
                    //           { name: "Screw" },
                    //      ]
               }
               , [['commaTags', 'removeUnique']]
          )
     )


     return (
          <div className="container">
               <h1>Test Page</h1>
          </div>
     )
}

export default Page;