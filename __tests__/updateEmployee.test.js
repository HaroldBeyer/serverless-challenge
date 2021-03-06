'use strict';

// tests for updateEmployee
// Generated by serverless-jest-plugin

const mod = require('./../handlers/employee-handler');

const jestPlugin = require('serverless-jest-plugin');
const lambdaWrapper = jestPlugin.lambdaWrapper;
const wrapped = lambdaWrapper.wrap(mod, { handler: 'updateEmployee' });

describe('updateEmployee', () => {
  beforeAll((done) => {
//  lambdaWrapper.init(liveFunction); // Run the deployed lambda

    done();
  });

  it('implement tests here', () => {
    return wrapped.run({}).then((response) => {
      expect(response).toBeDefined();
    });
  });
});
