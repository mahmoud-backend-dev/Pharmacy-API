class CustomErorrAPI extends Error{
    constructor(message) {
        super(message);
    }
};

module.exports = CustomErorrAPI;