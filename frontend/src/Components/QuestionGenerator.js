import React, { useState, useCallback } from 'react';
import './QuestionGenerator.css';

const QuestionGenerator = () => {
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState('medium');
  const [numQuestions, setNumQuestions] = useState(1);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [file, setFile] = useState(null);
  const [stats, setStats] = useState({
    questionsGenerated: 0,
    positiveFeedback: 0,
    currentStreak: 0
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const generateQuestions = useCallback(async () => {
    if (!file) {
      alert("Please upload a file before generating questions.");
      return;
    }

    setLoading(true);
    setFeedback(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('difficulty', difficulty);
    formData.append('num_questions', numQuestions);

    try {
      const response = await fetch('http://localhost:5000/api/generate-questions', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.questions) {
        setQuestions(data.questions);
        setStats((prev) => ({
          ...prev,
          questionsGenerated: prev.questionsGenerated + data.questions.length
        }));
      } else {
        setFeedback('Error generating questions');
      }
    } catch (error) {
      console.error('Error:', error);
      setFeedback('Error generating questions');
    } finally {
      setLoading(false);
    }
  }, [difficulty, numQuestions, file]);

  // Function to save questions as a .txt file
  const saveQuestions = () => {
    if (questions.length === 0) return;

    const textContent = questions.join('\n');
    const blob = new Blob([textContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Generated_Questions.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="question-container">
      <header className="header">
        <h1 className="main-title">
          <i className='bx bx-brain'></i>
          AI Question Generator
        </h1>
        <p className="subtitle">Generate questions based on uploaded content</p>
      </header>

      <div className="question-card">
        <div className="controls-section">
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-value">{stats.questionsGenerated}</div>
              <div className="stat-label">Questions Generated</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.currentStreak}</div>
              <div className="stat-label">Current Streak</div>
            </div>
          </div>

          {/* File Upload */}
          <div className="control-group">
            <label className="control-label">
              <i className='bx bx-upload'></i>
              Upload File (PDF/TXT)
            </label>
            <input
              type="file"
              className="control-input"
              accept=".txt, .pdf, .docx"
              onChange={handleFileChange}
            />
          </div>

          {/* Number of Questions */}
          <div className="control-group">
            <label className="control-label">
              <i className='bx bx-list-ul'></i>
              Number of Questions
            </label>
            <input
              type="number"
              className="control-input"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              min="1"
            />
          </div>

          {/* Difficulty Selection */}
          <div className="control-group">
            <label className="control-label">
              <i className='bx bx-slider-alt'></i>
              Difficulty Level
            </label>
            <select
              className="control-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            className="generate-button"
            onClick={generateQuestions}
            disabled={loading || !file}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Generating...
              </>
            ) : (
              <>
                <i className='bx bx-refresh'></i>
                Generate Questions
              </>
            )}
          </button>
          {feedback && <div className="feedback-message">{feedback}</div>}
        </div>

        {/* Display Generated Questions */}
        <div className="question-display-section">
          {questions.length > 0 && (
            <div className="question-display">
              {questions.map((q, index) => (
                <p key={index} className="question-text">
                  <i className='bx bx-bulb' style={{ marginRight: '10px' }}></i>
                  {q}
                </p>
              ))}
            </div>
          )}

          {/* Save Questions Button */}
          <button
            className="save-button"
            onClick={saveQuestions}
            disabled={questions.length === 0}
          >
            <i className='bx bx-save'></i> Save Questions
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionGenerator;
