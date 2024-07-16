"use client";
import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { set } from "react-hook-form";
import ProgressBar from "@/components/progressBar";
import { ChevronLeft, X } from "lucide-react";
import ResultCard from "./ResultCard";
import QuizzSubmission from "./QuizzSubmission";
import { InferSelectModel } from "drizzle-orm";
import { questionAnswers, questions as DbQuestions, quizzes } from "@/db/schema";
import { useRouter } from "next/navigation";

type Answer = InferSelectModel<typeof questionAnswers>
type Question = InferSelectModel<typeof DbQuestions> & {answers: Answer[]};
type Quizz = InferSelectModel<typeof quizzes> & {questions: Question[]};
type Props = {
    quizz: Quizz
}

export default function QuizzQuestions(props: Props) {
    const { questions } = props.quizz; 
    const [started, setStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0); 
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState<{ questionId: number, answerId: number}[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const router = useRouter();

    const handleNext = () =>{
        if(!started){
            setStarted(true);
            return;
        }
        if(currentQuestion < questions.length - 1){
            setCurrentQuestion(currentQuestion + 1);
        }
        else{
            setSubmitted(true);
            return;
        }
    }

    const handleAnswer = (answer: Answer, questionId: number) => {
        const newUserAnswerArr = [...userAnswers, {
            answerId: answer.id,
            questionId
        }];
        setUserAnswers(newUserAnswerArr);
        const isCurrentCorrect = answer.isCorrect;
        if(isCurrentCorrect) {
            setScore(score + 1);
        }
    }

    const handlePressPrev = () => {
        if (currentQuestion !== 0) {
            setCurrentQuestion(prevCurrentQuestion =>
                prevCurrentQuestion - 1);
        }
    }

    const handleExit = () => {
        router.push('dashboard');
    }

    const scorePercentage: number = Math.round((score / questions.length) * 100);
    const selectedAnswer: number | null | undefined = userAnswers.find((item) =>
        item.questionId === questions[currentQuestion].id)?.answerId;
    const isCorrect: boolean | null | undefined = questions[currentQuestion].answers.findIndex((answer) => answer.id === selectedAnswer) ?
    questions[currentQuestion].answers.find((answer) => answer.id === selectedAnswer)?.isCorrect : null;

    if(submitted) {
        return (
            <QuizzSubmission
                score={score}
                scorePercentage={scorePercentage}
                totalQuestions={questions.length}
                />  
                
        )
    }

  return (
    <div className="flex flex-col flex-1">
        <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
            <header className="grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2 gap-2">
                
                <Button size="icon" variant="outline" onClick={handlePressPrev}><ChevronLeft/></Button>
                <ProgressBar value={(currentQuestion / questions.length) * 100} />
                <Button size="icon" variant="outline" onClick={handleExit}><X/></Button>

            </header>
        </div>
      <main className="flex justify-center flex-1">
        {!started ?  <h1 className="text-3xl font-bold">Welcome to QuizzerAI👋</h1> : (
            <div>
                <h2 className="text-3xl font-bold">{questions[currentQuestion].questionText}</h2>
                <div className="grid grid-cols-1 gap-6 mt-6">
                    {
                        questions[currentQuestion].answers.map(answer => {
                            const variant = selectedAnswer === answer.id ? (answer.isCorrect ? "neoSuccess" : "neoDanger") : "neoOutline";
                            return(
                                <Button key={answer.id} disabled={!!selectedAnswer} variant={variant} size="xl" onClick={() => handleAnswer(answer, questions[currentQuestion].id)}
                                className="disabled:opacity-100">
                                    <p className="whitespace-normal">{answer.answerText}</p>
                                </Button>
                            )
                        })
                    }
                </div>
            </div>
        )}
      </main>
    <footer className="footer pb-9 px-6 relative mb-0">
        <ResultCard isCorrect={isCorrect} correctAnswer={questions[currentQuestion].answers.find(answer => answer.isCorrect === true)?.answerText || "" }/>
        <Button variant='neo' size="lg" onClick={handleNext}>{!started ? 'Start' : (currentQuestion === questions.length - 1) ? 'Submit' : 'Next'}</Button>
    </footer>
    </div>
  )
}