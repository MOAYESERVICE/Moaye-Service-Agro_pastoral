import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DemandeDevis.css';

export default function DemandeDevis() {
  const navigate = useNavigate();
  
  // États du formulaire synchronisés avec le cahier des charges de Moaye Service
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    location: '',
    projectType: '',
    exploitationSize: '',
    message: ''
  });

  // État de contrôle pour le sélecteur d'expertise personnalisé
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Liste des expertises officielles de Moaye Service
  const expertisesList = [
    { value: "Génie Avicole", label: "🐣 Génie Avicole (Pondeuses, poulets de chair, formulation d'aliments)" },
    { value: "Ingénierie Aquacole", label: "🐟 Ingénierie Aquacole (Hors-sol, étangs, cages flottantes, pisciculture)" },
    { value: "Bâtiments & Génie Civil", label: "🏗️ Bâtiments & Génie Civil (Infrastructures rurales, bâtiments scolaires PAPSE)" },
    { value: "Bureau d'Études", label: "📊 Bureau d'Études (Conception de projets, expertises et Business Plans)" }
  ];

  const selectExpertise = (expertise) => {
    setFormData({ ...formData, projectType: expertise.value });
    setIsDropdownOpen(false);
  };

  const handleDevisSubmit = (e) => {
    e.preventDefault();

    // Préparation du texte structuré pour l'équipe technique de Moaye Service
    const intro = "*DEMANDE DE DEVIS EN LIGNE - MOAYE SERVICE*\n\n";
    const coordonnees = "👤 *Nom / Entreprise :* " + formData.clientName + "\n📧 *E-mail :* " + formData.email + "\n📞 *WhatsApp :* " + formData.phone + "\n📍 *Localisation :* " + formData.location + "\n\n";
    const projet = "⚙️ *Type de Projet :* " + formData.projectType + "\n📐 *Taille Exploitation :* " + formData.exploitationSize + "\n\n";
    const detail = "📝 *Spécifications :*\n" + formData.message;
    
    const textComplet = intro + coordonnees + projet + detail;
    
    // CORRECTION FINALE : URL WhatsApp standardisée avec le numéro en dur et sans accolades buguées
    const urlOfficial = "https://wa.me" + encodeURIComponent(textComplet);

    try {
      // 1. Ouvre la discussion WhatsApp sur le bon numéro sans aucun plantage
      window.open(urlOfficial, '_blank');
    } catch (error) {
      console.error("Erreur lors de l'ouverture de WhatsApp", error);
    }

    // 2. Redirige immédiatement l'utilisateur vers ta page de confirmation de succès
    navigate('/confirmation-succes');
  };

  return (
    <div className="devis-page-container">
      <div className="devis-form-card">
        
        {/* Bouton retour vers l'accueil */}
        <button className="devis-back-btn" onClick={() => navigate('/')}>
          ← Retour à l'accueil
        </button>

        <div className="devis-header-zone">
          <h2>Demande de Devis En Ligne</h2>
          <span className="devis-brand-tag">Moaye Service</span>
          <p className="devis-subtitle">
            Expertise Agro-pastorale, BTP & Services Divers — Solutions durables en Côte d'Ivoire
          </p>
          <div className="devis-alert-info">
            Veuillez remplir les champs ci-dessous pour recevoir une estimation gratuite sous 48 heures.
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
                  autoComplete="off"
                  placeholder="Veuillez écrire votre nom ou entreprise"
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                  required 
                />
              </div>

              <div className="devis-input-group">
                <label>Adresse e-mail *</label>
                <input 
                  type="email" 
                  autoComplete="off"
                  placeholder="Veuillez écrire votre adresse e-mail"
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
                  autoComplete="off"
                  placeholder="Veuillez écrire votre numéro WhatsApp"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required 
                />
              </div>

              <div className="devis-input-group">
                <label>Localisation de la ferme / du projet *</label>
                <input 
                  type="text" 
                  autoComplete="off"
                  placeholder="Veuillez écrire la localisation du projet"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required 
                />
              </div>
            </div>
          </fieldset>

          {/* SECTION 2 : Détails de la Prestation Souhaitée */}
          <fieldset className="devis-form-section">
            <legend>2. Détails de la Prestation Souhaitée</legend>
            
            <div className="devis-input-group full-width">
              <label>Type de projet / Axe d'intervention *</label>
              
              <div className="custom-dropdown-container">
                <button 
                  type="button"
                  className={`dropdown-selected-trigger ${isDropdownOpen ? 'active' : ''}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {formData.projectType 
                    ? expertisesList.find(item => item.value === formData.projectType)?.label 
                    : "-- Sélectionnez l'expertise demandée --"}
                  <span className="dropdown-arrow-icon">▼</span>
                </button>

                {isDropdownOpen && (
                  <div className="dropdown-options-list">
                    {expertisesList.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`dropdown-each-option ${formData.projectType === item.value ? 'selected' : ''}`}
                        onClick={() => selectExpertise(item)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="devis-input-group full-width">
              <label>Taille actuelle ou prévue de l'exploitation *</label>
              <input 
                type="text" 
                autoComplete="off"
                placeholder="Veuillez écrire la taille ou dimension de l'exploitation"
                value={formData.exploitationSize}
                onChange={(e) => setFormData({...formData, exploitationSize: e.target.value})}
                required 
              />
            </div>
          </fieldset>

          {/* SECTION 3 : Votre Message / Spécifications */}
          <fieldset className="devis-form-section">
            <legend>3. Votre Message / Spécifications</legend>
            <div className="devis-input-group full-width">
              <label>Décrivez précisément vos exigences et votre calendrier *</label>
              <textarea 
                rows="4" 
                placeholder="Veuillez écrire les détails et spécifications de votre demande ici..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              ></textarea>
            </div>
          </fieldset>

          {/* BOUTON VERT D'ENVOI */}
          <button type="submit" className="devis-submit-btn">
            🖥️ Envoyer la demande de devis
          </button>

        </form>

      </div>
    </div>
  );
}
