import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VisionPage.css';

export default function VisionPage() {
  const navigate = useNavigate();

  return (
    <div className="vision-page-wrapper">
      <div className="vision-main-card">
        
        {/* BOUTON RETOUR ÉPURÉ */}
        <button className="vision-back-btn" onClick={() => navigate('/')}>
          ← Revenir à l'accueil
        </button>

        {/* RESTRUCTURATION DOUBLE COLONNE : BLOC TEXTE À GAUCHE & OBJECTIFS À DROITE */}
        <div className="vision-split-layout">
          
          {/* COLONNE GAUCHE : LE GRAND BLOC EXPLICATIF DE LA VISION */}
          <div className="vision-left-panel">
            <span className="vision-page-meta-tag">MOAYE SERVICE MULTISERVICES</span>
            <h2>La Vision de Moaye Service</h2>
            <p className="vision-page-subtitle">
              Une stratégie de développement durable pilotée par <strong>M. Ya Essé Siméon</strong> (Zootechnicien & Nutritionniste)
            </p>
            
            <div className="vision-page-intro-pacte">
              La vision de Moaye Service, dirigée par Ya Essé Siméon, est de promouvoir l'entreprenariat agropastoral intégré. 
              Elle repose sur la création de fermes durables combinant maraîchage, pisciculture et élevage.
            </div>

            <p className="vision-additional-text">
              En associant intelligemment chaque maillon de la chaîne de production, nous transformons les contraintes d'exploitation en opportunités biologiques et économiques pour les producteurs locaux.
            </p>
          </div>

          {/* COLONNE DROITE : LES 4 OBJECTIFS STRUCTURÉS EN CARTES ÉPURÉES */}
          <div className="vision-right-panel">
            <h3 className="section-right-title">Objectifs Principaux</h3>
            <div className="vision-page-goals-list">
              
              {/* CARTE 1 */}
              <div className="vision-page-goal-card">
                <span className="goal-page-num">01</span>
                <div className="goal-page-content">
                  <h4>Ferme intégrée</h4>
                  <p>Lier la production végétale, l'élevage et la pisciculture en un seul cycle vertueux et continu.</p>
                </div>
              </div>

              {/* CARTE 2 */}
              <div className="vision-page-goal-card">
                <span className="goal-page-num">02</span>
                <div className="goal-page-content">
                  <h4>Recyclage naturel</h4>
                  <p>Utiliser les déchets de la volaille et du maraîchage pour nourrir les poissons via la production d'asticots.</p>
                </div>
              </div>

              {/* CARTE 3 */}
              <div className="vision-page-goal-card">
                <span className="goal-page-num">03</span>
                <div className="goal-page-content">
                  <h4>Fertilisation croisée</h4>
                  <p>Employer l'eau riche de la pisciculture pour arroser et nourrir efficacement les plantes et cultures.</p>
                </div>
              </div>

              {/* CARTE 4 */}
              <div className="vision-page-goal-card">
                <span className="goal-page-num">04</span>
                <div className="goal-page-content">
                  <h4>Impact social</h4>
                  <p>Créer des emplois locaux stables et former de bout en bout les acteurs du secteur agropastoral.</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* PIED DE PAGE BLANC UNIQUE ET PROFESSIONNEL */}
        <div className="vision-page-action-footer">
          <p>Vous souhaitez planifier une étude ou concevoir une ferme intégrée avec notre bureau d'études ?</p>
          <button className="vision-page-cta-btn" onClick={() => navigate('/demande-devis')}>
            📝 Soumettre mon cahier des charges de devis gratuit
          </button>
        </div>

      </div>
    </div>
  );
}
