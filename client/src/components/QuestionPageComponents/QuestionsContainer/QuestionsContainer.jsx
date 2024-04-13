import React, { useState, useEffect } from 'react';
import { useQuestionsContext } from '../../../hooks/useQuestionsContext';

import './QuestionsContainer.css';

import QuestionAddForm from '../QuestionAddForm/QuestionAddForm';
import QuestionListDisplay from '../QuestionListDisplay/QuestionListDisplay';
import QuestionDetail from '../QuestionDetail/QuestionDetail';

const QuestionsContainer = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedQuestionId, setSelectedQuestionId] = useState('');
  const { questions, removeQuestion, loading } = useQuestionsContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (questions.length > 0) {
      const filter = searchTerm === '' ? questions : questions.filter(question =>
        question.questionText && question.questionText.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredQuestions(filter);
    }
  }, [searchTerm, questions.length]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleButtonClick = () => {
    setCurrentView(currentView === 'list' ? 'form' : 'list');
  };

  const handleDeleteQuestion = (questionId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this question?");
    if (isConfirmed) {
      removeQuestion(questionId);
      if (currentView === 'detail') {
        setCurrentView('list'); // Return to list after deletion
      }
    }
  };

  const selectedQuestion = questions?.find(question => question._id === selectedQuestionId);

  return (
    <div className="questions-container">
      <div className="questions-header">
        <h1>
          {currentView === 'list' ? 'Questions' :
            currentView === 'form' ? 'Add a Question' :
              'Question Details'}
        </h1>
        <button className="toggle-view-btn" onClick={handleButtonClick}>
          {currentView === 'list' ? 'New Question' : 'Show Questions'}
        </button>
      </div>
      {currentView === 'list' && (
        <>
          <div className="questions-search">
            <input type="text" placeholder="Search for questions" value={searchTerm} onChange={handleSearch} />
          </div>
          <QuestionListDisplay
            filteredQuestions={filteredQuestions}
            handleCardClick={(id) => {
              setSelectedQuestionId(id);
              setCurrentView('detail');
            }}
            deleteQuestion={handleDeleteQuestion}
            isLoading={loading}
          />
        </>
      )}
      {currentView === 'form' && (
        <QuestionAddForm 
        setShowListView={() => setCurrentView('list')}
        setIsLoading={setIsLoading}
        IsLoading={isLoading}
        

         />
      )}
      {currentView === 'detail' && (
        loading ? (
          <p>Loading question details...</p>
        ) : (
          <QuestionDetail question={selectedQuestion} />
        )
      )}
    </div>
  );
}

export default QuestionsContainer;
