import React from 'react'

export default function Game() {
  const [questions, setQuestions] = React.useState([]);
  const [selectedAnswers, setSelectedAnswers] = React.useState([]);
  const [showResults, setShowResults] = React.useState(false);
  const [shuffledAnswers, setShuffledAnswers] = React.useState([]);
  const [score, setScore] = React.useState(0);
   
   
     React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(response => response.json())
      .then(data => {
        setQuestions(data.results);
      });
  }, []);
  
    React.useEffect(() => {
    if(questions.length > 0){
      const shuffledAnswers = questions.map(question => {
        // Insert the correct answer at a random index
        const incorrectAnswers = [...question.incorrect_answers];
        const randomIndex = Math.floor(Math.random() * (incorrectAnswers.length + 1));
        incorrectAnswers.splice(randomIndex, 0, question.correct_answer);
        return incorrectAnswers;
      });
      setShuffledAnswers(shuffledAnswers);
    }
  }, [questions])
  
  function handleAnswerSelect(questionIndex, answerIndex) {
    if (!showResults) {
      setSelectedAnswers(prevAnswers => {
        const newAnswers = [...prevAnswers];
        newAnswers[questionIndex] = answerIndex;
        return newAnswers;
      });
    }
  }

function handleCheckResults() {
    setShowResults(true);
    // Calculate the score and fill in any missed answers
    let score = 0;
    questions.forEach((question, i) => {
      if (typeof selectedAnswers[i] === 'undefined') {
        selectedAnswers[i] = -1;
      }
      if (shuffledAnswers[i][selectedAnswers[i]] === question.correct_answer) {
        score++;
      }
    });
    setScore(score);
  }

  function handleResetGame() {
    setQuestions([]);
    setSelectedAnswers([]);
    setShowResults(false);
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(response => response.json())
      .then(data => setQuestions(data.results));
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }
  
  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

return (
    <div className="box">
    <div className="blue-blob"></div>
    <div className="yellow-blob"></div>
      {shuffledAnswers.map((answers, questionIndex) => {
        return (
          <div className="q-a-container" key={questions[questionIndex].question}>
            <h1 className="question">{decodeHtml(questions[questionIndex].question)}</h1>
            <div className="answers">
              {answers.map((answer, answerIndex) => {
                let className = 'answer';
                if (showResults) {
                  if (questions[questionIndex].correct_answer === answer) {
                    className += ' correct';
                  } else if (answerIndex === selectedAnswers[questionIndex]) {
                    className += ' incorrect';
                  }
                  else {
                    className += ' inactive';
                  }
                } else if (answerIndex === selectedAnswers[questionIndex]) {
                  className += ' selected';
                }
                return (
                  <div key={answer} className={className} onClick={() => handleAnswerSelect(questionIndex, answerIndex)}>
                    {decodeHtml(answer)}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div >
      {!showResults ? ( <div className="button-check" onClick={handleCheckResults}>Check Answers</div>) : 
      ( <div className="results">
      <h3 className="question">You scored {score}/5 correct answers</h3>
      <div className="button" onClick={handleResetGame}>Play Again</div>
      </div> ) }
     </div>
    </div>
  )
}





