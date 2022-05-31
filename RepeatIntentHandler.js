const Alexa = require('ask-sdk-core');

const RepeatIntentHandler = {
    canHandle(handlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent'
        );
    },
    
    handle(handlerInput) {
        const speakOutput = handlerInput.requestEnvelope.session.attributes.current_question.question;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

module.exports = RepeatIntentHandler;