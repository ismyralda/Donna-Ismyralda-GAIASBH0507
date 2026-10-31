import { useState } from "react";
import './App.css'

const API_URL = "http://localhost:8000/genai/translate";
const LANGUAGES = ["English", "Malay", "German", "French", "Spanish", "Chinese", "Japanese", "Korean"];

export default function App() {
  const [inputLanguage, setInputLanguage] = useState("English");
  const [outputLanguage, setOutputLanguage] = useState("German");
  const [textInput, setTextInput] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleTranslate() {
    if (!textInput.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input_language: inputLanguage,
          output_language: outputLanguage,
          text: textInput,
        }),
      });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      setTranslatedText(data.translated_text);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="page">
        <div className="card">
          <h1>Text Translator</h1>

          <div className="row">
            <label className="field">
              <span>Input Language</span>
              <select value={inputLanguage} onChange={(e) => setInputLanguage(e.target.value)}>
                {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
              </select>
            </label>
            <label className="field">
              <span>Output Language</span>
              <select value={outputLanguage} onChange={(e) => setOutputLanguage(e.target.value)}>
                {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
              </select>
            </label>
          </div>

          <div className="row">
            <label className="field">
              <span>Enter text to translate</span>
              <textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} />
            </label>
            <label className="field">
              <span>Translation</span>
              <textarea value={translatedText} readOnly />
            </label>
          </div>

          {error && <p className="error">{error}</p>}

          <button onClick={handleTranslate} disabled={loading || !textInput.trim()}>
            {loading ? "TRANSLATING..." : "TRANSLATE"}
          </button>
        </div>
      </div>
    </>
  );
}