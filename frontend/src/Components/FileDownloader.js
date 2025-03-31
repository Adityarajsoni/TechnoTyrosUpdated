const FileDownloader = ({ questions }) => {
    const saveQuestions = async (fileType) => {
      const response = await fetch("http://localhost:5000/api/save-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions, file_type: fileType }),
      });
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `questions.${fileType}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
  
    return (
      <div>
        <button onClick={() => saveQuestions("txt")}>Save as TXT</button>
        <button onClick={() => saveQuestions("docx")}>Save as DOCX</button>
        <button onClick={() => saveQuestions("pdf")}>Save as PDF</button>
      </div>
    );
  };
  
  export default FileDownloader;
  