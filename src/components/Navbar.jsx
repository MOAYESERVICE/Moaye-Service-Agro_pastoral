import React, { useState } from 'react';
import './Navbar.css';
import { User, Menu, X, MessageCircle } from 'lucide-react'; 
import logoImg from '../assets/logo.png'; 
// CORRECTION : Ajout de useLocation et useNavigate pour la fermeture logique
import { Link, useLocation, useNavigate } from 'react-router-dom'; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Fonction magique de gestion du clic sur l'icône utilisateur
  const handleAccountClick = () => {
    if (location.pathname === '/connexion') {
      navigate('/'); // Si on est déjà sur la page, le clic la "renferme" et retourne à l'accueil
    } else {
      navigate('/connexion'); // Sinon, on ouvre la page de connexion
    }
  };

  return (
    <nav className="navbar">
      
      {/* 1. Zone Logo & Burger Mobile */}
      <div className="navbar-logo-container">
        <button 
          className="navbar-toggle-btn" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className="navbar-logo">
          <Link to="/">
            <img 
              src={logoImg} 
              alt="Logo Officiel Moaye Service" 
              className="navbar-logo-img" 
            />
          </Link>
        </div>
      </div>

      {/* 2. Liens au milieu */}
      <ul className={`navbar-links ${isOpen ? 'active' : ''}`} style={{ display: 'flex', listStyle: 'none', gap: '2.5rem', margin: 0, padding: 0, alignItems: 'center' }}>
        <li><a href="#accueil" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: '#333333', fontWeight: '600', fontSize: '0.95rem' }}>Accueil</a></li>
        <li><a href="#services" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: '#333333', fontWeight: '600', fontSize: '0.95rem' }}>Services</a></li>
        <li><a href="#expertises" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: '#333333', fontWeight: '600', fontSize: '0.95rem' }}>Expertises</a></li>
        <li><a href="#contact" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: '#333333', fontWeight: '600', fontSize: '0.95rem' }}>Contact</a></li>
      </ul>

      {/* 3. Actions de droite */}
      <div className="navbar-right-actions">
        
        {/* CORRECTION DU BOUTON : Devient un interrupteur intelligent */}
        <button 
          onClick={handleAccountClick}
          className={`nav-icon-btn account-btn ${location.pathname === '/connexion' ? 'active' : ''}`} 
          aria-label="Mon Compte / Fermer"
          style={{ border: 'none', cursor: 'pointer' }}
        >
          {location.pathname === '/connexion' ? <X size={20} /> : <User size={20} />}
        </button>

        {/* Le bouton vert redirige vers la page de formulaire */}
        <Link to="/nous-contacter" className="btn-whatsapp-pill">
          <span className="whatsapp-bubble-icon">
            <MessageCircle size={18} />
          </span>
          <span className="btn-text-nav">Contactez-nous</span>
        </Link>

      </div>
    </nav>
  );
}