import React, { useState } from 'react';

const QuizForm = ({ quizData }) => {
    const email = localStorage.getItem('userEmail')
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [showAnswers, setShowAnswers] = useState({});

    const handleOptionChange = (questionIndex, selectedOption) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: selectedOption,
        }));
    };

    const calculateScore = () => {
        let totalScore = 0;
        quizData.forEach((question, index) => {
            if (answers[index] === question.Answer) {
                totalScore++;
            }
        });
        setScore(totalScore);
    };

    const toggleAnswer = (questionIndex) => {
        setShowAnswers((prevShowAnswers) => ({
            ...prevShowAnswers,
            [questionIndex]: !prevShowAnswers[questionIndex],
        }));
    };

    const handleSubmit = () => {
        calculateScore();
        console.log(quizData, '))))))))')
        const percentScore = (score*100) / quizData.length

        const data = {
            email,
            // subject: courseName,
            // topic: topicName,
            // timestamp: ,
            score: percentScore
        }

        console.log(data)
    };

    return (
        <div>
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

        {score !== null && <p>Your score: {score}/{quizData.length}</p>}

        </div>
    );
};

export default QuizForm;