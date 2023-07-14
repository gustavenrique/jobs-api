const notFound = (req, res, next) => {
    if (!res.headersSent)
        return res.status(404).send('Resource not found')
    
    next()
}

module.exports = notFound
