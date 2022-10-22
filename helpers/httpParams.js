
export async function httpParams(apiLink = 'http://localhost:3000/api/connect', method = 'GET', data = null, params = null) {
    // convert the params object to a query string starting with a '?'
    const queryString = params
        ? `?${Object.entries(params).map(
            ([key, value]) => `${key}=${value}`).join('&')}
      ` :
        '';


    const response = await fetch(
        apiLink.concat(queryString),
        {
            method: method,
            headers: {
                'Content-Type': 'application/json' // the request won't work without specifying headers
            },
            body: data && JSON.stringify(data) // returns null (default parameter) if not defined
        });
    return response;
}
