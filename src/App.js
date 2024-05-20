import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [script, setScript] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_PYTHON_SCRIPT_RUNNER_BE_URL}/run-script`, { script });
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error running script:', error);
      setOutput('Error running script');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Python Script Runner</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border rounded mb-4"
            rows="10"
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Enter your Python script here..."
          ></textarea>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Run Script</button>
        </form>
        {output && (
          <div className="mt-4 p-4 bg-gray-200 rounded">
            <h2 className="text-xl font-bold mb-2">Output:</h2>
            <pre>{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;