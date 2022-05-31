const Alexa = require('ask-sdk-core');

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            &&
            (
                Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent'
                ||
                Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent'
            )
        );
    },
    
    handle(handlerInput) {
        const speakOutput = `
            Welcome to the help section of the space events trivia.
            It has a set of questions related to important space events collected from the Internet from websites 
            such as businesstoday.in, indiatoday.in,  isro.gov.in, wikipedia.org, etc.
            You would be asked to answer the date on which an event has occured.
            For example if the question is When Neil Armstrong landed on moon?, you may answer July 20, 1969.
            For each correct answer, the score would be increased by 1, until you have attempted all the questions.
            Once a question is attempted, you could say yes to proceed to the next question,
            and you can say repeat to repeat the current question.
        `;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

module.exports = HelpIntentHandler;