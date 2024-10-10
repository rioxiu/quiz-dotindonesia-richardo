import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "./Question";

interface QuestionData {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [finished, setFinished] = useState<boolean>(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [unansweredQuestions, setUnansweredQuestions] = useState<number>(0);

  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=2&type=multiple&category=30&difficulty=easy"
      );
      setQuestions(response.data.results);
    };

    fetchQuestions();
    console.log(questions);
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    setAnsweredQuestions(answeredQuestions + 1);
    if (isCorrect) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(10);
    } else {
      handleFinish();
    }
  };

  //   useEffect(() => {
  //     const timer = setInterval(() => {
  //       setTimeLeft((prev) => {
  //         if (prev === 1) {
  //           clearInterval(timer);

  //           // Cek apakah pertanyaan sudah dijawab
  //           if (answeredQuestions < currentQuestionIndex + 1) {
  //             setUnansweredQuestions(unansweredQuestions + 1); // Hitung sebagai unanswered
  //             setAnsweredQuestions(answeredQuestions + 1); // Masukkan sebagai pertanyaan yang dijawab
  //           }

  //           if (currentQuestionIndex < questions.length - 1) {
  //             setCurrentQuestionIndex(currentQuestionIndex + 1);
  //             setTimeLeft(10);
  //           } else {
  //             handleFinish();
  //           }
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);

  //     return () => clearInterval(timer);
  //     //   }, [currentQuestionIndex, answeredQuestions, questions.length]);
  //   }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);

          // Cek apakah pertanyaan sudah dijawab
          if (answeredQuestions < currentQuestionIndex + 1) {
            setUnansweredQuestions(unansweredQuestions + 1); // Hitung sebagai unanswered
          }

          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeLeft(10);
          } else {
            handleFinish();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, answeredQuestions, questions.length]);

  const handleFinish = () => {
    setFinished(true);
    setTimeout(() => {
      localStorage.removeItem("username");
      window.location.reload();
    }, 9000);
  };

  if (finished)
    return (
      <div>
        <h1>Quiz finished! {username}</h1>
        <div>Total question: {questions.length}</div>
        <div>Correct Answers: {correctAnswers}</div>
        <div>Incorrect Answers: {incorrectAnswers}</div>
        <div>Unanswered Questions: {unansweredQuestions}</div>
      </div>
    );

  return (
    <div>
      <h1 className="text-3xl text-center">Question!</h1>
      <div className="flex justify-between mt-5">
        <h1>{username}'s Session</h1>
        <h2>Time Left: {timeLeft} sec</h2>
      </div>
      <Question
        questionNumber={currentQuestionIndex}
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
      />
    </div>
  );
};

export default Quiz;
