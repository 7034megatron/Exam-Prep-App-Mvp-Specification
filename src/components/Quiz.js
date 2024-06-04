// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import { getQuiz, submitQuizResults } from '../firestore';

const Quiz = ({ quizId }) => {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuiz = async () => {
      const quizData = await getQuiz(quizId);
      setQuiz(quizData.data());
    };

    fetchQuiz();
  }, [quizId]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitQuizResults(quizId, { answers });
      alert("Quiz submitted!");
    } catch (error) {
      alert(error.message);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      {quiz.questions.map((question, index) => (
        <div key={index}>
          <p>{question.text}</p>
          {question.options.map((option, optionIndex) => (
            <label key={optionIndex}>
              <input
                type="radio"
                name={question.id}
                value={option}
                onChange={() => handleAnswerChange(question.id, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Quiz;
