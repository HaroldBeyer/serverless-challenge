'use strict';

const { HTTP_SUCCESS, DYNAMO_DB_CONFIGS } = require('../utils/enums');
const { httpReturn } = require('../utils/httpReturn');
const AWS = require('aws-sdk');
const uuid = require('uuid');

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const TableName = DYNAMO_DB_CONFIGS.TableName;

/**
 * 
 * @param {pathParameters.employeeId} event 
 * @returns httpReturn(statusCode, message, event)
 * Get a single employee based on employeeId
 */
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
 * @param {} event 
 * @returns httpReturn(statusCode, message, event)
 * Get all employees from the Stefanini table
 */
module.exports.getAllEmployees = async (event) => {
    const result = await dynamoDb.scan({ TableName }).promise();

    return httpReturn(
        HTTP_SUCCESS.SuccessOK,
        `Succesfully got all employees`,
        result
    );
};

/**
 * 
 * @param {age, name, position} event 
 * @returns httpReturn(statusCode, message, event)
 * Insert a employee
 */
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

/**
 * 
 * @param {pathParameters.employeeId, body.age, body.name, body.position} event 
 * @returns httpReturn(statusCode, message, event)
 * Updates a employee (all properties) based on employeeId
 */
module.exports.updateEmployee = async (event) => {
    const employeeId = event.pathParameters.employeeId;
    const requestBody = JSON.parse(event.body);
    const { name, age, position } = requestBody;

    const params = {
        TableName,
        UpdateExpression: 'SET #age = :a, #name = :n, #position = :p',
        ExpressionAttributeValues: {
            ':a': age,
            ':n': name,
            ':p': position
        },
        ExpressionAttributeNames: {
            "#age": "age",
            "#name": "name",
            "#position": "position"
        },
        Key: { employeeId },
        ReturnValues: 'UPDATED_NEW'
    };

    const result = await dynamoDb.update(params).promise();

    return httpReturn(
        HTTP_SUCCESS.SuccessOK,
        `Employee ${employeeId} succesfully updated`,
        result
    );
};

/**
 * 
 * @param {pathParameters.employeeId, body.age?, body.name?, body.position?} event 
 * @returns httpReturn(statusCode, message, event)
 * Updates a employee (optional properties) based on employeeId
 */
module.exports.patchEmployee = async (event) => {
    const employeeId = event.pathParameters.employeeId;
    const requestBody = JSON.parse(event.body);

    let UpdateExpression = '';
    let ExpressionAttributeValues = {};
    let ExpressionAttributeNames = {};

    if (requestBody.age) {
        UpdateExpression = 'SET #age =:a';
        ExpressionAttributeValues[':a'] = requestBody.age;
        ExpressionAttributeNames["#age"] = "age";
    }

    if (requestBody.name) {
        const newExpression = UpdateExpression.length > 0 ? ', #name =:n' : 'SET #name =:n';
        UpdateExpression = UpdateExpression.concat(newExpression);
        ExpressionAttributeValues[':n'] = requestBody.name;
        ExpressionAttributeNames["#name"] = "name";
    }

    if (requestBody.position) {
        const newExpression = UpdateExpression.length > 0 ? ', #position =:p' : 'SET #position =:p';
        UpdateExpression = UpdateExpression.concat(newExpression);
        ExpressionAttributeValues[':p'] = requestBody.position;
        ExpressionAttributeNames["#position"] = "position";
    }

    const params = {
        TableName,
        UpdateExpression,
        ExpressionAttributeValues,
        ExpressionAttributeNames,
        Key: { employeeId },
        ReturnValues: 'UPDATED_NEW'
    }

    const result = await dynamoDb.update(params).promise();

    return httpReturn(
        HTTP_SUCCESS.SuccessOK,
        `Succesfully updated ${employeeId}`,
        result
    );
};

/**
 * 
 * @param {pathParameters.employeeId} event 
 * @returns httpReturn(statusCode, message, event)
 * Deletes a employee based on employeeId
 */
module.exports.deleteEmployee = async (event) => {
    const employeeId = event.pathParameters.employeeId;

    const result = await dynamoDb.delete({ TableName, Key: { employeeId } }).promise();

    return httpReturn(
        HTTP_SUCCESS.SuccessOK,
        `Succesfully deleted ${employeeId}`,
        result
    );
};

