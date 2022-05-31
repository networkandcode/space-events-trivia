const Alexa = require('ask-sdk-core');
const AplRender = require('./AplRender');
const triviaFunctions = require('./triviaFunctions');

const { getRandomItem } = triviaFunctions;

const GetAnswerIntentHandler = {
    canHandle( handlerInput )  {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' 
            &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetAnswerIntent'
        );
    },
    
    handle( handlerInput ) {
        var speakOutput = '';
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        console.log('Get Answer Intent', sessionAttributes);
        
        if ( Object.keys(sessionAttributes.current_question).length === 0 ) {
            speakOutput =
                "I'm sorry, there's no active question right now. Would you like a question?";
                
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
        
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        const givenAnswer = slots.date.value;
        const correctAnswer = sessionAttributes.current_question.answer;
        
        var rightAnswer = false;
        
        console.log('check answer', new Date(givenAnswer), new Date(correctAnswer));
        
        if(new Date(givenAnswer).toDateString() === new Date(correctAnswer).toDateString()) {
            rightAnswer = true;
        }
        sessionAttributes.past_questions.push( sessionAttributes.current_question );
        sessionAttributes.current_question = {};
        
        var primaryText, secondaryText = '';
        const wordsToPromptNextQuestion = ['next question', 'one more', 'ready for another', 'try again', 'wanna go again'];
        
        if ( rightAnswer ) {
            sessionAttributes.score += 1;
            
            const wordsToCongratulate = ['Congrats', `That's right`, 'Great', 'Awesome', 'You did it'];
            secondaryText = `${getRandomItem(wordsToCongratulate)} !!!, ${getRandomItem(wordsToPromptNextQuestion)}?`;
            
            speakOutput = `
                ${getRandomItem(wordsToCongratulate)} !!!
                Your score is now ${sessionAttributes.score},
                ${getRandomItem(wordsToPromptNextQuestion)}?
            `;
        } else {
            const wordsToConfirmWrongAnswer = [
                'Awww wrong answer',
                'hmm, that was wrong',
                `Oh it's a miss`,
                'That was not correct',
                'You made a wrong guess'
            ];
            
            const wordsToEncourage = [
                'Better luck next time', 
                `Don't worry, you'll make it next time`,
                `You'll just do the next question right`,
                `You'd get it right on the next attempt`,
                'You shall make it next time'
            ];
            
            secondaryText = `${getRandomItem(wordsToEncourage)} !, ${getRandomItem(wordsToPromptNextQuestion)}?`;
            console.log('secondaryText', secondaryText);
            
            speakOutput = `
                ${getRandomItem(wordsToConfirmWrongAnswer)} !
                The correct answer is ${correctAnswer}.
                Your score is now ${sessionAttributes.score},
                ${getRandomItem(wordsToEncourage)},
                ${getRandomItem(wordsToPromptNextQuestion)}?
            `;
            console.log('speakOutput', speakOutput);
        }
        
        primaryText = `Score: ${sessionAttributes.score}`;
        
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        AplRender(
            handlerInput,
            primaryText, 
            secondaryText,
        );
         
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

module.exports = GetAnswerIntentHandler;