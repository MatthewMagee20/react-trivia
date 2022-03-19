import "./App.scss";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  const [number, setNumber] = useState(10);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    async function getData() {
      const fetchData = await fetch(
        "https://opentdb.com/api_category.php"
      ).then((data) => data.json());

      setCategories(fetchData.trivia_categories);
    }

    getData();
  }, []);

  const handleCategoryChange = (event) => {
    console.log(event.target.value);
    setCategory(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleNumberChange = (event) => {
    let num = event.target.value;

    if (num > 0) {
      setNumber(event.target.value);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    return navigate("/quiz", {
      state: {
        number: number,
        category: category,
        difficulty: difficulty,
        type: type,
      },
    });
  };

  return (
    <>
    <Navbar />
    <section className="App">
      <div className="header">
        <h1>Welcome to Trivia</h1>
        <h4>Click Submit to start a game with question varying in difficulty and categories</h4>
        <h2>Or</h2>
        <h4>Use the form to tailor a game and test your knowledge!</h4>
        <h4>Good Luck...</h4>
      </div>

        <form className="form" onSubmit={handleSubmit}>
          <input
            value={number}
            type="number"
            onChange={handleNumberChange}
          ></input>
          <select onChange={handleDifficultyChange}>
            <option>Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select onChange={handleTypeChange}>
            <option>Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
          <select onChange={handleCategoryChange}>
            <option>Any Category</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input className="button" type="submit" value="Submit" />
        </form>
    </section>
    </>
  );
}
