const ErrorHandler = {
    canHandle() {
        return true;
    },
    
    handle( handlerInput, error ) {
        const speakOutput = JSON.stringify( error );
        console.log(`~~~~ Error handled: ${JSON.stringify( error )}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

module.exports = ErrorHandler;