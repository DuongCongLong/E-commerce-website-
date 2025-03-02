import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import "./assets/sass/app.scss";
import Main from './layouts/Main';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    </Router>
  );
}

export default App;