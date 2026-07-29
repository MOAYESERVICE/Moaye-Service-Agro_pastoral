import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Auth() {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="auth-page-container">
      <div className="auth-card-box">
        
        {/* Bouton retour accueil */}
        <button className="btn-back-home" onClick={() => navigate('/')}>
          ➔ Retour au site
        </button>

        {!isRegistering ? (
          /* FORMULAIRE DE CONNEXION */
          <>
            <h2>Espace Connexion</h2>
            <p className="auth-subtitle">Accédez à votre espace client Moaye Service</p>
            
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="auth-input-group">
                <label>Identifiant ou Adresse Email *</label>
                <input type="text" placeholder="Entrez votre identifiant" required />
              </div>
              <div className="auth-input-group">
                <label>Mot de passe *</label>
                <input type="password" placeholder="••••••••" required />
              </div>
              <button type="submit" className="btn-auth-main">SE CONNECTER</button>
            </form>
            
            <p className="auth-switch-link">
              Nouveau client ? <span onClick={() => setIsRegistering(true)}>Créer un compte ici</span>
            </p>
          </>
        ) : (
          /* FORMULAIRE D'INSCRIPTION */
          <>
            <h2>Création de Compte</h2>
            <p className="auth-subtitle">Rejoignez l'écosystème Moaye Service</p>
            
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="auth-input-group">
                <label>Nom Complet *</label>
                <input type="text" placeholder="Ex: Kouadio Konan" required />
              </div>
              <div className="auth-input-group">
                <label>Adresse Email *</label>
                <input type="email" placeholder="Ex: nom@mail.com" required />
              </div>
              <div className="auth-input-group">
                <label>Mot de passe *</label>
                <input type="password" placeholder="Créez un mot de passe sécurisé" required />
              </div>
              <button type="submit" className="btn-auth-main">S'INSCRIRE MAINTENANT</button>
            </form>
            
            <p className="auth-switch-link">
              Déjà un compte ? <span onClick={() => setIsRegistering(false)}>Se connecter</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
