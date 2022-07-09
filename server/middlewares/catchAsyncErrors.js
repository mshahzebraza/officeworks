export default (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(
        // console.log('1')
        next
    );
};

// This replaces the need of wrapping our code in tryCatch every time

