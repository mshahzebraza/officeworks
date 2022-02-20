// *Purpose is to devise a method to create partIDs of a transaction from a mnemonic phrase input

import { setDigits } from "../helpers/reusable";



formatter('xxxxx[001,005-010,015-095,099-115], oreo[01-12]')


function formatter(str = 'preO-0001, preA-[01,005-075,089-115(2)] ,,, preB-009[1], preC-[01-12]sufC,preD-001') {

  return str.replaceAll(' ', '')
    .split('')
    .reduce(
      (acc, cur, idx, arr) => {
        const accCopy = Object.assign({}, acc);


        // *Indices/Letter Block
        if (cur !== ',' && cur !== '[' && cur !== ']' && cur !== '(') {

          if (accCopy.nest === 0) {
            (arr[idx - 1] === ']' || accCopy.suf.length > 0) ?
              accCopy.suf = accCopy.suf.concat(cur)
              : accCopy.pre = accCopy.pre.concat(cur);
          } else if (accCopy.nest === 1) {
            accCopy.idIndex.str = accCopy.idIndex.str?.concat(cur)
          } else if (accCopy.nest === 2) {
            accCopy.idIndex.length = accCopy.idIndex.length.concat(cur)
          }
        }

        // *Repetition Block Check - Placed after Indices/Letter block to allow repeated numbers and letters
        if (arr[idx - 1] === arr[idx]) { return accCopy };


        // *Digits Block / Small Brackets
        cur === '(' && accCopy.nest++
        cur === ')' && accCopy.nest--

        // *Closing Block / Comma Block
        if (cur === ',' || idx === arr.length - 1) {

          if (accCopy.nest === 0) { // no nesting at current level => finalize the part ID
            const prefix = accCopy.pre/* .join('') */;
            const ids = accCopy.idIndex.list;
            const digits = parseInt(accCopy.idIndex.length) || 3;
            const suffix = accCopy.suf;

            (ids.length > 0)
              ? ids.forEach(itemIndex => {
                const newIdString = [prefix, setDigits(itemIndex, digits), suffix].join('')
                accCopy.result.push(newIdString)
              }
              )
              : accCopy.result.push(prefix);

            accCopy.pre = '';
            accCopy.suf = '';
            accCopy.idIndex.length = '';
            accCopy.idIndex.list = [];


            // return accCopy;
          } else if (accCopy.nest === 1) {
            accCopy.idIndex.str = accCopy.idIndex.str?.concat(cur)
          } else if (accCopy.nest === 2) {
            alert('"," not allowed in between "(" and ")"')
          }
        }

        // *Large Brackets / IDindex Block
        if (cur === '[') {
          accCopy.nest++;
          accCopy.nest > 1 && alert('Nesting Is Not allowed');
        }
        if (cur === ']') {
          accCopy.idIndex.list = suffixTranslator(accCopy.idIndex.str); // transform idIndex.str into a range.
          accCopy.idIndex.str = ''; // reset idIndex.str
          accCopy.nest--;
        }


        // if (idx === arr.length - 1) console.log('final result', accCopy.result);

        return accCopy;
      },
      {
        pre: '',
        suf: '',
        idIndex: {
          length: '', // length of the id index
          list: [],
          str: ''
        },
        nest: 0,
        result: []
      }
    ).result

}


// "01,005-007" - [1,5,6,7]  
function suffixTranslator(
  str = "01,005-075,089-115",
  separator = ',',
  seriesSymbol = '-'
) {
  const separated = str.split(separator); // [01,005-075,089-115] 

  const result = separated.reduce(
    (acc, cur, idx, arr) => {

      // "2-5" => 2,3,4,5 => (5-3)+1 = 4
      const curSplit = cur.split(seriesSymbol); // "005-075" => ["005","075"], "089-115" => ["089","115"]

      if (curSplit.length === 1) {
        // No series
        return [...acc, parseInt(...curSplit)]

      } else if (curSplit.length === 2) {
        // contains series //// if the string contains a dash, then it is a series
        return [
          ...acc,
          ...range(
            parseInt(curSplit[0]),
            parseInt(curSplit[1]))
        ]

      } else if (curSplit.length > 2) {
        // Multiple seriesSymbols (-) found
        alert('Multiple seriesSymbols (-) found');
      }
    }, []
  )

  return result
}



// Sequence generator function (commonly referred to as "range")
const range = (start, stop, step = 1) => Array.from(
  { length: (stop - start) / step + 1 }, // *defining the length property of the Array as Array is a special object with a length property equal to number of elements in the array
  (_, i) => start + (i * step)
);

// Find the all indices at occurrence of 'subStr' in 'str'
function findIndices(str, subStr) {
  let i = -1;
  let indices = [];
  while ((i = str.indexOf(subStr, i + 1)) >= 0) {
    indices.push(i);
  }
  return indices;
}

// merges two arrays of equal length to a single array, making pairs of elements at same index.
function mergeToPairs(arr1 = [], arr2 = []) {
  arr2.length > 0
    && arr1.length > 0
    && arr1.map(
      (leftIdx, idx) => {
        return [leftIdx, arr2[idx]]
      }
    )
}

// returns a single array with pairs of indices at occurrence of two enclosing strings
function getIndicesPairs(str = '[johny],[shahzeb]', matchStr1 = '[', matchStr2 = ']') {
  /* const leftBktIndices = findIndices(str, matchStr1); // [1, 9]
  const rightBktIndices = findIndices(str, matchStr2);// [7, 17]
  return mergeToPairs(leftBktIndices, rightBktIndices) // [[1, 7], [9, 17]]
   */
  return mergeToPairs(
    findIndices(str, matchStr1),// [0, 8]
    findIndices(str, matchStr2) // [6, 16]
  ) // [[0, 6], [8, 16]]
}

// returns the string enclosed in two enclosing strings
function getEnclosedStr(str = '', enclosersIndexPair = ['startIndex', 'endIndex']) {

  return str.substring(enclosersIndexPair[0] + 1, enclosersIndexPair[1]);

}


// returns the string enclosed in all the pairs of enclosing strings
function getEnclosedStrArr(str = '', IndexPairArray = []) {
  return IndexPairArray.map(indexPair => getEnclosedStr(str, indexPair));
}


// ? NOT USED
function isArrSorted(arrTest = []) {
  return arrTest.every(
    (num, idx, arr) => {
      return num > arr[idx - 1] || idx === 0
      // return num < arr[idx + 1] || idx === arr.length - 1 // Alternative
    }
  )
}

// getOpenInstances([2,5,9],[[3,4],[9,15]]) => [2,5]
// Param 01: indices of target
// Param 02: Pairs of enclosing string indices.
// Result: All the comma indices outside the enclosing string indices.
function getOpenInstances(targetIndices, enclosingIndexPairs) {

  return targetIndices.filter(
    (num, idx, arr) => { // num = current comma Index

      let isNumValid = false;
      // Indices Loop
      for (let i = 0; i < enclosingIndexPairs.length - 1; i += 2) {

        if (
          num > enclosingIndexPairs[i][1]
          // ? if comma is greater than end of closing bracket Index 'AND'
          && num < enclosingIndexPairs[i + 1][0]
          // ? if comma is lesser than start of opening bracket Index 'OR'
          || num > enclosingIndexPairs[enclosingIndexPairs.length - 1][1]
          // ? if comma is after last bracket pair's end Index 'OR'
          || num < enclosingIndexPairs[0][0]
          // ? if comma is before first bracket pair's start index
        ) {
          isNumValid = true; // if any of the comma indices fails the condition, set isNumValid to false
        }

      }
      return isNumValid; // return true if the comma index is valid
    }
  )
}


