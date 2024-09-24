import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookPage from './pages/BookPage.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookPage />} />
      </Routes>
    </Router>
  );
};

export default App;
