import { genErrMsg, deCapitalizeFirstLetter, equateCase } from "./reusable";


export function mapDataToCategory(dataList = [], categories = false, filter = 'type', fallbackCtg = 'others') {


    try {

        // Check if the DataList is Invalid or not an Array
        dataList ?? genErrMsg('DataList is required');
        !Array.isArray(dataList) && genErrMsg('Datalist must be an Array');

        // Check if the Categories is Invalid, not an Array or Empty
        categories ?? genErrMsg('Categories is required');
        !Array.isArray(categories) && genErrMsg('Categories must be an Array');
        (categories?.length === 0) && genErrMsg('Categories must not be empty');



        // Append the fallbackCtg (usually set to 'others') to the end of the array
        categories = categories.concat(fallbackCtg);

        // create an object with its keys set to the categories and values set to an empty array
        const result = Object.fromEntries(categories.map(ctg => [deCapitalizeFirstLetter(ctg), []]));

        dataList.forEach(
            (dataEl, idx) => {

                // check if the dataEl[filter] is included in categories (user-defined + fallbackCategory)
                categories.findIndex(el => equateCase(dataEl[filter], el)) >= 0
                    // Yes: add the current item in the matching category
                    ? result[deCapitalizeFirstLetter(dataEl[filter])].push(dataEl)
                    // No: add the current item in the misc(fallbackCtg) category
                    : result[deCapitalizeFirstLetter(fallbackCtg)].push(dataEl);

            }
        );


        return result;



    } catch (error) {
        // generate a console log with styling red color
        // console.log(error);
        console.log(`%c Error: ${error.message}`, `background: #f00; color: #fff; padding: 0.5rem 1rem;`);

    }
}
