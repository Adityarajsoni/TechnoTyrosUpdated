import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Features from './Components/Features';
import Contact from './Components/Contact';
import SignUp from './Components/SignUp';
import Login from './Components/Login';

import QuestionGenerator from './Components/QuestionGenerator';
import ClassDashboard from './Components/Dashboard';
import AnswerEvaluation from './Components/AnswerEvaluation';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><Features /><Contact /><Footer /></>} />
        <Route path="/SignUp" element={<><SignUp /><Footer /></>} />
        <Route path="/Login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/Dashboard" element={<ProtectedRoute><ClassDashboard /></ProtectedRoute>} />
        <Route path="/QuestionGenerator" element={<ProtectedRoute><QuestionGenerator /></ProtectedRoute>} />
        <Route path="/AnswerEvaluation" element={<ProtectedRoute><AnswerEvaluation /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
