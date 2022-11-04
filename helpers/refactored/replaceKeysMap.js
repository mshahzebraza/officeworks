/* Input
mapData =[
  keyA: 'valueA',
  keyB: 'valueB',
],
replaceOptions = [
  ['keyA', 'newKeyA'],
  ['keyB', 'newKeyB']
]
 */
/* Output: A Map
  [
    'newKeyA': 'valueA',
    'newKeyB': 'valueB'
  ]
 */
// ? Replaces the keys of a Map


export const replaceKeysMap = (mapData = [], replaceOptions = []) => {
    // Making sure the mapData is an Array of Arrays and not a Map
    mapData = [...mapData];

    replaceOptions.forEach(
        ([key, newKey]) => {
            // generate an array of keys from a duplicated data
            const keyArr = [...new Map(mapData).keys()];

            const matchIdx = keyArr.findIndex(
                el => el === key
            );
            mapData[matchIdx]?.[0] = newKey;
        }
    );
    return mapData;
};
