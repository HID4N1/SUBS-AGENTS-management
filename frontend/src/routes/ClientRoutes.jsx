import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



// Client Pages
import LandingPage from '../client/pages/LandingPage';
import MultiStepForm from '../client/pages/MultiStepForms';
import Confirmation from '../client/pages/Confirmation';


function ClientRoute() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/form/Forms" element={<MultiStepForm />} />
            <Route path="/form/confirmation" element={<Confirmation />} />
        </Routes>
    );
    }
export default ClientRoute;
