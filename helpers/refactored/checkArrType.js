import { checkDataType } from "./checkDataType";

// returns the type of the array if all elements are of same type otherwise returns false


export function checkArrType(arr = []) {
    const [firstItem, ...restItems] = arr;
    const firstItemType = checkDataType(firstItem);
    const allItemsOfSameType = restItems.every(item => checkDataType(item) === firstItemType);
    if (!allItemsOfSameType)
        return false;
    return firstItemType;
}
