import './App.css';
import React from 'react';

// import Client Components for Test
import Footer from './client/components/Footer';
import Header from './client/components/Header';
import Newsletter from './client/components/Newsletter';
import StepCard from './client/components/StepCard';
import FeatureCard from './client/components/FeatureCard';



// external libraries
// import axios from 'axios';


function App() {
return (  
    <div className="App">

      {/* ila bghito tchfo chi component 
      7aydo lih l comment  ou runniw server */}

      {/* use the variables in frontend/src/Styles/Variables.css
      by importing it into the working file */}



      <Header />
      <main>
        {/* <StepCard /> */}
        
        {/* <FeatureCard /> */}
      </main>
      {/* <Newsletter /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
