// create a function to generate invalid response
export function invalidResponse(res, message = 'Invalid response', statusCode = 400) {
    console.assert(!!res, 'res must be passed in the "invalidResponse" function');
    return res.status(statusCode).json({
        success: false,
        message,
        data: null,
        error: `Error Code ${statusCode}: ${message}`
    });
}
