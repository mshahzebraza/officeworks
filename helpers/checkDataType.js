

export function checkDataType(testEl) {
    const elType = typeof (testEl);
    let result;

    if (elType === 'object') {
        // Array
        if (Array.isArray(testEl)) {
            result = 'array';
            // console.log('Array Input');
        } else if (testEl === null) {
            result = 'null';
            // console.log('Null Input');
        } else {
            result = 'object';
            // console.log('Object Input');
        }
    } else if (elType == 'undefined') {
        result = 'undefined';
        // console.log('Undefined Input');
    } else { // String & Number
        result = elType;
        // console.log(elType);
    }
    return result;
}
