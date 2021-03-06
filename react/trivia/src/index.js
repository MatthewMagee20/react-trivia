import React from "react";
import { render } from "react-dom";
import App from "./App";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./components/quiz";
import Complete from "./components/complete";

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="quiz" element={<Quiz />}></Route>
      <Route path="complete" element={<Complete />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
