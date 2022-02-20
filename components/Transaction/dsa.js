// loop through the 'str' and find the all indices at occurrence of 'subStr'
function findIndices(str, subStr) {
  let i = -1;
  let indices = [];
  while ((i = str.indexOf(subStr, i + 1)) >= 0) {
    indices.push(i);
  }
  return indices;
}



function formatter(str = 'xxxxx[001,005-010,015-095,099-115], oreo[01-12]') {
  // ' xxxxx[001,005-010,015-095,099-115],,,johny_009, oreo[01-12],shahzeb_001 ' // remove spaces, repetitions and trim
  // 'xxxxx[001,005-010,015-095,099-115],johny_009,oreo[01-12],shahzeb_001'
  // 'xxxxx,oreo,shahzeb_001'
  // '[001,005-010,015-095,099-115],[01-12]'
  // find Indices and make pairs
  const leftBktIndices = findIndices(str, '['); // [5, 40]
  const rightBktIndices = findIndices(str, ']');// [33, 46]


  const pairs =
    rightBktIndices.length > 0
    && leftBktIndices.length > 0
    && leftBktIndices.map(
      (leftIdx, idx) => {
        return [leftIdx, rightBktIndices[idx]]
      }
    ) // [[5, 33], [40, 46]] - pairs of indices of left and right brackets

  // convert the pairs to a flat array of indices
  const flatIndices = pairs.reduce((acc, cur, arr) => {
    return acc.concat(cur);
  }, []); // [5, 33, 40, 46]

  // check if all array numbers are sorted (Ensure no nested brackets)
  const isSorted = flatIndices.every(
    (num, idx, arr) => {
      return num > arr[idx - 1] || idx === 0
      // return num < arr[idx + 1] || idx === arr.length - 1 // Alternative
    }
  )
  isSorted ? console.log('Sorted') : console.log('Not Sorted')
  if (!isSorted) return;


  const strLength = str.length;
  let filteredStr = '';


  // Check if each of the str-char is outside the brackets
  const prefixStrArray = str.split('') // returns an array of chars
    .filter(
      (char, charIdx) => {

        let isCharValid = false;
        // Indices Loop
        for (let i = 1; i < flatIndices.length - 1; i += 2) {
          // Check if each comma index is greater than and equal to i'th (closing bracket index) and lesser than and equal to i+1'th (opening bracket index)
          // Ensuring that the comma is not between the brackets but outside of them
          if (
            charIdx > flatIndices[i] // ? if comma is greater than the closing bracket Index 'AND'
            && charIdx < flatIndices[i + 1] // ? if comma is lesser than the opening bracket Index 'OR'
            || charIdx > flatIndices[flatIndices.length - 1] // ? if comma is after the last bracket 'OR'
            || charIdx < flatIndices[0] // ? if comma is before the first bracket
          ) {
            isCharValid = true; // if any of the comma indices fails the condition, set isCharValid to false
          }

        }
        return isCharValid && char !== ' '; // return true if the comma index is valid && current char is not a 'space'
      }
    ) // returns a string of prefixes of the str - without the spaces
    .join('') // convert the array of prefixes chars to a string
    .split(','); // split the string into an array of comma separated strings

  const strCopy = str;
  prefixStrArray.forEach(
    (prefixStr, idx) => {
      strCopy.replace(prefixStr, '');
    }
  ) // remove the prefixes from the str






  const commaIndices = findIndices(str, ','); // contains an array of indices of all occurrences of commas

  // Comma Loop
  validCommaIndices = commaIndices.filter(
    (num, idx, arr) => { // num = current comma Index

      let isNumValid = false;
      // Indices Loop
      for (let i = 1; i < flatIndices.length - 1; i += 2) {
        // Check if each comma index is greater than and equal to i'th (closing bracket index) and lesser than and equal to i+1'th (opening bracket index)
        // Ensuring that the comma is not between the brackets but outside of them
        if (
          num > flatIndices[i] // ? if comma is greater than the closing bracket Index 'AND'
          && num < flatIndices[i + 1] // ? if comma is lesser than the opening bracket Index 'OR'
          || num > flatIndices[flatIndices.length - 1] // ? if comma is after the last bracket 'OR'
          || num < flatIndices[0] // ? if comma is before the first bracket
        ) {
          isNumValid = true; // if any of the comma indices fails the condition, set isNumValid to false
        }

      }
      return isNumValid; // return true if the comma index is valid
    }
  )







  const start = str.indexOf('[')
  const end = str.indexOf(']')

  // 1,5-10
  const range = str.split('-');
  const start = parseInt(range[0], 10);
  const end = parseInt(range[1], 10);
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}
