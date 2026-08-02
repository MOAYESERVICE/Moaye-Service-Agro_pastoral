import React, { useState } from 'react';
import './Navbar.css';
import { User, Menu, X, MessageCircle } from 'lucide-react'; 
import logoImg from '../assets/logo.png'; 
import { Link, useLocation, useNavigate } from 'react-router-dom'; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Fonction de gestion du clic sur l'icône utilisateur
  const handleAccountClick = () => {
    if (location.pathname === '/connexion') {
      navigate('/'); 
    } else {
      navigate('/connexion'); 
    }
  };

  // Fonction pour faire défiler la page d'accueil vers les sections spécifiques
  const handleScrollToSection = (sectionId) => {
    setIsOpen(false);
    
    // Si on n'est pas sur la page d'accueil, on y va d'abord
    if (location.pathname !== '/') {
      navigate('/');
      // Petit délai pour laisser le temps à la page d'accueil de se charger
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Si on est déjà sur l'accueil, on défile directement
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
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

      {/* 2. Liens au milieu corrigés avec la navigation React */}
      <ul className={`navbar-links ${isOpen ? 'active' : ''}`} style={{ display: 'flex', listStyle: 'none', gap: '2.5rem', margin: 0, padding: 0, alignItems: 'center' }}>
        <li>
          <Link to="/" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: '#333333', fontWeight: '600', fontSize: '0.95rem' }}>
            Accueil
          </Link>
        </li>
        <li>
          <button onClick={() => handleScrollToSection('services')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#333333', fontWeight: '600', fontSize: '0.95rem', fontFamily: 'inherit' }}>
            Services
          </button>
        </li>
        <li>
          <button onClick={() => handleScrollToSection('expertises')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#333333', fontWeight: '600', fontSize: '0.95rem', fontFamily: 'inherit' }}>
            Expertises
          </button>
        </li>
        <li>
          <button onClick={() => handleScrollToSection('contact')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#333333', fontWeight: '600', fontSize: '0.95rem', fontFamily: 'inherit' }}>
            Contact
          </button>
        </li>
      </ul>

      {/* 3. Actions de droite */}
      <div className="navbar-right-actions">
        
        <button 
          onClick={handleAccountClick}
          className={`nav-icon-btn account-btn ${location.pathname === '/connexion' ? 'active' : ''}`} 
          aria-label="Mon Compte / Fermer"
          style={{ border: 'none', cursor: 'pointer', background: 'none' }}
        >
          {location.pathname === '/connexion' ? <X size={20} /> : <User size={20} />}
        </button>

        <Link to="/nous-contacter" className="btn-whatsapp-pill" style={{ textDecoration: 'none' }}>
          <span className="whatsapp-bubble-icon">
            <MessageCircle size={18} />
          </span>
          <span className="btn-text-nav">Contactez-nous</span>
        </Link>

      </div>
    </nav>
  );
}
