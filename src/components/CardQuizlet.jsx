import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Loading } from '../components'
import { API } from '../utilities'

const QuizForm = ({ quizData, courseName, topicName, time }) => {
    const email = localStorage.getItem('userEmail')

    const [answers, setAnswers] = useState({});
    // const [score, setScore] = useState(null);
    const [showAnswers, setShowAnswers] = useState({});

  const [isLoading, setIsLoading] = useState(false)

    const handleOptionChange = (questionIndex, selectedOption) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: selectedOption,
        }));
    };

    // const calculateScore = () => {
    //     let totalScore = 0;
    //     quizData.forEach((question, index) => {
    //         if (answers[index] === question.Answer) {
    //             totalScore++;
    //         }
    //     });
    //     console.log(totalScore)
    //     setScore(totalScore);
    // };

    const toggleAnswer = (questionIndex) => {
        setShowAnswers((prevShowAnswers) => ({
            ...prevShowAnswers,
            [questionIndex]: !prevShowAnswers[questionIndex],
        }));
    };

    const handleSubmit = async () => {
        try {
            let score = 0;
            quizData.forEach((question, index) => {
                if (answers[index] === question.Answer) {
                    score++;
                }
            });
            console.log(quizData, '))))))))')
            const totalScore = quizData.length
            const percentScore = Math.floor((score*100)/totalScore)
            console.log(totalScore, percentScore, score)
            const data = {
                email,
                subject: courseName,
                topic: topicName,
                timestamp: time,
                score: percentScore
            }
            console.log(data)
            setIsLoading(true)
            const res = await API.addNewAttempt(data);
            setIsLoading(false)
            console.log(res.data)
            toast('Scored submitted Successfully', { theme: "dark" });
          } catch (error) {
            console.error('Error calling add new attempt:', error);
            toast.error('Bad Request: Could not submit the quiz', { theme: "dark" });
            setIsLoading(false)
          }
    };

    return (
        <div>

        <ToastContainer />
        <Loading isLoading={isLoading} />

        {quizData.map((question, index) => (
            <div key={index} className='cardQuiz_container'>
                <div className='cardQuiz_question'>{question.Question}</div>

                {question.Options && <div className='cardQuiz_intruction'>Select the correct option</div>}

                <div className='cardQuiz_optionsContainer'>
                    {question.Options && question.Options.map((opt, optIdx) => (
                        <div key={optIdx}>
                            <input
                                className='cardQuiz_radio'
                                type="radio"
                                id={`q${index}_opt${optIdx}`}
                                name={`q${index}`}
                                value={opt}
                                onChange={() => handleOptionChange(index, opt)}
                            />
                            <label className='cardQuiz_label' htmlFor={`q${index}_opt${optIdx}`}>{opt}</label>
                        </div>
                    ))}

                        
                </div>

                {!question.Options && (
                            <div className='toggle_container'>
                                {!showAnswers[index] && <button className='btn toggle_btn' onClick={() => toggleAnswer(index)}>Show Answer</button>}
                                
                                {showAnswers[index] && (
                                    <>
                                        <button className='btn toggle_btn' onClick={() => toggleAnswer(index)}>Hide Answer</button>
                                        <span className='toggle_ans'>{question.Answer}</span>
                                    </>
                                )}
                            </div>
                        )}

            </div>
        ))}

        <button className='btn' onClick={handleSubmit}>Submit</button>

        {/* {score !== null && <p>Your score: {score}/{quizData.length}</p>} */}

        </div>
    );
};

export default QuizForm;