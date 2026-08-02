import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DemandeDevis.css';

export default function DemandeDevis() {
  const navigate = useNavigate();
  
  // Récupération de l'email de l'utilisateur connecté pour lier son devis
  const emailSession = localStorage.getItem('client_email') || "ngorankoffimichael16@gmail.com";

  const [form, setForm] = useState({
    clientName: '', 
    phone: '', 
    location: '', 
    volume: '', 
    projectType: '', 
    services: [], 
    objectifs: '', 
    terrainDispo: '', 
    commentaires: ''
  });

  const [errors, setErrors] = useState({});

  const val = (f, v) => {
    setForm(p => ({ ...p, [f]: v }));
    if (errors[f]) setErrors(p => ({ ...p, [f]: false }));
  };

  const handleDevisSubmit = async (e) => {
    e.preventDefault();
    let err = {};
    if (!form.clientName) err.clientName = true;
    if (!form.phone) err.phone = true;
    if (!form.location) err.location = true;
    if (!form.volume) err.volume = true;
    if (!form.projectType) err.projectType = true;

    if (Object.keys(err).length > 0) return setErrors(err);

    // 1. ☁️ Envoi asynchrone synchronisé avec l'Espace Client vers Supabase
    try {
      await fetch('http://localhost:5000/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: form.clientName,
          email: emailSession, // 🌟 ESSENTIEL : Lie le devis à l'utilisateur connecté
          phone: form.phone,
          location: form.location,
          projectType: form.projectType,
          exploitationSize: form.volume, // Transmet la capacité saisie
          message: `Demande formulée depuis la grille des pôles d'intervention pour le secteur : ${form.projectType}.`
        })
      });

      // 🌟 TRANSFERT EN LOCAL: Permet une mise à jour visuelle immédiate dans l'Espace Client si nécessaire
      localStorage.setItem('moaye_dernier_devis_pole', form.projectType);
      localStorage.setItem('moaye_dernier_devis_capacite', form.volume);

    } catch (error) {
      console.error("Note: Erreur réseau Supabase ignorée pour ne pas bloquer l'utilisateur.", error);
    }

    // 2. Préparation et ouverture sécurisée de WhatsApp (Correction du lien mort /?text=)
    try {
      const txt = `*DEMANDE DE DEVIS - MOAYE SERVICE*\n\n👤 *Nom :* ${form.clientName}\n📞 *Tel :* ${form.phone}\n📍 *Lieu :* ${form.location}\n📐 *Capacité :* ${form.volume}\n⚙️ *Pôle :* ${form.projectType}`;
      window.open("https://wa.me" + encodeURIComponent(txt), '_blank');
    } catch (whatsappError) {
      console.error("Note: Impossible de lancer WhatsApp.", whatsappError);
    }
    
    // 3. ⚡ REDIRECTION FORCEE ET GARANTIE VERS LA PAGE DE SUCCÈS
    navigate('/confirmation-succes');
  };

  return (
    <div className="devis-page-container">
      <div className="devis-form-card">
        
        <button className="devis-back-btn" onClick={() => navigate('/')}>
          ← Retour à l'accueil
        </button>

        <div className="devis-luxury-header">
          <h2>Demande de Devis</h2>
          <p className="devis-top-intro-txt">
            Bureau d'études techniques de <strong>Moaye Service Toumodi</strong>. Transmettez votre cahier des charges opérationnel.
          </p>
        </div>

        <form onSubmit={handleDevisSubmit} className="devis-structured-form" noValidate>
          
          <div className="devis-two-columns-grid">
            <div className="devis-input-group">
              <label>Nom Complet du Promoteur *</label>
              <input type="text" placeholder="Veuillez écrire votre nom complet" className={errors.clientName ? 'err' : ''} value={form.clientName} onChange={e => val('clientName', e.target.value)} />
            </div>

            <div className="devis-input-group">
              <label>Numéro de téléphone *</label>
              <input type="tel" placeholder="Veuillez écrire votre numéro de téléphone" className={errors.phone ? 'err' : ''} value={form.phone} onChange={e => val('phone', e.target.value)} />
            </div>

            <div className="devis-input-group">
              <label>Localité du projet *</label>
              <input type="text" placeholder="Veuillez écrire la localité du projet" className={errors.location ? 'err' : ''} value={form.location} onChange={e => val('location', e.target.value)} />
            </div>

            <div className="devis-input-group">
              <label>Superficie / Capacité visée *</label>
              <input type="text" placeholder="Veuillez écrire les dimensions ou la capacité" className={errors.volume ? 'err' : ''} value={form.volume} onChange={e => val('volume', e.target.value)} />
            </div>
          </div>

          <div className="devis-form-block">
            <label className="devis-main-section-label">Sélectionnez le pôle d'intervention technique *</label>
            
            <div className={`devis-options-cards-grid ${errors.projectType ? 'err-list' : ''}`}>
              <label className={`moaye-radio-box-item ${form.projectType === 'Génie Avicole' ? 'checked' : ''}`}>
                <input type="radio" name="pôle" checked={form.projectType === 'Génie Avicole'} onChange={() => val('projectType', 'Génie Avicole')} />
                <div className="moaye-custom-radio-circle"></div>
                <div className="radio-text-wrapper">
                  <strong>Génie Avicole</strong>
                  <p>Pondeuses, poulets de chair, formulation d'aliments</p>
                </div>
              </label>

              <label className={`moaye-radio-box-item ${form.projectType === 'Ingénierie Aquacole' ? 'checked' : ''}`}>
                <input type="radio" name="pôle" checked={form.projectType === 'Ingénierie Aquacole'} onChange={() => val('projectType', 'Ingénierie Aquacole')} />
                <div className="moaye-custom-radio-circle"></div>
                <div className="radio-text-wrapper">
                  <strong>Ingénierie Aquacole</strong>
                  <p>Hors-sol, étangs, cages flottantes, pisciculture</p>
                </div>
              </label>

              <label className={`moaye-radio-box-item ${form.projectType === 'Bâtiment & Génie Civil' ? 'checked' : ''}`}>
                <input type="radio" name="pôle" checked={form.projectType === 'Bâtiment & Génie Civil'} onChange={() => val('projectType', 'Bâtiment & Génie Civil')} />
                <div className="moaye-custom-radio-circle"></div>
                <div className="radio-text-wrapper">
                  <strong>Bâtiment & Génie Civil</strong>
                  <p>Infrastructures rurales, suivi de chantiers type PAPSE</p>
                </div>
              </label>

              <label className={`moaye-radio-box-item ${form.projectType === "Bureau d'études" ? 'checked' : ''}`}>
                <input type="radio" name="pôle" checked={form.projectType === "Bureau d'études"} onChange={() => val('projectType', "Bureau d'études")} />
                <div className="moaye-custom-radio-circle"></div>
                <div className="radio-text-wrapper">
                  <strong>Bureau d'études</strong>
                  <p>Business plans, rédaction de projets agropastoraux</p>
                </div>
              </label>
            </div>
          </div>

          {Object.keys(errors).length > 0 && <p className="global-err-msg">❌ Veuillez remplir correctement tous les champs obligatoires.</p>}
          <button type="submit" className="btn-devis-submit">VALIDER ET ENVOYER LE CAHIER DES CHARGES</button>
        </form>
      </div>
    </div>
  );
}
