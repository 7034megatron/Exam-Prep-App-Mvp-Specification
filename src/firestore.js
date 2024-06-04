// src/firestore.js
import { firestore } from './firebase';

export const createQuiz = (quiz) => {
  return firestore.collection('quizzes').add(quiz);
};

export const getQuizzes = () => {
  return firestore.collection('quizzes').get();
};

export const getQuiz = (quizId) => {
  return firestore.collection('quizzes').doc(quizId).get();
};

export const submitQuizResults = (quizId, results) => {
  return firestore.collection('quizzes').doc(quizId).collection('results').add(results);
};

export const getQuizResults = (quizId) => {
  return firestore.collection('quizzes').doc(quizId).collection('results').get();
};
