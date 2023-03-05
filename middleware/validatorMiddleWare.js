const { validationResult } = require('express-validator');

const validatorMiddleWare = (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
};

module.exports = validatorMiddleWare;