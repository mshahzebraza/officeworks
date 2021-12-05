export function defaultPairMaker(defaultKeys) {
  return defaultKeys.map(curKey => {
    return { field: curKey.field, value: '', level: 0, req: true, options: curKey.dataList }
  })
}

const dummyData = [
  {
    "field": "number",
    "value": "75",
    "level": 0
  },
  {
    "field": "Dog",
    "value": "Bubbly",
    "level": 1
  },
  {
    "field": "gf",
    "value": "Lizzie",
    "level": 2
  },
  {
    "field": "gasdf",
    "value": "afdsg",
    "level": 3
  },
]

// console.log(multiFormDataTranslator(dummyData));

// Sublevels, for now, are treated as different categories on the same level. This can be changed by nesting multiple sublevels inside each other.
export function multiFormDataTranslator(data, subLevels = []) {
  let newData = {};
  subLevels.length > 0 && subLevels.forEach((sub, subId) => {
    newData[`${sub}`] = {}
  });

  data.forEach((pair, pairIndex) => {

    // console.log(newData[`${subLevels[pair.level - 0]}`]);
    if (pair.level === 0) {
      newData[`${pair.field}`] = pair.value
    }
    if (pair.level > 0) {
      // Because first subCategory is at level 0 and the subCategory array doesn't include the base level.
      newData[`${subLevels[pair.level - 1]}`][`${pair.field}`] = pair.value
    }

  });

  return newData;
}
