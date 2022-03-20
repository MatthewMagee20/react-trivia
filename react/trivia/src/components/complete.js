import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import QuestionAndAnswers from './questionAndAnswer'

const Complete = () => {
  const location = useLocation();
  let data = location.state.userQuestionsAndAnswers;

  console.log(data);

  const [score, setScore] = useState(0);

  useEffect(() => {
    data.forEach((element) => {
      if (element.answer === element.correct_answer) {
        setScore((prev) => prev + 1);
      }
    });
  }, [data]);

  console.log(score);

  return (
    <>
    <Navbar/>
    <section className="complete">
      <h1>Trivia Complete!</h1>
      <h2>
        Your score is {score} / {data.length}
      </h2>
      {data.map((x) => 
      <QuestionAndAnswers question={x.question} answer={x.answer} correct_answer={x.correct_answer} />
      )}
    </section>
    </>
  );
};

export default Complete;
