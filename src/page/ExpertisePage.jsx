import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExpertisePage.css';

export default function ExpertisePage() {
  const navigate = useNavigate();
  
  // activeTab est à null au départ (on voit uniquement la grille 2x2)
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="expertises-global-wrapper">
      <div className="expertises-main-card">

        {/* ===================================================
           L'ÉTAT INITIAL : ON VOIT UNIQUEMENT LA GRILLE 2x2
           =================================================== */}
        {!activeTab && (
          <div className="expertises-initial-view element-fade-in">
            {/* Bouton retour vers l'accueil du site */}
            <button className="expertises-back-btn" onClick={() => navigate('/')}>
              ← Revenir à l'accueil
            </button>

            <div className="expertises-welcome-zone">
              <span className="expertises-meta-tag">MOAYE SERVICE MULTISERVICES</span>
              <h2>Nos Domaines d'Expertise</h2>
              <p className="expertises-subtitle">Veuillez sélectionner un secteur d'activité pour découvrir nos solutions rattachées au cahier des charges.</p>
            </div>

            <div className="expertises-2x2-grid">
              <button type="button" className="expertise-grid-box-trigger" onClick={() => setActiveTab('avicole')}>
                <span className="card-bullet-icon">🔘</span>
                <div className="card-trigger-texts">
                  <h4>Génie Avicole</h4>
                  <p>Pondeuses, poulets de chair, formulation d'aliments</p>
                </div>
              </button>

              <button type="button" className="expertise-grid-box-trigger" onClick={() => setActiveTab('aquacole')}>
                <span className="card-bullet-icon">🔘</span>
                <div className="card-trigger-texts">
                  <h4>Ingénierie Aquacole</h4>
                  <p>Hors-sol, étangs, cages flottantes, pisciculture</p>
                </div>
              </button>

              <button type="button" className="expertise-grid-box-trigger" onClick={() => setActiveTab('btp')}>
                <span className="card-bullet-icon">🔘</span>
                <div className="card-trigger-texts">
                  <h4>Bâtiments & Génie Civil</h4>
                  <p>Infrastructures rurales et bâtiments scolaires PAPSE</p>
                </div>
              </button>

              <button type="button" className="expertise-grid-box-trigger" onClick={() => setActiveTab('bureau')}>
                <span className="card-bullet-icon">🔘</span>
                <div className="card-trigger-texts">
                  <h4>Bureau d'Études</h4>
                  <p>Conception de projets, expertises et Business Plans</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ===================================================
           L'ÉTAT CLIQUÉ : ON VOIT SEULEMENT LA FLÈCHE, LA BOÎTE TEXTE ET LE BOUTON DEVIS
           =================================================== */}
        {activeTab && (
          <div className="expertises-focused-view element-fade-in">
            
            {/* 1. SEULEMENT LA FLÈCHE DE RETOUR VERTE */}
            <button className="expertises-close-sheet-btn" onClick={() => setActiveTab(null)}>
              ← Retourner aux secteurs d'activité
            </button>

            {/* 2. SEULEMENT LA BOÎTE DE TEXTE TECHNIQUE SANS BLOC DE TITRES INTERMÉDIAIRES */}
            <div className="expertises-dynamic-content-pane">
              {activeTab === 'avicole' && (
                <div className="expertise-standalone-sheet">
                  <h3>🐣 Projet Ferme Avicole & Formulation Nutritionnelle</h3>
                  <p className="sheet-intro-text">Sous la direction de M. Ya Essé Siméon, nous concevons des parcs avicoles modernes et optimisons la rentabilité grâce à une alimentation sur-mesure.</p>
                  <ul className="sheet-bullets-list">
                    <li><strong>Poules Pondeuses :</strong> Suivi technique et gestion de complexes accueillant jusqu'à 40 000 pondeuses.</li>
                    <li><strong>Poulets de Chair :</strong> Conduite d'élevages à rotation rapide pour approvisionner le marché local.</li>
                    <li><strong>Provenderie :</strong> Formulation d'aliments locaux pour réduire drastiquement les coûts des intrants de bétail.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'aquacole' && (
                <div className="expertise-standalone-sheet">
                  <h3>🐟 Ingénierie Aquacole & Systèmes Piscicoles</h3>
                  <p className="sheet-intro-text">Moaye Service déploie des installations aquatiques adaptées aux spécificités hydrographiques pour maximiser la production de poissons.</p>
                  <ul className="sheet-bullets-list">
                    <li><strong>Cages Flottantes & Enclos :</strong> Aménagement technique en milieu naturel ouvert.</li>
                    <li><strong>Étangs & Hors-Sol :</strong> Construction de structures autonomes pour l'aquaculture urbaine et périurbaine.</li>
                    <li><strong>Suivi Zootechnique :</strong> Suivi sanitaire, calibrage nutritionnel et gestion de la qualité de l'eau.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'btp' && (
                <div className="expertise-standalone-sheet">
                  <h3>🏗️ Infrastructures Rurales & Bâtiments Scolaires (PAPSE)</h3>
                  <p className="sheet-intro-text">Nous réalisisons des projets de construction et de génie civil robustes pour soutenir le développement communautaire.</p>
                  <ul className="sheet-bullets-list">
                    <li><strong>Bâtiments Scolaires :</strong> Maîtrise d'œuvre conforme aux cahiers des charges officiels du projet PAPSE.</li>
                    <li><strong>Ouvrages Hydro-agricoles :</strong> Construction de barrières de rétention et réseaux de maîtrise de l'eau.</li>
                    <li><strong>Rigueur BTP :</strong> Respect strict des délais de livraison contractuels et des barèmes de sécurité.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'bureau' && (
                <div className="expertise-standalone-sheet">
                  <h3>📊 Bureau d'Études, Conception & Faisabilité</h3>
                  <p className="sheet-intro-text">Nous sécurisons vos futurs investissements grâce à une planification technique, financière et analytique de premier ordre.</p>
                  <ul className="sheet-bullets-list">
                    <li><strong>Business Plans :</strong> Rédaction complète de plans d'affaires viables pour banques et bailleurs.</li>
                    <li><strong>Filière Laitière :</strong> Appui stratégique, à l'image du projet laitier périurbain avec le Centre Suisse de Recherches Scientifiques en Côte d'Ivoire.</li>
                    <li><strong>Micro-Unités de Transformation :</strong> Conception d'unités locales (ex: fabrication d'huile d'arachide).</li>
                  </ul>
                </div>
              )}
            </div>

            {/* 3. SEULEMENT LE BOUTON VERT DE COMMANDE EN BAS */}
            <div className="expertises-action-footer">
              <p>Vous souhaitez planifier une étude de projet avec nos ingénieurs ?</p>
              <button className="expertises-cta-btn" onClick={() => navigate('/demande-devis')}>
                📝 Soumettre mon cahier des charges de devis gratuit
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
