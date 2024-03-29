"use client";
import React, { useState } from "react";
//import utils from "@/utils/utils"
import { quiz } from "@/app/data";


const page = () => {
  // const { 
  //   selectedAnswer,
  //   setSelectedAnswer,
  //   checked,
  //   setChecked, 
  //   selectedAnswerIndex,
  //   setSelectedAnswerIndex,
  //   showResult,
  //   setShowResult,
  //   result,
  //   setResult,
  //   questions,
  //   question,
  //   answers,} = utils
 
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[activeQuestion];

  //store options
  const [allCorrectAnswers, setAllCorrectAnswers] = useState([]);
  const [allWrongAnswers, setAllWrongAnswers] = useState([]);

   




  //   Select and check answer
  const onAnswerSelected = (answer, idx) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
      console.log("true");
      // setAllCorrectAnswers((prev) => [...prev, answer]);
      //set all correct answers with questions
      setAllCorrectAnswers((prev) => [...prev, { question, answer }
      ])
    } else {
      setSelectedAnswer(false);
      console.log("false");
      setAllWrongAnswers((prev) => [...prev, { question, answer }]);
    }
  };

  // Calculate score and increment to next question
  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };


  return (
    <div className="container">
      <h1 className="quiz-header">Quiz Page</h1>
      <div >
        <h2 className="quiz-header">
          Question: {activeQuestion + 1}
          <span>/{questions.length}</span>
        </h2>
      </div>
      <div>
        {!showResult ? (
          <div className="quiz-container">
            <h3>{questions[activeQuestion].question}</h3>
            {answers.map((answer, idx) => (
              <li
                key={idx}
                onClick={() => onAnswerSelected(answer, idx)}
                className={
                  selectedAnswerIndex === idx ? "li-selected" : "li-hover"
                }
              >
                <span>{answer}</span>
              </li>
            ))}
            {checked ? (
              <button onClick={nextQuestion} className="btn">
                {activeQuestion === question.length - 1 ? "Finish" : "Next"}
              </button>
            ) : (
              <button onClick={nextQuestion} disabled className="btn-disabled">
                {" "}
                {activeQuestion === question.length - 1 ? "Finish" : "Next"}
              </button>
            )}
          </div>
        ) : (
          <div className="quiz-container">
            <h3>Results</h3>
            <h3>Overall {(result.score / 25) * 100}%</h3>
            <p>
              Total Questions: <span>{questions.length}</span>
            </p>
            <p>
              Total Score: <span>{result.score}</span>
            </p>
            <p>
              Correct Answers: <span>{result.correctAnswers}</span>
             
              <div>
               
                  {allCorrectAnswers.map((answer, idx) => (
                    <div key={idx} className="" >
                      <span>{answer.question}</span>{" : "}
                      <span>{answer.answer}</span>
                    </div>
                  ))}
              </div>
            </p>
            <p>
              Wrong Answers: <span>{result.wrongAnswers}</span>
             
              <div>
               {allWrongAnswers.map((answer, idx) => (
                    <div key={idx} className="" >
                      <span>{answer.question}</span>{" : "}
                      <span>{answer.answer}</span>
                    </div>
                  ))}
              </div>
           
            </p>
            <button onClick={() => window.location.reload()}>Restart</button>
          </div>
        )}
      </div>
    </div>
  );
};


export default page;
