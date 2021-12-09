import { addObjectPair } from './reusable'
/* 
Input: [
  {
    field: 'label01' , 
    req: true , 
    isFixed: true ,
    defaultValue: 'someDefaultValue' , // this key will not be present in the output object but it overrides the 'value' key if-it-is-present 
    dataList : [
      'option01_forLabel01',
      'option02_forLabel01'
    ] 
  },
  ...
]
 */

/* 
Output:  [
  {
    field: 'label01',
    value: '', ( OR 'someDefaultValue' ?? !!defaultValue )
    level: 0,
    isFixed: (depends-on-the-isFixed-passed), 
    req: (depends-on-the-req-passed), 
    // for default fields passed in the component this is the case.
    // Can be changed to be there only if 'req' is passed down.
    options: [
      'option01_forLabel01',
      'option02_forLabel01'
    ],
    fixedValue: (depends-on-the-fixedValue-passed)
  }
  ,
  ...
]
 */

export function defaultPairMaker(defaultKeys) {
  return defaultKeys.map(curKey => {
    return {
      field: curKey.field,
      value: curKey.defaultValue ? curKey.defaultValue : '',
      // defaultValue: '',
      level: 0,
      isFixed: !!curKey.isFixed,
      req: !!curKey.req,
      options: curKey.dataList,
    }
  })
}

// const dummyData = [
//   {
//     field: "number",
//     value: "75",
//     level: 0 
//   },
//   {
//     field: "Dog",
//     value: "Bubbly",
//     level: 1 // this can be >0 only if the corresponding subLevel provided
//   },
//   {
//     field: "gf",
//     value: "Lizzie",
//     level: 2
//   },
//   {
//     field: "gasdf",
//     value: "afdsg",
//     level: 3
//   },
// ]

// console.log(multiFormDataTranslator(dummyData));

// Sublevels, for now, are treated as different categories on the same level. This can be changed by nesting multiple sublevels inside each other.
/* 
    Input-Item: {
      field : 'fistName' , // decides the 'key-name' of POitem-object
      value: 'Barry Allen', // decides the 'value' of POitem-object
      level: 0, // controls the nesting level of the pair in the item-object
      // ONLY IF THE NESTING IS ALLOWED BY SPECIFYING A SUB-CATEGORY in the second argument of the multiFormDataTranslator.
      // the parameters of the 2nd argument must be an array containing all the sub-categories OTHERWISE the level should always be 0

      // REST OF THE KEYS BELOW ARE NOT IMPORTANT
      isFixed,
      req,
      options: [ ... ]
    }
*/
/* 
    Output-Item: {
      fistName : 'Barry Allen'
    }
*/
export function multiFormDataTranslator(data, subLevels = []) {
  let newData = {};
  subLevels.length > 0 && subLevels.forEach((sub, subId) => {
    newData[`${sub}`] = {}
  });

  data.forEach((pair, pairIndex) => {

    // console.log(newData[`${subLevels[pair.level - 0]}`]);
    if (pair.level === 0) {
      newData = addObjectPair(newData, [pair.field, pair.value])
    }
    if (pair.level > 0) {
      // Because first subCategory is at level 0 and the subCategory array doesn't include the base level.
      newData[`${subLevels[pair.level - 1]}`][`${pair.field}`] = pair.value
    }

  });
  // console.log('newData', newData);
  return newData;
}


//generates random id;
export function guid() {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}



// Input: ['s','s','y','y','y','z']
/* 
Output: [
  {item:'s', qty: 2},
  {item:'y', qty: 3}
  {item:'z', qty: 1}
]
 */
export function repeatQtyList(list) {
  let result;
  if (list.length === 0) {
    result = []
  } else {

    result = list.reduce((prev, cur, arr) => {

      // Check duplicate
      const duplicateIndex = prev.findIndex((prev) => prev.item === cur)

      // No Duplicate
      if (duplicateIndex === -1) {
        prev.push(
          { item: cur, qty: 1 }
        )
      };

      // Found Duplicate
      if (duplicateIndex >= 0) {
        prev[duplicateIndex].qty++;
      };

      return prev

    }, [])
  }

  return result;
}