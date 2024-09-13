import React from 'react';
import './app.css';
import LunarCalendar from './components/LunarCalendar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Calendario Lunar</h1>
      </header>
      <LunarCalendar />
    </div>
  );
}

export default App;
