'use strict';

const { HTTP_SUCCESS } = require('../utils/enums');
const { httpReturn } = require('../utils/httpReturn');

module.exports.getEmployee = async (event) => {
    return httpReturn(
        HTTP_SUCCESS.SuccessOK,
        "Hello world",
        null
    );
};

module.exports.insertEmployee = async (event) => {
    return httpReturn(
        HTTP_SUCCESS.SuccessCreated,
        "Hello world",
        null
    );
};

module.exports.updateEmployee = async (event) => {
    return httpReturn(
        HTTP_SUCCESS.SuccessOK,
        "Hello world",
        null
    );
};

module.exports.deleteEmployee = async (event) => {
    return httpReturn(
        HTTP_SUCCESS.SuccessOK,
        "Hello world",
        null
    );
};

