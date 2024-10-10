// src/components/Question.tsx
import React from "react";

interface QuestionProps {
  question: {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  };
  onAnswer: (isCorrect: boolean) => void;
  questionNumber: number;
}

const Question: React.FC<QuestionProps> = ({
  question,
  onAnswer,
  questionNumber,
}) => {
  if (!question) return null;

  const answers = [
    ...question.incorrect_answers,
    question.correct_answer,
  ].sort();

  return (
    <div className="p-2 border-2 rounded-md mt-8">
      <h2>Soal {questionNumber + 1}</h2> {/* Menampilkan nomor soal */}
      <h2>Question: {question.question}</h2>
      <div className="flex mt-5  gap-4">
        {answers.map((answer) => (
          <button
            className="btn btn-neutral"
            key={answer}
            onClick={() => onAnswer(answer === question.correct_answer)}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
