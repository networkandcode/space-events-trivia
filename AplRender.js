const apl_spec = require( './documents/apl_spec.json' );
const Alexa = require('ask-sdk-core');

const AplRender = ( handlerInput, primaryText, secondaryText ) => {
    if (
       Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)[
          'Alexa.Presentation.APL'
        ]
    ) {
        handlerInput.responseBuilder.addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: apl_spec,
            datasources: {
                myData: {
                    primaryText,
                    secondaryText,
                },
            },
        });
    }    
};

module.exports = AplRender;