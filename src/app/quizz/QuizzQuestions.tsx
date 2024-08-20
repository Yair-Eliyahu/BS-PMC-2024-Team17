"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/progressBar";
import { ChevronLeft, X } from "lucide-react"; // Icons for navigation
import ResultCard from "./ResultCard"; // Component to display result after each question
import QuizzSubmission from "./QuizzSubmission"; // Component to display the final submission screen
import { InferSelectModel } from "drizzle-orm"; // Type helper for database models
import { questionAnswers, questions as DbQuestions, quizzes } from "@/db/schema"; // Database schema
import { saveSubmission } from "@/actions/saveSubmissions"; // Action to save the quiz submission
import { useRouter } from "next/navigation"; // Hook for navigating within the app
import { ToastContainer, toast } from "react-toastify"; // Toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast notification styles

// Types for the answers, questions, and quiz
type Answer = InferSelectModel<typeof questionAnswers>;
type Question = InferSelectModel<typeof DbQuestions> & { answers: Answer[] };
type Quizz = InferSelectModel<typeof quizzes> & { questions: Question[] };

type Props = {
  quizz: Quizz; // Props containing the quiz data
};

export default function QuizzQuestions(props: Props) {
  const { questions } = props.quizz; // Destructure the questions from the quiz prop

  // State management for quiz flow
  const [started, setStarted] = useState<boolean>(false); // Tracks if the quiz has started
  const [currentQuestion, setCurrentQuestion] = useState<number>(0); // Tracks the current question index
  const [score, setScore] = useState<number>(0); // Tracks the user's score
  const [userAnswers, setUserAnswers] = useState<{ questionId: number, answerId: number }[]>([]); // Stores user's answers
  const [submitted, setSubmitted] = useState<boolean>(false); // Tracks if the quiz has been submitted
  const router = useRouter(); // Router instance for navigation

  // Function to handle moving to the next question or starting the quiz
  const handleNext = () => {
    if (!started) {
      setStarted(true); // Start the quiz
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1); // Move to the next question
    } else {
      setSubmitted(true); // If on the last question, mark the quiz as submitted
    }
  };

  // Function to handle when a user selects an answer
  const handleAnswer = (answer: Answer, questionId: number) => {
    const newUserAnswersArr = [...userAnswers, {
      questionId,
      answerId: answer.id,
    }];
    setUserAnswers(newUserAnswersArr); // Add the answer to the user's answers

    if (answer.isCorrect) {
      setScore(score + 1); // Increase the score if the answer is correct
    }
  };

  // Function to handle quiz submission
  const handleSubmit = async () => {
    try {
      const subId = await saveSubmission({ score }, props.quizz.id); // Save the submission
    } catch (e) {
      console.log(e); // Log any errors
    }

    setSubmitted(true); // Mark the quiz as submitted

    // Show a toast notification based on the score
    if (score >= questions.length / 2) {
      toast.success("Congratulations! You did very well!");
    } else {
      toast.error("Better luck next time. Try again!");
    }
  };

  // Function to handle navigating to the previous question
  const handlePressPrev = () => {
    if (currentQuestion !== 0) {
      setCurrentQuestion(prevCurrentQuestion => prevCurrentQuestion - 1); // Move to the previous question
    }
  };

  // Function to handle exiting the quiz
  const handleExit = () => {
    router.push('/dashboard'); // Navigate back to the dashboard
  };

  // Calculate the user's score as a percentage
  const scorePercentage: number = Math.round((score / questions.length) * 100);

  // Find the selected answer and check if it is correct
  const selectedAnswer: number | null | undefined = userAnswers.find((item) => item.questionId === questions[currentQuestion].id)?.answerId;
  const isCorrect: boolean | null | undefined = questions[currentQuestion].answers.findIndex((answer) => answer.id === selectedAnswer) !== -1 ? questions[currentQuestion].answers.find((answer) => answer.id === selectedAnswer)?.isCorrect : null;

  return (
    <div className="flex flex-col flex-1">
      <ToastContainer />
      {submitted ? (
        <QuizzSubmission
          score={score}
          scorePercentage={scorePercentage}
          totalQuestions={questions.length}
        />
      ) : (
        <>
          <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
            <header className="grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2 gap-2">
              <Button size="icon" variant="outline" onClick={handlePressPrev}><ChevronLeft /></Button>
              <ProgressBar 
                value={(currentQuestion / questions.length) * 100} 
                totalQuestions={questions.length} 
              />
              <Button size="icon" variant="outline" onClick={handleExit}>
                <X />
              </Button>
            </header>
          </div>
          <main className="flex justify-center flex-1">
            {!started ? <h1 className="text-3xl font-bold">Welcome to the quizz page👋</h1> : (
              <div>
                <h2 className="text-3xl font-bold">{questions[currentQuestion].questionText}</h2>
                <div className="grid grid-cols-1 gap-6 mt-6">
                  {questions[currentQuestion].answers.map(answer => {
                    const variant = selectedAnswer === answer.id ? (answer.isCorrect ? "neoSuccess" : "neoDanger") : "neoOutline";
                    return (
                      <Button key={answer.id} disabled={!!selectedAnswer} variant={variant} size="xl" onClick={() => handleAnswer(answer, questions[currentQuestion].id)} className="disabled:opacity-100">
                        <p className="whitespace-normal">{answer.answerText}</p>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
          </main>
          <footer className="footer pb-9 px-6 relative mb-0">
            <ResultCard isCorrect={isCorrect} correctAnswer={questions[currentQuestion].answers.find(answer => answer.isCorrect === true)?.answerText || ""} />
            {currentQuestion === questions.length - 1 ? (
              <Button variant="neo" size="lg" onClick={handleSubmit}>Submit</Button>
            ) : (
              <Button variant="neo" size="lg" onClick={handleNext}>
                {!started ? 'Start' : 'Next'}
              </Button>
            )}
          </footer>
        </>
      )}
    </div>
  );
}
