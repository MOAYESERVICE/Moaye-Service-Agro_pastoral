import React from 'react';
// 1. IMPORTATION DU SYSTÈME DE ROUTES
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './page/Home';
// 2. IMPORTATION DE LA NOUVELLE PAGE DE CONNEXION / INSCRIPTION
import Auth from './page/Auth'; 
// 3. MISE A JOUR : IMPORTATION DE VOTRE FICHIER CONTACTPAGE EXIStANT
import ContactPage from './page/ContactPage';
import './App.css';
import DemandeDevis from './page/DemandeDevis';


export default function App() {
  return (
    <Router>
      <div className="app-container">
        {/* La Navbar reste visible en permanence en haut du site */}
        <Navbar />
        
        {/* SYSTÈME DE REDIRECTION INTELLIGENT */}
        <Routes>
          {/* Route par défaut : charge la page d'accueil principale avec toutes vos sections */}
          <Route path="/" element={<Home />} />
          
          {/* Route dédiée : se charge au clic sur l'icône de l'utilisateur */}
          <Route path="/connexion" element={<Auth />} />

          {/* MISE A JOUR CRITIQUE : Ajout de la route pour le bouton Contactez-nous */}
          <Route path="/nous-contacter" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}
