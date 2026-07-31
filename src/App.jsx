import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './page/Home';
import Auth from './page/Auth'; 
import ContactPage from './page/ContactPage';
import DemandeDevis from './page/DemandeDevis';
import ExpertisePage from './page/ExpertisePage';
import VisionPage from './page/VisionPage';
import EngagementsPage from './page/EngagementsPage';
import SuccessPage from './page/SuccessPage';
import './App.css';

export default function App() {
  const [messageDuBackend, setMessageDuBackend] = useState('Chargement du message...');

  useEffect(() => {
    fetch('http://localhost:5000/api/message')
      .then(res => res.json())
      .then(data => setMessageDuBackend(data.text))
      .catch(() => setMessageDuBackend('Erreur de connexion au backend'));
  }, []);

  return (
    <Router>
      <div className="app-container">
        <div style={{ padding: '10px', textAlign: 'center', backgroundColor: '#e0f7fa', color: '#006064', fontWeight: 'bold' }}>
          {messageDuBackend}
        </div>

        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<Auth />} />
          <Route path="/nous-contacter" element={<ContactPage />} />
          <Route path="/demande-devis" element={<DemandeDevis />} />
          <Route path="/nos-expertises" element={<ExpertisePage />} />
          <Route path="/notre-vision" element={<VisionPage />} />
          <Route path="/nos-engagements" element={<EngagementsPage />} />
          <Route path="/confirmation-succes" element={<SuccessPage />} />
        </Routes>
      </div>
    </Router>
  );
}
