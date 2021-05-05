'use strict';

module.exports.getEmployee = async (event) => {
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "message": "Hello World!" })
    };
};

module.exports.insertEmployee = async (event) => {
    return {
        statusCode: 201,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "message": "Hello World!" })
    };
};

module.exports.updateEmployee = async (event) => {
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "message": "Hello World!" })
    };
};

module.exports.deleteEmployee = async (event) => {
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "message": "Hello World!" })
    };
};

