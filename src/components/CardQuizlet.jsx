import React, { useState } from 'react';

const QuizForm = ({ quizData }) => {
const [answers, setAnswers] = useState({});
const [score, setScore] = useState(null);

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

const handleSubmit = () => {
    calculateScore();
};

return (
    <div>
    {quizData.map((question, index) => (
        <div key={index} className='cardQuiz_container'>
            <div className='cardQuiz_question'>{question.Question}</div>

            <div className='cardQuiz_intruction'>Select the correct option</div>
            <div className='cardQuiz_optionsContainer'>
                {question.Options.map((opt, optIdx) => (
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

        </div>
    ))}

    <button className='btn' onClick={handleSubmit}>Submit</button>

    {score !== null && <p>Your score: {score}/{quizData.length}</p>}

    </div>
);
};

export default QuizForm;