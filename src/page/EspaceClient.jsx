import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EspaceClient.css';

// 🌟 CONFIGURATION CLOUD DÉFINITIVE ET AUTONOME 24H/24
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://onrender.com';

export default function EspaceClient() {
  const navigate = useNavigate();
  const [profil, setProfil] = useState(null);
  const [erreur, setErreur] = useState('');
  
  // Extraction de l'adresse e-mail enregistrée dans la session locale
  const emailConnecte = localStorage.getItem('client_email');

  useEffect(() => {
    if (!emailConnecte) {
      setErreur("Aucun utilisateur connecté. Veuillez vous identifier.");
      return;
    }

    // ☁️ Extraction des informations via votre instance Render Cloud autonome
    fetch(`${API_URL}/api/client/profil?email=${encodeURIComponent(emailConnecte)}`)
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.data) {
          const rawData = Array.isArray(resData.data) ? resData.data[0] : resData.data;
          
          if (!rawData) {
            setErreur("Profil introuvable dans la base cloud.");
            return;
          }

          // Lecture des informations du dernier devis si présentes en mémoire locale
          const devisLocalPole = localStorage.getItem('moaye_dernier_devis_pole');
          const devisLocalCapacite = localStorage.getItem('moaye_dernier_devis_capacite');

          // Alignement précis des clés de la table Supabase vers l'état Frontend
          setProfil({
            clientName: rawData.full_name || "Client Moaye Service",
            phone: rawData.phone || "+225 00 00 00 00 00",
            projectType: rawData.client_type || "Producteur / Éleveur",
            email: rawData.email || emailConnecte,
            location: rawData.location || "Non renseignée",
            
            // Affiche dynamiquement les caractéristiques de l'étude de devis soumis
            sector: devisLocalPole || rawData.sector || "Non spécifié",
            projectSize: devisLocalCapacite || rawData.project_size || "En attente d'étude technique"
          });
        } else {
          setErreur("Profil introuvable.");
        }
      })
      .catch(() => {
        // Mode Fallback de secours autonome pour vos tests locaux si l'API est coupée
        const devisLocalPole = localStorage.getItem('moaye_dernier_devis_pole');
        const devisLocalCapacite = localStorage.getItem('moaye_dernier_devis_capacite');

        setProfil({
          clientName: "Koffi Michael (Mode Test)",
          phone: "+225 05 65 65 46",
          projectType: "Producteur / Éleveur",
          email: emailConnecte || "ngorankoffimichael16@gmail.com",
          location: "TOUMODI",
          sector: devisLocalPole || "Nutrition",
          projectSize: devisLocalCapacite || "12 Hectares / Sujets"
        });
      });
  }, [emailConnecte]);

  const handleLogout = () => {
    localStorage.removeItem('session_moaye_client');
    localStorage.removeItem('client_email');
    localStorage.removeItem('moaye_profil_complet');
    localStorage.removeItem('moaye_dernier_devis_pole');
    localStorage.removeItem('moaye_dernier_devis_capacite');
    navigate('/connexion'); // Routage instantané sans rechargement forcé
  };

  if (erreur) {
    return (
      <div className="client-error-box">
        <h3>⚠️ {erreur}</h3>
        <button onClick={() => navigate('/connexion')} className="client-retry-btn">Se connecter</button>
      </div>
    );
  }

  if (!profil) return <div className="client-loading-txt">Chargement de votre Tableau de Bord Numérique...</div>;

  return (
    <div className="client-dashboard-wrapper">
      
      {/* 1. L'EN-TÊTE PROFESSIONNEL */}
      <header className="dashboard-header-line">
        <div className="dashboard-welcome-txt">
          <span className="dashboard-badge-status">ESPACE PRO CONFORMÉ — MOAYE SERVICE</span>
          <h2>Mon Espace Client</h2>
          <p className="dashboard-sub">Direction Générale : <strong>Ya Essé Siméon</strong></p>
        </div>
        <button onClick={handleLogout} className="dashboard-logout-btn">Déconnexion</button>
      </header>

      {/* 2. GRILLE DEUX PAR DEUX (OCCUPE TOUT L'ESPACE) */}
      <div className="dashboard-main-grid">
        
        {/* BLOC A : FICHE DE PROFIL ACCORDEE */}
        <div className="dashboard-card profile-border">
          <h3>Fiche Technique & Profil</h3>
          <div className="dashboard-list-fields">
            <p><strong>Nom du Promoteur :</strong> <span>{profil.clientName}</span></p>
            <p><strong>Contact Téléphone :</strong> <span>{profil.phone}</span></p>
            <p><strong>Type de compte :</strong> <span className="account-type-badge">{profil.projectType}</span></p>
            <p><strong>Adresse E-mail :</strong> <span>{profil.email}</span></p>
          </div>
        </div>

        {/* BLOC B : ETUDE DU CAHIER DES CHARGES */}
        <div className="dashboard-card project-border">
          <h3>🌱 Suivi Opérationnel du Projet</h3>
          <div className="dashboard-list-fields">
            <div className="sub-follow-row">
              <strong>Identifiant Unique :</strong>
              <span>MY-2026-01 (Dossier Reçu)</span>
            </div>
            <div className="sub-follow-row">
              <strong>Pôle Technique Demandé :</strong>
              <span className="text-dark-green">{profil.sector}</span>
            </div>
            <div className="sub-follow-row">
              <strong>Capacité / Dimension :</strong>
              <span className="text-bold-size">{profil.projectSize}</span>
            </div>
            <div className="sub-follow-row">
              <strong>Localisation Exploitation :</strong>
              <span>{profil.location}</span>
            </div>
            <div className="client-status-alert-box">
              <strong>Étape actuelle :</strong> <span className="orange-status-highlight">Analyse terrain & Faisabilité</span>
            </div>
          </div>
        </div>

        {/* BLOC C : ETAT DE PRODUCTION AGROPASTORALE */}
        <div className="dashboard-card history-border">
          <h3>📊 Suivi Zootechnique des Productions</h3>
          <div className="dashboard-list-fields">
            <div className="data-text-block">
              <strong>Poulets de chair :</strong> <span className="green-txt">1 500 Sujets — En provenderie</span>
            </div>
            <div className="data-text-block">
              <strong>Maraîcher :</strong> <span className="brown-txt">Lopin Maraîcher — Récolte imminente</span>
            </div>
            <div className="data-text-block">
              <strong>Aquaculture :</strong> <span className="blue-txt">Bassins RAS — Calibrage technique</span>
            </div>

            {/* LA JAUGE GRAPHIQUE À 35% */}
            <div className="client-progress-wrapper">
              <div className="progress-labels-row">
                <span>Avancement global des travaux</span>
                <strong>35%</strong>
              </div>
              <div className="client-progress-bar-track">
                <div className="client-progress-bar-fill"></div>
              </div>
            </div>
          </div>
        </div>

        {/* BLOC D : LIVRABLES D'INGÉNIERIE (PDF) */}
        <div className="dashboard-card docs-border">
          <h3>📂 Livrables Officiels & Certifications (PDF)</h3>
          <p className="docs-desc-helper">Consultez vos rapports d'assistance, vos Business Plans et vos factures proforma certifiés.</p>
          <div className="dashboard-list-fields">
            <div className="doc-download-item">
              <span>🧾 Facture_Proforma_Infrastructures_Signee.pdf</span>
              <button className="mini-download-btn" onClick={() => alert('Ouverture du fichier sécurisé Cloud Supabase...')}>Télécharger</button>
            </div>
            <div className="doc-download-item">
              <span>📊 Business_Plan_Rentabilite_Certifie.pdf</span>
              <button className="mini-download-btn" onClick={() => alert('Ouverture du fichier sécurisé Cloud Supabase...')}>Télécharger</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
