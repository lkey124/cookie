import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Generator from './components/Generator';
import LoginHandler from './components/LoginHandler';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Routes>
          <Route path="/" element={<Generator />} />
          <Route path="/auth/login" element={<LoginHandler />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;