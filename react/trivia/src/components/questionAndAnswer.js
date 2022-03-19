const QuestionsAndAnswer = ({question, answer, correct_answer}) => {
    
    let check = false;

    if(answer === correct_answer){
        check = true;
    }
    
    return(
        <div className={`question-answer ${check ? "correct" : "incorrect"}`}>
            <h3>{question}</h3>
            <h2>Answer: {answer}</h2>
            <p>Your answer: {correct_answer}</p>
        </div>
    )
}

export default QuestionsAndAnswer;