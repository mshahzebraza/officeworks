import { genErrMsg } from "./reusable";


export async function request({
    url = '',
    params = null,
    method = 'GET',
    headers = {
        'Content-Type': 'application/json', // the request won't work without specifying headers
        'Accept': 'application/json',
    },
    body = null,
    callback = () => { },
}) {

    try {

        // Check if the callback is Invalid
        !(typeof (callback) === 'function') && genErrMsg('Callback must be a function');

        // Append the params to the url if params is not null
        if (params) url = url.concat(`?${new URLSearchParams(params)}`)

        // Create the request
        const response = await fetch(
            url, {
            method,
            headers,
            body: body && JSON.stringify(body)
        }
        )

        const resJson = await response.json();
        callback(resJson);
        return resJson;


    } catch (error) {
        // generate a console log with styling red color
        console.log(`%c Error: ${error.message} @ ${url}`, `background: #f00; color: #fff; padding: 0.5rem 1rem;`);

    }
}