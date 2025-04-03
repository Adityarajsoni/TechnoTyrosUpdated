from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
from process_text import extract_text, generate_questions, save_as_txt, save_as_docx, save_as_pdf

app = Flask(__name__)

# Allow CORS for your frontend URL
CORS(app, resources={r"/api/*": {"origins": "https://techno-tyros-updated.vercel.app"}})

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/api/generate-questions", methods=["POST"])
def generate_questions_api():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    difficulty = request.form.get("difficulty", "medium")  # Default to medium
    num_questions = int(request.form.get("num_questions", 5))  # Default to 5

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    print(f"Received: num_questions={num_questions}, difficulty={difficulty}")  # Debugging Print 

    try:
        text = extract_text(file_path)
        print(f"Processing file: {file.filename}, Difficulty: {difficulty}, Num Questions: {num_questions}")

        questions = generate_questions(text, difficulty, num_questions)
        return jsonify({"questions": questions})
    except Exception as e:
        print("Error generating questions:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route("/api/save-questions", methods=["POST"])
def save_questions_api():
    data = request.json
    questions = data.get("questions", [])
    file_type = data.get("file_type", "txt")

    if not questions:
        return jsonify({"error": "No questions to save"}), 400

    file_path = None
    try:
        if file_type == "txt":
            file_path = save_as_txt(questions)
        elif file_type == "docx":
            file_path = save_as_docx(questions)
        elif file_type == "pdf":
            file_path = save_as_pdf(questions)

        if file_path:
            return send_file(file_path, as_attachment=True)
        else:
            return jsonify({"error": "Failed to save file"}), 500
    except Exception as e:
        print("Error saving questions:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
