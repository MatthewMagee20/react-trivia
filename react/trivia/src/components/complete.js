import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import QuestionAndAnswers from "./questionAndAnswer";

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

  return (
    <>
      <Navbar />
      <section className="complete">
        <h1>Trivia Complete!</h1>
        <h2>
          Your score is {score} / {data.length}
        </h2>
        <Link className="button" to="/">
          Home
        </Link>
        <div>
          {data.map((x) => (
            <QuestionAndAnswers
              question={x.question}
              answer={x.answer}
              correct_answer={x.correct_answer}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Complete;
