import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessPage.css';

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="success-page-wrapper">
      <div className="success-main-card">
        
        <div className="success-icon-circle">
          ✅
        </div>

        <div className="success-text-zone">
          <span className="success-meta-tag">Transmission Réussie</span>
          <h2>Votre demande a été enregistrée</h2>
          
          <p className="success-main-message">
            Moaye Service vous remercie pour l'intérêt porté à nos solutions d'ingénierie.
          </p>
          
          <div className="success-divider-line"></div>
          
          <div className="success-sub-message">
            <p>
              Le secrétariat technique de <strong>Moaye Service</strong> confirme la bonne réception de votre cahier des charges et de vos spécifications techniques.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Nos experts en ingénierie agro-pastorale et nos conducteurs de travaux BTP procèdent actuellement à l'analyse de faisabilité et au chiffrage de votre projet. Un dossier d'évaluation complet ou une proposition de devis vous sera transmis par nos services techniques sous un délai de <strong>48 heures</strong>.
            </p>
          </div>
        </div>

        <div className="success-action-footer">
          <button className="success-home-btn" onClick={() => navigate('/')}>
            ← Retourner à la page d'accueil
          </button>
        </div>

      </div>
    </div>
  );
}
