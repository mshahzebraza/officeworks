
// create a errorCatch middleware function

const errorCatch = (handler) => {
    return async (req, res/* , next */) => {
        try {
            console.log('2')
            await handler(req, res/* , next */);
        } catch (error) {
            return res.status(500).json(error.message);
            // next(error);
        }
    }
}

export default errorCatch;