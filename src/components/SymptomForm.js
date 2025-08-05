import React, { useState } from "react";
import { getDiagnosis } from "../services/huggingFaceAPI";

const SymptomForm = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const response = await getDiagnosis(symptoms);

    if (response.error) {
      setError(response.error);
      setResult(null);
    } else {
      setResult(response.answer || response);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          cols="50"
          placeholder="Enter symptoms like: I have headache and cough..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
        <br />
        <button type="submit">Diagnose</button>
      </form>

      {error && (
        <div className="error" style={{ color: "red", marginTop: "10px" }}>
          {error}
        </div>
      )}

      {result && !error && (
        <div className="result" style={{ marginTop: "20px" }}>
          <h3>AI Diagnosis Suggestion:</h3>
          <p style={{ fontSize: "1.2rem", color: "#ff0572ff" }}>{result}</p>
        </div>
      )}
    </div>
  );
};

export default SymptomForm;
