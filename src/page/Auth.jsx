import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Auth() {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  // États pour stocker les saisies de l'utilisateur
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fonction pour gérer l'Inscription
  const handleRegister = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
          setIsRegistering(false); // Bascule automatiquement sur l'écran connexion
        }
      })
      .catch((err) => console.error("Erreur inscription :", err));
  };

  // Fonction pour gérer la Connexion
  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Connexion réussie !");
          navigate('/'); // Redirige vers la page d'accueil
        } else {
          alert(data.message); // Affiche "Mot de passe incorrect" ou "Utilisateur non trouvé"
        }
      })
      .catch((err) => console.error("Erreur connexion :", err));
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card-box">
        
        <button className="btn-back-home" onClick={() => navigate('/')}>
          ➔ Retour au site
        </button>

        {!isRegistering ? (
          /* FORMULAIRE DE CONNEXION */
          <>
            <h2>Espace Connexion</h2>
            <p className="auth-subtitle">Accédez à votre espace client Moaye Service</p>
            
            <form onSubmit={handleLogin}>
              <div className="auth-input-group">
                <label>Adresse Email *</label>
                <input 
                  type="email" 
                  placeholder="Entrez votre email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="auth-input-group">
                <label>Mot de passe *</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
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
            
            <form onSubmit={handleRegister}>
              <div className="auth-input-group">
                <label>Nom Complet *</label>
                <input 
                  type="text" 
                  placeholder="Ex: Kouadio Konan" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required 
                />
              </div>
              <div className="auth-input-group">
                <label>Adresse Email *</label>
                <input 
                  type="email" 
                  placeholder="Ex: nom@mail.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="auth-input-group">
                <label>Mot de passe *</label>
                <input 
                  type="password" 
                  placeholder="Créez un mot de passe sécurisé" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
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
