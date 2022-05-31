'use strict';

const LaunchRequestHandler = require( './LaunchRequestHandler' );
const StartTriviaHandler = require( './StartTriviaHandler' );
const RepeatIntentHandler = require('./RepeatIntentHandler');
const GetAnswerIntentHandler = require( './GetAnswerIntentHandler' );
// The help intent handler is setup to be invoked for fallback intent also
const HelpIntentHandler = require('./HelpIntentHandler');
const CancelAndStopIntentHandler = require('./CancelAndStopIntentHandler');
const SessionEndedRequestHandler = require('./SessionEndedRequestHandler');
const IntentReflectorHandler = require('./IntentReflectorHandler');

const AWS = require('aws-sdk');
const Alexa = require('ask-sdk-core');
const dynamoAdapter = require('ask-sdk-dynamodb-persistence-adapter');

const interceptors = require( './interceptors' );
const { 
    LoadDataInterceptor, 
    LoggingRequestInterceptor,
    SaveDataInterceptor,
    LoggingResponseInterceptor,
} = interceptors;

const ErrorHandler = require('./ErrorHandler');

// order in which handlers are called matters
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        StartTriviaHandler,
        RepeatIntentHandler,
        GetAnswerIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
    )
    .addRequestInterceptors(
        LoadDataInterceptor,
        LoggingRequestInterceptor,
    )
    .addResponseInterceptors(
        SaveDataInterceptor,
        LoggingResponseInterceptor,
    )
    .addErrorHandlers(
        ErrorHandler
    )
    .withPersistenceAdapter(
        new dynamoAdapter.DynamoDbPersistenceAdapter({
            tableName: process.env.DYNAMODB_TABLE,
            createTable: true,
            dynamoDBClient: new AWS.DynamoDB({
                apiVersion: 'latest', region: process.env.DYNAMODB_REGION
            })
        })
    )
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();