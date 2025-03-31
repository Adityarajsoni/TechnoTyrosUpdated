import React from "react";
import { Link } from "react-router-dom";
import "./Features.css";

const features = [
  {
    name: "AI-Powered Answer Sheet Checker",
    description:
      "Automatically evaluates answer sheets, highlights mistakes, and provides detailed feedback based on predefined rubrics. Saves time and ensures fair grading.",
    icon: "📄",
    address: "#",
  },
  {
    name: "Generate Question Paper",
    description:
      "Automatically generate high-quality question papers based on syllabus, difficulty level, and topic weightage. Customize questions for different exams with AI-driven suggestions.",
    icon: "📝",
    address: "#",
  },
  {
    name: "Performance Analytics Dashboard",
    description:
      "A comprehensive dashboard that provides insights into class performance, student progress, and subject-wise strengths and weaknesses. Helps teachers make data-driven decisions.",
    icon: "📊",
    address: "#",
  },
  {
    name: "Personalized Feedback",
    description:
      "Provides individualized feedback to students, helping them understand their strengths and areas for improvement with AI-driven insights.",
    icon: "💡",
    address: "#",
  },
];

export default function Features() {
  return (
    <div id="feature">
      <div className="features-container">
        <div className="features-header">
          <h2 className="sub-heading">Effortless Teaching with AI</h2>
          <h1 className="main-heading">Automate, Analyze, and Accelerate Learning</h1>
          <p className="intro-text">
            Generate customized question papers in seconds, track student performance with real-time insights, 
            and grade answer sheets effortlessly using AI. Save time, ensure accuracy, and focus on what truly matters—teaching.
          </p>
        </div>
        <div className="features-list">
          {features.map((feature, index) => (
            <Link to={feature.address} className="feature-item" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-content">
                <h3 className="feature-title">{feature.name}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
