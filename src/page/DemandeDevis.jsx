import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DemandeDevis.css';

export default function DemandeDevis() {
  const navigate = useNavigate();
  
  // États synchronisés avec le cahier des charges de l'Oncle Siméon
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    location: '',
    projectType: '',
    exploitationSize: '',
    message: ''
  });

  const handleDevisSubmit = (e) => {
    e.preventDefault();

    // RÈGLE LE BUG : Construction d'un message structuré et envoi direct sans plantage
    const fullWhatsAppMessage = `*NOUVELLE ETUDE DE PROJET - MOAYE SERVICE*%0A%0A` +
      `👤 *Promoteur :* ${formData.clientName}%0A` +
      `📧 *Courriel :* ${formData.email}%0A` +
      `📞 *Contact WhatsApp :* ${formData.phone}%0A` +
      `📍 *Zone d'exécution :* ${formData.location}%0A%0A` +
      `⚙️ *Axe d'expertise demandé :*%0A${formData.projectType}%0A%0A` +
      `📐 *Taille ou Capacité prévue :* ${formData.exploitationSize}%0A%0A` +
      `📝 *Spécifications et exigences :*%0A${formData.message}`;

    // Redirection directe vers le WhatsApp de la direction (Oncle Siméon)
    window.open(`https://wa.me{fullWhatsAppMessage}`, '_blank');
  };

  return (
    <div className="devis-page-container">
      <div className="devis-form-card">
        
        {/* Bouton de retour fluide */}
        <button className="devis-back-btn" onClick={() => navigate('/')}>
          ← Retour à l'accueil
        </button>

        <div className="devis-header-zone">
          <h2>Formulaire de Demande de Devis</h2>
          <span className="devis-brand-tag">Moaye Service Toumodi</span>
          <p className="devis-subtitle">
            Solutions Agricoles et Élevage — Dirigé par <strong>M. Ya Essé Siméon</strong>
          </p>
          <div className="devis-alert-info">
            📝 Veuillez remplir les champs ci-dessous pour nous transmettre votre cahier des charges technique. Estimation gratuite sous 48 heures.
          </div>
        </div>

        <form onSubmit={handleDevisSubmit} className="devis-structured-form">
          
          {/* SECTION 1 : Vos Informations Personnelles */}
          <fieldset className="devis-form-section">
            <legend>1. Vos Informations Personnelles</legend>
            
            <div className="devis-form-row">
              <div className="devis-input-group">
                <label>Nom complet ou Entreprise *</label>
                <input 
                  type="text" 
                  placeholder="Entrez votre nom ici"
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                  required 
                />
              </div>

              <div className="devis-input-group">
                <label>Adresse e-mail *</label>
                <input 
                  type="email" 
                  placeholder="Votre adresse e-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div className="devis-form-row">
              <div className="devis-input-group">
                <label>Numéro de téléphone (WhatsApp) *</label>
                <input 
                  type="tel" 
                  placeholder="+225 ..."
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required 
                />
              </div>

              <div className="devis-input-group">
                <label>Localisation de la ferme / du projet *</label>
                <input 
                  type="text" 
                  placeholder="Ville ou Commune (Ex: Toumodi)"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required 
                />
              </div>
            </div>
          </fieldset>

          {/* SECTION 2 : Alignement sur les expertises exactes de l'Oncle Siméon */}
          <fieldset className="devis-form-section">
            <legend>2. Détails de la Prestation Souhaitée</legend>
            
            <div className="devis-input-group full-width">
              <label>Type de projet / Axe d'intervention *</label>
              <select 
                value={formData.projectType}
                onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                required
              >
                <option value="">-- Sélectionnez l'expertise demandée --</option>
                <option value="Ingénierie Avicole (Poulets de chair, Pondeuses, Provenderie locale)">
                  🐣 Gestion, suivi et conduite de vos élevages avicoles
                </option>
                <option value="Ingénierie Aquacole (Pisciculture en cages flottantes, enclos, étangs, hors-sol)">
                  🐟 Ingénierie aquacole : Pisciculture (Cages flottantes, enclos, étangs, hors-sol)
                </option>
                <option value="Bâtiments, Génie Civil et Infrastructures Rurales (Type Projets PAPSE)">
                  🏗️ Bâtiments, Génie Civil et Infrastructures Rurales (Scolaires / PAPSE)
                </option>
                <option value="Formulation de rechange, Nutrition animale et Suivi Sanitaire">
                  🌾 Formulation alimentaire locale & Accompagnement zootechnique
                </option>
                <option value="Bureau d'études techniques, Business Plans et Conception de projets">
                  📊 Bureau d'études (Business Plans, recherche de parcelle, implantation)
                </option>
              </select>
            </div>

            <div className="devis-input-group full-width">
              <label>Taille actuelle ou prévue de l'exploitation *</label>
              <input 
                type="text" 
                placeholder="Exemple : 10 000 pondeuses, 3 Hectares, 5 cages flottantes..."
                value={formData.exploitationSize}
                onChange={(e) => setFormData({...formData, exploitationSize: e.target.value})}
                required 
              />
            </div>
          </fieldset>

          {/* SECTION 3 : Votre Message / Spécifications */}
          <fieldset className="devis-form-section">
            <legend>3. Votre Message / Spécifications du Cahier des Charges</legend>
            
            <div className="devis-input-group full-width">
              <label>Décrivez précisément vos exigences et votre calendrier *</label>
              <textarea 
                rows="4" 
                placeholder="Écrivez ici ce que vous attendez précisément de Moaye Service (accès forage, besoin en extrudeuse, calendrier de déploiement...)"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              ></textarea>
            </div>
          </fieldset>

          {/* LE GRAND BOUTON VERT D'ENVOI OFFICIEL */}
          <button type="submit" className="devis-submit-btn">
            🖥 Pressez pour envoyer la demande de devis
          </button>

        </form>

      </div>
    </div>
  );
}
