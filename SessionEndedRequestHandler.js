const AplRender = require('./AplRender');
const Alexa = require('ask-sdk-core');

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        const speakOutput = 'Thank you for playing space events trivia, we hope you will visit us again!!!';
        
        AplRender( handlerInput, 'Thank you !!!', 'Waiting for you to vist again...' );
        return handlerInput.responseBuilder.speak(speakOutput).getResponse(); // notice we send an empty response
    }
};

module.exports = SessionEndedRequestHandler;