import React from 'react';
import './App.css';

function App() {
  const openNotepad = () => {
    window.electronAPI.openNotepad();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Electron-React Notepad Opener</h1>
        <button onClick={openNotepad}>Open Notepad</button>
      </header>
    </div>
  );
}

export default App;
