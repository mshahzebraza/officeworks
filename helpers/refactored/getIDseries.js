import { suffixTranslator, setDigits } from "./reusable";




export function getIDseries(str = 'preO-0001, preA-[01,005-075,089-115(2)] ,,, preB-009[1], preC-[01-12]-sufC,preD-001') {

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
                        accCopy.idIndex.str = accCopy.idIndex.str?.concat(cur);
                    } else if (accCopy.nest === 2) {
                        accCopy.idIndex.length = accCopy.idIndex.length.concat(cur);
                    }
                }

                // *Repetition Block Check - Checks for repeated numbers and letters (Placing on top would stop normal repeated letters too)
                if (arr[idx - 1] === arr[idx]) { return accCopy; };


                // *Digits Block / Small Brackets
                cur === '(' && accCopy.nest++;
                cur === ')' && accCopy.nest--;

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

                // *Closing Block / Comma Block
                if (cur === ',' || idx === arr.length - 1 /* ,(idx === arr.length - 1 && cur===']') */) {
                    if (accCopy.nest === 0) { // no nesting at current level => finalize the part ID
                        const prefix = accCopy.pre /* .join('') */;
                        const ids = accCopy.idIndex.list;
                        const digits = parseInt(accCopy.idIndex.length) || 3;
                        const suffix = accCopy.suf;

                        (ids.length > 0)
                            ? ids.forEach(itemIndex => {
                                const newIdString = [prefix, setDigits(itemIndex, digits), suffix].join('');
                                accCopy.result.push(newIdString.toUpperCase());
                            }
                            )
                            : accCopy.result.push(prefix);

                        accCopy.pre = '';
                        accCopy.suf = '';
                        accCopy.idIndex.length = '';
                        accCopy.idIndex.list = [];


                        // return accCopy;
                    } else if (accCopy.nest === 1) {
                        accCopy.idIndex.str = accCopy.idIndex.str?.concat(cur);
                    } else if (accCopy.nest === 2) {
                        alert('"," not allowed in between "(" and ")"');
                    }
                }


                // if (idx === arr.length - 1) console.log('final result', accCopy.result);
                return accCopy;
            },
            {
                pre: '',
                suf: '',
                idIndex: {
                    length: '',
                    list: [],
                    str: ''
                },
                nest: 0,
                result: []
            }
        ).result;

}
