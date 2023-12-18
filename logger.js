const logger = (req, res, next)=>{
    console.log(req.url);
    console.log(req.method);
    console.log(req.hostname);
    console.log(req.path);
    next()
}

module.exports = logger