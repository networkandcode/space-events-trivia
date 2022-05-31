const questions = require('./documents/questions.json');

const months = [
    "january",
    "february",
    "march", 
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
];

const getRandomItem = ( List ) => {
    const length = List.length;
    const randomIndex = Math.floor((Math.random() * length));
    console.log('random index', List, randomIndex, List[randomIndex]);
    return List[randomIndex];
};

const getRandomQuestion = (pastQuestions = []) => {
    const filteredQuestions = questions.filter( 
        question => !pastQuestions.find( 
            pastQuestion => pastQuestion.id === question.id 
        )
    );
    const length = filteredQuestions.length;
    
    return length > 0
        ? filteredQuestions[ Math.floor( Math.random() * length )]
        : { "id": 0, "question": null, "answer": null }
    ;
};

const getHour = ( userTimezone ) => {
    const currentDateTime = new Date(
        new Date().toLocaleString(
            "en-US", { timeZone: userTimezone}
        )
    );
    
    return currentDateTime.getHours();
};

const getMonthName = ( monthNumber ) => {
    const monthName = months[ monthNumber ];
    return monthName;
};

module.exports = {
    getMonthName,
    getRandomItem,
    getRandomQuestion,
    getHour,
};