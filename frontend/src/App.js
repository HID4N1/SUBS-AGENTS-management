import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//Client Pages 
import LandingPage from './client/pages/LandingPage';
import MultiStepForm from './client/pages/MultiStepForms';



// external libraries
// import axios from 'axios';


function App() {
return (  
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/form/personel-information" element={<MultiStepForm />} />
        </Routes>
      </div>
    </Suspense>
  </Router>
    
  );
}

export default App;
