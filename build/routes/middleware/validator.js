"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateParameters = (req, res, next) => {
    if (!req.query.filename)
        return res.status(404).send("please provide a valid image name");
    if (!req.query.height || req.query.height <= 0)
        return res.status(404).send("please provide a valid image height");
    if (!req.query.width || req.query.width <= 0)
        return res.status(404).send("please provide a valid image width");
    res.locals.filename = req.query.filename;
    res.locals.height = Number(req.query.height);
    res.locals.width = Number(req.query.width);
    next();
};
exports.default = { validateParameters };
