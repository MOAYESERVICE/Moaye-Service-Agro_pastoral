import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EngagementsPage.css';

export default function EngagementsPage() {
  const navigate = useNavigate();

  return (
    <div className="engagements-page-wrapper">
      <div className="engagements-main-card">
        
        {/* BOUTON RETOUR ÉPURÉ */}
        <button className="engagements-back-btn" onClick={() => navigate('/')}>
          ← Revenir à l'accueil
        </button>

        {/* SPLIT LAYOUT : TEXTE À GAUCHE & INTERVENTIONS À DROITE */}
        <div className="engagements-split-layout">
          
          {/* COLONNE GAUCHE : PRÉSENTATION DES ENGAGEMENTS SANS MOT PARASITE */}
          <div className="engagements-left-panel">
            <span className="engagements-page-meta-tag">PACTE DE CONFIANCE</span>
            <h2>Les Engagements de Moaye Service</h2>
            <p className="engagements-page-subtitle">
              Une charte de rigueur et de qualité sous la direction de <strong>M. Ya Essé Siméon</strong>
            </p>
            
            <div className="engagements-page-intro-pacte">
              Les engagements de Moaye Service, dirigé par Ya Esse Simeon, portent principalement sur l'expertise agropastorale, le BTP et les services divers en Côte d'Ivoire.
            </div>

            <p className="engagements-additional-text">
              À travers ces piliers d'intervention, notre entreprise s'engage à déployer des solutions techniques d'élite qui répondent scrupuleusement aux exigences des cahiers des charges.
            </p>
          </div>

          {/* COLONNE DROITE : LES DOMAINES D'INTERVENTION ET RÉALISATIONS COMPLETS */}
          <div className="engagements-right-panel">
            <h3 className="section-right-title">Domaines d'intervention et réalisations</h3>
            <div className="engagements-page-goals-list">
              
              {/* ENGAGEMENT 1 : AGRO-PASTORAL */}
              <div className="engagements-page-goal-card">
                <span className="goal-page-num">✓</span>
                <div className="goal-page-content">
                  <h4>Agro-pastoral</h4>
                  <p>
                    Formulation d'aliments pour bétail (volailles, poissons, lapins), nutrition animale et projets piscicoles ou apicoles menés avec des ONG comme <strong>SOCODEVI</strong> ou l'<strong>IRC</strong>.
                  </p>
                </div>
              </div>

              {/* ENGAGEMENT 2 : BTP */}
              <div className="engagements-page-goal-card">
                <span className="goal-page-num">✓</span>
                <div className="goal-page-content">
                  <h4>BTP</h4>
                  <p>
                    Construction d'infrastructures communautaires, à l'image du <strong>projet PAPSE</strong> de construction de salles de classe dans le nord de la Côte d'Ivoire.
                  </p>
                </div>
              </div>

              {/* ENGAGEMENT 3 : DÉVELOPPEMENT */}
              <div className="engagements-page-goal-card">
                <span className="goal-page-num">✓</span>
                <div className="goal-page-content">
                  <h4>Développement</h4>
                  <p>
                    Appui technique et encadrement en milieu rural et zootechnique.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* PIED DE PAGE BLANC DE PRESTATION */}
        <div className="engagements-page-action-footer">
          <p>Vous souhaitez planifier une étude ou lancer un projet conforme à nos engagements qualité ?</p>
          <button className="engagements-page-cta-btn" onClick={() => navigate('/demande-devis')}>
            📝 Soumettre mon cahier des charges de devis gratuit
          </button>
        </div>

      </div>
    </div>
  );
}
