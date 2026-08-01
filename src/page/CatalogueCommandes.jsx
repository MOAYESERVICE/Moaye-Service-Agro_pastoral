import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CatalogueCommandes.css';

// Importation de vos photos locales de terrain
import heroImg from '../assets/hero.png'; 
import pindadImg from '../assets/Pindad.png';
import gervaisonImg from '../assets/gervaison.png';
import batimentImg from '../assets/batiment.png';

export default function CatalogueCommandes() {
  const navigate = useNavigate();

  // Liste de vos réalisations Moaye Service
  const cataloguePhotos = [
    { id: 1, titre: "Bâtiment Scolaire PAPSE", img: batimentImg },
    { id: 2, titre: "Complexe Avicole Moderne", img: gervaisonImg },
    { id: 3, titre: "Système Aquacole Hors-Sol", img: pindadImg },
    { id: 4, titre: "Infrastructures Rurales BTP", img: heroImg },
  ];

  const handleBackToHomeGallery = () => {
    navigate('/');
    setTimeout(() => {
      const gallerySection = document.getElementById('mur-realisations');
      if (gallerySection) gallerySection.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="plethore-page-wrapper">
      <div className="plethore-main-container">
        
        {/* EN-TÊTE HORIZONTAL MINIMALISTE */}
        <header className="plethore-clean-header">
          <div className="plethore-header-left">
            <h2>Nos Projets & Réalisations</h2>
            <p className="plethore-subtitle">
              Infrastructures techniques clés livrées et pilotées par Moaye Service en Côte d'Ivoire.
            </p>
          </div>
          <button className="plethore-back-btn" onClick={handleBackToHomeGallery}>
            ← Retour à l'accueil
          </button>
        </header>

        {/* GRILLE À 3 COLONNES IMMERSIVES AVEC BOUTONS INTÉGRÉS */}
        <div className="plethore-photos-grid">
          {cataloguePhotos.map((photo) => (
            <div key={photo.id} className="plethore-photo-card">
              
              <div className="plethore-img-box">
                <img src={photo.img} alt={photo.titre} />
                <div className="plethore-image-title-overlay">
                  <h4>{photo.titre}</h4>
                </div>
              </div>

              <div className="plethore-card-action-bar">
                <button className="card-action-btn cmd-style" onClick={() => navigate('/connexion')}>
                  Commande
                </button>
                <button className="card-action-btn devis-style" onClick={() => navigate('/demande-devis')}>
                  Demander un devis
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
