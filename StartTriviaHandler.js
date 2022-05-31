const AplRender = require('./AplRender');
const triviaFunctions = require('./triviaFunctions.js');

const Alexa = require('ask-sdk-core');

const StartTriviaHandler = {
    canHandle(handlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            (
                Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent'
                ||
                Alexa.getIntentName(handlerInput.requestEnvelope) === 'AskQuestionIntent'
            )
        );
    },

    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        var speakOutput = '';

        if (
            Object.keys(sessionAttributes.current_question).length !== 0
        ){
            speakOutput = sessionAttributes.current_question.question;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
        
        const currentQuestion = triviaFunctions.getRandomQuestion( sessionAttributes.past_questions );
        var primaryText = currentQuestion.question;
        var secondaryText = '';

        
        if (currentQuestion.id === 0) {
            speakOutput = `You have run out of questions. Thanks for playing!`;   
            primaryText = 'Game Over';
        } else {
            sessionAttributes.current_question = currentQuestion;
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
            speakOutput = currentQuestion.question;
        }

        AplRender( handlerInput, primaryText, secondaryText );
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }

};

module.exports = StartTriviaHandler;