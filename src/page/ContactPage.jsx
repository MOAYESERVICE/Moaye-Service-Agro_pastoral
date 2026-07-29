import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactPage.css';

export default function ContactPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: '',
    serviceType: '', // Contiendrait l'option sélectionnée au clic
    surfaceArea: '',
    description: ''
  });

  // Liste propre des expertises officielles de Moaye Service
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

    const cleanMessage = `*NOUVELLE DEMANDE DE PROJET - MOAYE SERVICE*%0A%0A` +
      `👤 *Client :* ${formData.fullName}%0A` +
      `📞 *Contact :* ${formData.phone}%0A` +
      `📍 *Zone du projet :* ${formData.location}%0A%0A` +
      `⚙️ *Axe technique :* ${formData.serviceType}%0A` +
      `📐 *Superficie / Capacité :* ${formData.surfaceArea}%0A%0A` +
      `📝 *Cahier des charges :*%0A${formData.description}`;

    window.open(`https://wa.me{cleanMessage}`, '_blank');
  };

  return (
    <div className="moaye-contact-wrapper">
      <div className="moaye-contact-card">
        
        <button className="moaye-back-link" onClick={() => navigate('/')}>
          ➔ Retour à l'accueil
        </button>

        <div className="moaye-contact-intro">
          <h2>Lancer une Étude de Projet</h2>
          <p>Bureau d'études techniques de <strong>Moaye Service Toumodi</strong>. Transmettez votre cahier des charges opérationnel.</p>
        </div>

        <form onSubmit={handleMoayeSubmit} className="moaye-structured-form">
          
          <div className="moaye-form-row">
            <div className="moaye-input-container">
              <label>Nom Complet du Promoteur *</label>
              <input 
                type="text" 
                placeholder="Ex: Kouadio Koffi Michael"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required 
              />
            </div>

            <div className="moaye-input-container">
              <label>Numéro WhatsApp *</label>
              <input 
                type="tel" 
                placeholder="Ex: 0565640805"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className="moaye-form-row">
            <div className="moaye-input-container">
              <label>Localité du projet *</label>
              <input 
                type="text" 
                placeholder="Ex: Toumodi, Yamoussoukro..."
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required 
              />
            </div>

            <div className="moaye-input-container">
              <label>Superficie / Capacité visée *</label>
              <input 
                type="text" 
                placeholder="Ex: 2 Hectares / 10 000 pondeuses"
                value={formData.surfaceArea}
                onChange={(e) => setFormData({...formData, surfaceArea: e.target.value})}
                required 
              />
            </div>
          </div>

          {/* RÈGLE LE BUG : SÉLECTEUR DEVENU DES CARTES D'OPTIONS INTERACTIVES */}
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

          <div className="moaye-input-container full-width-field">
            <label>Détaillez vos exigences et votre calendrier *</label>
            <textarea 
              rows="4" 
              placeholder="Décrivez précisément votre projet (besoin en forage, provenderie, accès électricité...)"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            ></textarea>
          </div>

          <button type="submit" className="moaye-submit-project-btn">
            Valider et envoyer le cahier des charges
          </button>

        </form>

      </div>
    </div>
  );
}
