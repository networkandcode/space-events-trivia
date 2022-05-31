const LoadDataInterceptor = {
    async process ( handlerInput ) {
        var persistentAttributes = { 
            'current_question': { },
            'past_questions': [ ],
            'score': 0,
            'visits': 0
        };
        
        console.log('Load Data Interceptor');
        await handlerInput.attributesManager.getPersistentAttributes().then(
            res => {
                if(res) {
                    console.log( 'response', res );
                    persistentAttributes = {...persistentAttributes, ...res};
                    console.log('persistentAttributes', persistentAttributes);
                }
            }, err => {
                console.log(err.message);
            }
        );
        
        handlerInput.attributesManager.setSessionAttributes( persistentAttributes );
    }
};

const LoggingRequestInterceptor = ( handlerInput ) => {
    console.log( '-----REQUEST-----' );
    console.log( JSON.stringify( handlerInput.requestEnvelope, null, 2 ) );
};

const SaveDataInterceptor = async( handlerInput ) => {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    handlerInput.attributesManager.setPersistentAttributes( sessionAttributes );
    await handlerInput.attributesManager.savePersistentAttributes();
};

const LoggingResponseInterceptor = (handlerInput, response) => {
    console.log( '-----RESPONSE-----' );
    console.log( JSON.stringify( response, null, 2 ) );
};

module.exports = {
    LoadDataInterceptor,
    LoggingRequestInterceptor,
    SaveDataInterceptor,
    LoggingResponseInterceptor,
};