const errorHandler = async (err, req, res, next) => {
    const statusCode = res.status ? res.statusCode : 500;
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.production === "production" ? null : err.stack
    })
}

module.exports = { errorHandler }