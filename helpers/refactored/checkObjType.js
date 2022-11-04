import { checkDataType } from "./checkDataType";

// returns the type of the array if all elements are of same type otherwise returns false


export function checkObjType(obj = {}) {
    const objValues = Object.values(obj)
    const [firstItem, ...restItems] = objValues;
    const firstItemType = checkDataType(firstItem);
    const allItemsOfSameType = restItems.every(item => checkDataType(item) === firstItemType);
    if (!allItemsOfSameType)
        return false;
    return firstItemType;
}
