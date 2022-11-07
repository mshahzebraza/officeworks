
function getBase(number, divisor = 10) {
    return Math.floor(number / divisor)
}

function putInArr(number) {
    const myNumArr = []
    while (number !== 0) {
        myNumArr.push(number % 10);
        number = getBase(number);
    }
    return myNumArr;
}

function getNumeral(num, index) {
    if (num === 0) return '';
    const romanNumerals = {
        1: "I",
        5: "V",
        10: "X",
        50: "L",
        100: "C",
        500: "D",
        1000: "M",
    }
    const romanNumeralKeys = Object.keys(romanNumerals);
    const romanNumeralVals = Object.values(romanNumerals);
    const multiplier = Math.pow(10, index);
    const numDigitVal = num * multiplier;
    if (numDigitVal >= 4000) throw new Error('Values above 3999 not supported')
    const numeral = romanNumerals[numDigitVal];
    return numeral;
}



/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {

    let resArr = []
    const digitArrInv = putInArr(Number(s))

    digitArrInv.forEach(
        (digit, DP) => {
            if ([5, 1].includes(digit)) {
                // Case: If Digit is equal to 5 or 1
                const numeral = getNumeral(digit, DP)
                resArr.unshift(numeral)

            } else if ([9, 4].includes(digit)) {
                // Case: If Digit is equal to 4 or 9
                const preNum = 1
                const postNum = digit === 4 ? 5 : 10

                const preNumeral = getNumeral(preNum, DP)
                const postNumeral = getNumeral(postNum, DP)

                const numerals = [preNumeral, postNumeral]

                resArr.unshift(...numerals)

            } else /* if (digit!==0) */ {
                // Case: If Digit is equal to 1,2,3, 6,7,8
                const preNum = 1
                const postNum = (digit > 5) ? 5 : 0

                const preNumeral = getNumeral(preNum, DP)
                const postNumeral = getNumeral(postNum, DP)
                const numerals = Array(digit).fill(preNumeral).concat([postNumeral])
                resArr.unshift(...numerals)
            }
        }
    )
    resArr = resArr.join('')
    return resArr;
};



console.log(romanToInt(3999))
