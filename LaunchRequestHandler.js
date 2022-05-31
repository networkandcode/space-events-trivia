const Alexa = require('ask-sdk-core');
const AplRender = require('./AplRender');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType( handlerInput.requestEnvelope ) === 'LaunchRequest';
    },
    
    handle(handlerInput) {
        var sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        var speakOutput = '';
        
        if( sessionAttributes.visits === 0 ) {
            speakOutput = `
                Hi!!!
                Welcome to the space events trivia.
                I'll ask you questions about the month and year on which an important space related event has happened.
                Would you like to play?
            `;
        } else {
            speakOutput = `
                Welcome back to space events trivia. Are you ready for the question?
            `;
        }
        
        sessionAttributes.visits += 1;
        handlerInput.attributesManager.setSessionAttributes( sessionAttributes );
        
        AplRender(
            handlerInput,
            'say Yes', 
            `Let's play...`,
        );

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

module.exports = LaunchRequestHandler;