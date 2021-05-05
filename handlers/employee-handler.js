'use strict';

const { HTTP_SUCCESS, DYNAMO_DB_CONFIGS } = require('../utils/enums');
const { httpReturn } = require('../utils/httpReturn');
const AWS = require('aws-sdk');
const uuid = require('uuid');

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const TableName = DYNAMO_DB_CONFIGS.TableName;

module.exports.getEmployee = async (event) => {
    const employeeId = event.pathParameters.employeeId;

    const result = await dynamoDb.get({
        TableName, Key: {
            employeeId
        }
    }).promise();

    return httpReturn(
        HTTP_SUCCESS.SuccessOK,
        `Succesfully got ${employeeId}`,
        result
    );
};

/**
 * 
 * @param {event} event 
 * @returns httpReturn(statusCode, message, event)
 */
module.exports.getAllEmployees = async (event) => {
    const result = await dynamoDb.scan({ TableName }).promise();

    return httpReturn(
        HTTP_SUCCESS.SuccessOK,
        result,
        event
    );
};

module.exports.insertEmployee = async (event) => {
    const requestBody = JSON.parse(event.body);
    const employeeId = uuid.v1();
    const { name, age, position } = requestBody;

    const Item = {
        employeeId,
        name,
        age,
        position
    };

    const params = {
        TableName,
        Item
    }

    const result = await dynamoDb.put(params).promise();

    return httpReturn(
        HTTP_SUCCESS.SuccessCreated,
        `Employee succesfully created`,
        result
    );
};

module.exports.updateEmployee = async (event) => {
    const employeeId = event.pathParameters.employeeId;
    const requestBody = JSON.parse(event.body);
    const { name, age, position } = requestBody;

    const params = {
        TableName,
        UpdateExpression: 'set age = :a, name = :n, position = :p',
        ExpressionAttributeValues: {
            a: age,
            n: name,
            p: position
        },
        Key: employeeId
    };

    const result = await dynamoDb.update(params).promise();
    return httpReturn(
        HTTP_SUCCESS.SuccessOK,
        `Employee ${employeeId} succesfully updated`,
        result
    );
};

module.exports.patchEmployee = async (event) => {
    const employeeId = event.pathParameters.employeeId;
    const requestBody = JSON.parse(event.body);

    let UpdateExpression = '';
    let ExpressionAttributeValues = {};

    if (requestBody.age) {
        UpdateExpression = 'set age =:a';
        ExpressionAttributeValues.a = requestBody.age;
    }

    if (requestBody.name) {
        const newExpression = UpdateExpression.length > 0 ? ', set name =:n' : 'set name =:n';
        UpdatedExpression = UpdateExpression.concat(newExpression);
        ExpressionAttributeValues.n = requestBody.name;
    }

    if (requestBody.position) {
        const newExpression = UpdateExpression.length > 0 ? ', set position =:p' : 'set position =:p';
        UpdatedExpression = UpdateExpression.concat(newExpression);
        ExpressionAttributeValues.p = requestBody.position;
    }

    const params = {
        TableName,
        UpdateExpression,
        ExpressionAttributeValues
    }

    const result = await dynamoDb.update(params).promise();

    return httpReturn(
        HTTP_SUCCESS.SuccessOK,
        `Succesfully updated ${employeeId}`,
        result
    );
};

module.exports.deleteEmployee = async (event) => {
    const employeeId = event.pathParameters.employeeId;

    const result = await dynamoDb.delete({ TableName, Key: employeeId });

    return httpReturn(
        HTTP_SUCCESS.SuccessOK,
        `Succesfully deleted ${employeeId}`,
        result
    );
};

