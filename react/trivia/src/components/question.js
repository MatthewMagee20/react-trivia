import { useState, useEffect } from "react";

const Question = ({
  category,
  correct_answer,
  difficulty,
  incorrect_answers,
  question,
  id,
  handleChange,
}) => {
  const [answer, setAnswer] = useState("");
  // const [temp, setTemp] = useState("");
  let [randArray, setRandArray] = useState([]);
  let newQues = question.replace(/&quot;/g, '"')
  let questionObj = {
    id: id,
    question: newQues,
    correct_answer: correct_answer,
  };

  useEffect(() => {
    const shuffle = (array) => {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // currentIndex.replace(/&quot;/g,"\"")

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    };

    incorrect_answers.push(correct_answer);
    setRandArray(shuffle(incorrect_answers));
  }, [correct_answer, incorrect_answers]);

  // useEffect(() => {
  //   console.log(answer);
  // }, [answer]);

  const handleChangeAns = (event) => {
    setAnswer(event.target.value);
    questionObj.answer = event.target.value;
    handleChange(questionObj);
  };

  return (
    <div className="question">
      <h2>{id + 1}. {category}</h2>
      <h3>{difficulty}</h3>
      <p>{newQues}</p>
      <div className="answers">
        {randArray.map((ans, index) => (
          <label key={index}>
            <input
              type="radio"
              value={ans}
              checked={ans === answer}
              onChange={handleChangeAns}
            ></input>
            {ans}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Question;
