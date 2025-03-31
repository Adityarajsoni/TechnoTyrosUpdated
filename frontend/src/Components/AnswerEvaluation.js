import React, { useState } from 'react';
import './AnswerEvaluation.css';

const AnswerEvaluation = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [className, setClassName] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setError('');
        setResult('');
    };

    const handleUpload = async () => {
        if (!file || !name || !className || !rollNumber) {
            setError('Please fill in all fields and select a file to upload.');
            return;
        }

        const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
        if (!allowedTypes.includes(file.type)) {
            setError('Please upload a valid file (PDF, DOCX, TXT).');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('class', className);
        formData.append('rollNumber', rollNumber);

        try {
            const response = await fetch('https://api.gemini.com/evaluate', { // Replace with actual Gemini API endpoint
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setResult(`Score: ${data.score}`); // Adjust based on actual response structure
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while uploading the file. Please try again.');
        }
    };

    const handleDashboardRedirect = () => {
        // Redirect to the dashboard (replace with actual dashboard URL)
        window.location.href = '/dashboard';
    };

    return (
        <div className="container">
            <h1>Answer Evaluation</h1>
            <p>Upload your file for evaluation.</p>
            <input
                type="text"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Class"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Roll Number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
            />
            <input type="file" onChange={handleFileChange} accept=".pdf,.docx,.txt" />
            <button onClick={handleUpload}>Upload and Evaluate</button>
            {error && <div className="error">{error}</div>}
            {result && <div className="result">{result}</div>}
            <button className="dashboard-button" onClick={handleDashboardRedirect}>Go to Dashboard</button>
        </div>
    );
};

export default AnswerEvaluation;