import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Question from "./question";
import Navbar from "./Navbar";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  let distinctQuestions = [];

  const url = "https://opentdb.com/api.php?";
  const location = useLocation();

  useEffect(() => {
    async function getQuestions() {
      const fetchQuestions = await fetch(
        `${url}amount=${location.state.number}&category=${location.state.category}&difficulty=${location.state.difficulty}&type=${location.state.type}`
      ).then((data) => data.json());

      setQuestions(fetchQuestions.results);
    }

    getQuestions();
  }, [
    location.state.number,
    location.state.category,
    location.state.difficulty,
    location.state.type,
  ]);

  const handleChange = (data) => {

    //copy current state
    let prevState = [...questionsAndAnswers];

    prevState.push(data);

    // create distinct questions
    distinctQuestions = Array.from(new Set(prevState.map((s) => s.id))).map(
      (id) => {
        return {
          id: id,
          question: prevState.find((s) => s.id === id).question,
          answer: prevState.find((s) => s.id === id).answer,
          correct_answer: prevState.find((s) => s.id === id).correct_answer,
        };
      }
    );

    // set state
    setQuestionsAndAnswers(distinctQuestions);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let temp = questionsAndAnswers.sort((a, b) => a.id - b.id);

    if(temp.length === questions.length){
      setQuestionsAndAnswers(temp);
    return navigate("/complete", {
      state: {
        userQuestionsAndAnswers: questionsAndAnswers,
      },
    });
  }

  window.alert("You haven't answered every question!")
  };

  return (
    <>
    <Navbar />
    <section> 
      <h1>Quiz</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <Question
            id={index}
            category={question.category}
            difficulty={question.difficulty}
            question={question.question}
            correct_answer={question.correct_answer}
            incorrect_answers={question.incorrect_answers}
            handleChange={handleChange}
            key={index}
          />
        ))}
        <input className="button" type="submit" value="Submit" />
      </form>
    </section>
    </>
  );
};

export default Quiz;
