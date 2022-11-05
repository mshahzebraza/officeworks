import { deepClone } from "../reusable";

// copy only a few keys from an object // equivalent to _.pick()
// if any of the required key is not found in sourceObject then nothing is returned against that key. (that key will not be found in returned object)


export function cloneAndPluck(sourceObject = {}, fetchKeys = [], removeKeys = []) {
    let newObject = {};

    // Fetch only the keys specified in fetchKeys and concat them to newObject
    if (fetchKeys !== 'all') {
        fetchKeys.forEach((key) => {
            if (sourceObject[key] === undefined)
                return;
            newObject[key] = sourceObject[key];
        });
    } else {
        newObject = deepClone(sourceObject);
    }

    // Remove the keys specified in removeKeys from newObject
    removeKeys.forEach((key) => {
        if (newObject[key] === undefined)
            return;
        delete newObject[key];
    });

    { // ? Alternate Logic
        /*
             sourceObjectCopy = deepClone(sourceObject)
        
             for (const iterator in sourceObjectCopy) {
                  if (!fetchKeys.includes(iterator)) {
                       delete sourceObjectCopy[iterator];
                  }
                  if (removeKeys.includes(iterator)) {
                       delete sourceObjectCopy[iterator];
                  }
             }
        */
    }



    return newObject;
}
;
