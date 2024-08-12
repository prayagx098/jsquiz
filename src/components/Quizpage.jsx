import React, { useState, useEffect } from 'react';
import Quest from '../data/quest.json';
import { useNavigate } from 'react-router-dom';




function Quizpage() {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [usedQuest, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [qno, setQuestionNumber] = useState(1);

    const navigate = useNavigate();
    function homeNavi() {
    navigate('/')
    }
    useEffect(() => {
        const loadQuiz = () => {
            const userInfo = localStorage.getItem('userData');
            if (userInfo) {
                try {
                    const userData = JSON.parse(userInfo);
                    const category = userData.category;

                    if (!Quest.questions[category]) {
                        throw new Error(`Category "${category}" not found in questions.`);
                    }

                    const questions = Quest.questions[category];
                    const prevQuesstion = userData.questions || [];
                    setQuestions(prevQuesstion);
                    

           
                    let remQuest = questions.map(ques => !usedQuest.includes(ques.sino) ? ques : null).filter(ques => ques !== null);

                    if (remQuest.length === 0) {
                      remQuest = questions; 
                      setQuestions([]); 
                    }

                    const randomIndex = Math.floor(Math.random() * remQuest.length);
                    const newQuestion = remQuest[randomIndex];


                    prevQuesstion.push(newQuestion.sino);
                    userData.questions = prevQuesstion;
                    localStorage.setItem('userData', JSON.stringify(userData));

                    setCurrentQuestion(newQuestion);
                } catch (error) {
                    console.error('Error loading quiz:', error);
                    setError('Failed to load quiz. Please try again later.');
                }
            } else {
                console.log('Invalid entry');
                setError('User data not found. Please register or log in again.');
            }
            setLoading(false);
        };

        loadQuiz();
    }, []);

    const AnswerQuestion = (answerKey) => {

        if (currentQuestion && answerKey === currentQuestion.answer) {
            setScore(score + 1);
        }

        setTimeout(() => {
            const userInfo = JSON.parse(localStorage.getItem('userData'));
            const category = userInfo.category;
            const questions = Quest.questions[category];
            let remQuest = questions.filter(q => !usedQuest.includes(q.sino));

            if (remQuest.length === 0) {
                setShowScore(true);
            } else {

                const randomIndex = Math.floor(Math.random() * remQuest.length);
                const newQuestion = remQuest[randomIndex];


                const userData = JSON.parse(localStorage.getItem('userData'));
                setQuestionNumber(qno+1);
                userData.questions.push(newQuestion.sino);

                localStorage.setItem('userData', JSON.stringify(userData));

                setQuestions([...usedQuest, newQuestion.sino]);
                
                setCurrentQuestion(newQuestion);
            }
        }, 1000);
    };

    if (loading) {
        return  <div className="bg-gray-100 h-screen flex items-center justify-center">
                  <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 mb-4"></div>
                      <h2 className="text-lg font-semibold">Loading...</h2>
                      <p className="text-gray-500">Please Wait....</p>
                  </div>

                  <style>
                      {`
                      .loader {
                          border-top-color: #3490dc;
                          animation: spin 1s infinite linear;
                      }

                      @keyframes spin {
                          0% { transform: rotate(0deg); }
                          100% { transform: rotate(360deg); }
                      }
                      `}
                  </style>
                </div>;
    }

    if (error) {
        return <div className="errorSection">{error}</div>;
    }

    if (showScore) {
        const userInfo = JSON.parse(localStorage.getItem('userData'));
        return (
          <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Good job {userInfo.username}, </h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              You scored {score} out of {Quest.questions[userInfo.category].length}
            </h2>
            <p className="text-lg text-gray-600">Keep practicing to improve your score.</p>
            <button class="bg-violet-500 text-neutral-50 p-2 rounded-lg hover:bg-violet-950" onClick={homeNavi}>Try Another Quiz ?</button>
          </div>
        </div>
        );
    }

    if (currentQuestion) {
        return (
          <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className='questionno'> Questions : {qno}/10</div>
            <div className="questionSection mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">{currentQuestion.question}</h2>
            </div>
            <div className="answerSection grid gap-4">
              {Object.keys(currentQuestion.options).map((key) => (
                <button
                  key={key}
                  onClick={() => AnswerQuestion(key)}
                  className="bg-violet-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-75"
                >
                  {currentQuestion.options[key]}
                </button>
              ))}
            </div>
          </div>
        </div>
        );
    }

    return <div>Error on loading Question</div>;
}

export default Quizpage;
