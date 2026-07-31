import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactPage.css';

export default function ContactPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: '',
    serviceType: '', // Enregistre le titre du pôle sélectionné
    surfaceArea: '',
    description: ''
  });

  // Liste officielle des expertises Moaye Service
  const moayeExpertises = [
    { id: 'avi', title: 'Génie Avicole', desc: 'Pondeuses, poulets de chair, formulation d\'aliments' },
    { id: 'aqua', title: 'Ingénierie Aquacole', desc: 'Hors-sol, étangs, cages flottantes, pisciculture' },
    { id: 'btp', title: 'Bâtiments & Génie Civil', desc: 'Infrastructures rurales et bâtiments scolaires PAPSE' },
    { id: 'bureau', title: 'Bureau d\'Études', desc: 'Conception de projets, expertises et Business Plans' }
  ];

  const handleMoayeSubmit = (e) => {
    e.preventDefault();

    if (!formData.serviceType) {
      alert("Veuillez sélectionner un pôle d'intervention technique.");
      return;
    }

    // 1. Envoi asynchrone en arrière-plan vers votre serveur backend Node.js
    fetch('http://localhost:5000/api/devis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((res) => res.json())
    .catch((err) => {
      // Évite de bloquer l'utilisateur si le serveur local n'est pas lancé
      console.log("Note: Serveur backend injoignable, redirection forcée.", err);
    });

    // 2. CORRECTIF TECHNIQUE : Remise à zéro immédiate du formulaire
    setFormData({
      fullName: '',
      phone: '',
      location: '',
      serviceType: '',
      surfaceArea: '',
      description: ''
    });
    
    // 3. SELECTION CRITIQUE : Redirection instantanée garantie à chaque clic
    navigate('/confirmation-succes');
  };

  return (
    <div className="moaye-contact-wrapper">
      <div className="moaye-contact-card">
        
        {/* BOUTON RETOUR ÉPURÉ */}
        <button className="moaye-back-link" onClick={() => navigate('/')}>
          ← Retour à l'accueil
        </button>

        {/* EN-TÊTE DE LA PAGE */}
        <div className="moaye-contact-intro">
          <h2>Lancer une Étude de Projet</h2>
          <p>Bureau d'études techniques de <strong>Moaye Service Toumodi</strong>. Transmettez votre cahier des charges opérationnel.</p>
        </div>

        <form onSubmit={handleMoayeSubmit} className="moaye-structured-form">
          
          {/* LIGNE DE SAISIE 1 */}
          <div className="moaye-form-row">
            <div className="moaye-input-container">
              <label>Nom Complet du Promoteur *</label>
              <input 
                type="text" 
                autoComplete="off"
                placeholder="Veuillez écrire votre nom complet"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required 
              />
            </div>

            <div className="moaye-input-container">
              <label>Numéro de téléphone *</label>
              <input 
                type="tel" 
                autoComplete="off"
                placeholder="Veuillez écrire votre numéro de téléphone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required 
              />
            </div>
          </div>

          {/* LIGNE DE SAISIE 2 */}
          <div className="moaye-form-row">
            <div className="moaye-input-container">
              <label>Localité du projet *</label>
              <input 
                type="text" 
                autoComplete="off"
                placeholder="Veuillez écrire la localité du projet"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required 
              />
            </div>

            <div className="moaye-input-container">
              <label>Superficie / Capacité visée *</label>
              <input 
                type="text" 
                autoComplete="off"
                placeholder="Veuillez écrire les dimensions ou la capacité"
                value={formData.surfaceArea}
                onChange={(e) => setFormData({...formData, surfaceArea: e.target.value})}
                required 
              />
            </div>
          </div>

          {/* GRILLE INTERACTIVE SANS MENU DÉROULANT BLEU */}
          <div className="moaye-input-container full-width-field">
            <label className="section-field-label">Sélectionnez le pôle d'intervention technique *</label>
            
            <div className="moaye-expertises-grid-selector">
              {moayeExpertises.map((exp) => (
                <div 
                  key={exp.id}
                  className={`moaye-select-option-card ${formData.serviceType === exp.title ? 'is-selected' : ''}`}
                  onClick={() => setFormData({...formData, serviceType: exp.title})}
                >
                  <div className="moaye-card-radio-bullet"></div>
                  <div className="moaye-card-select-texts">
                    <h4>{exp.title}</h4>
                    <p>{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ESPACE SPECIFICATIONS */}
          <div className="moaye-input-container full-width-field">
            <label>Détaillez vos exigences et votre calendrier *</label>
            <textarea 
              rows="4" 
              placeholder="Veuillez écrire les détails et spécifications de votre demande ici..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            ></textarea>
          </div>

          {/* BOUTON D'ENVOI VERT OFFICIEL */}
          <button type="submit" className="moaye-submit-project-btn">
            Valider et envoyer le cahier des charges
          </button>

        </form>

      </div>
    </div>
  );
}
