import React, { useState, useEffect } from 'react';
import './Home.css';
// CORRECTION 1 : Importation obligatoire de Link pour éviter l'écran blanc
import { Link } from 'react-router-dom';

// Importation de vos photos locales
import heroImg from '../assets/hero.png'; 
import yaSimeonImg from '../assets/YaSimeon.png'; 
import pindadImg from '../assets/Pindad.png';
import gervaisonImg from '../assets/gervaison.png';

export default function Home() {
  // CORRECTION 2 : Création du tableau d'images pour le carrousel de droite
  const imagesCarousel = [pindadImg, heroImg, gervaisonImg];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- MACHINE À ÉCRIRE (EFFET EN BOUCLE SUR LE PARAGRAPHE) ---
  const fullText = "Moaye Service vous accompagnera dans vos différents projets agropastoraux de la conception au suivi-encadrement, en passant par la recherche de parcelle et la mise en place de votre ferme.";
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);

  useEffect(() => {
    let timer;
    const typingSpeed = isDeleting ? 25 : 45;

    if (!isDeleting && displayedText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 4000);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      timer = setTimeout(() => setLoopIndex(prev => prev + 1), 500);
    } else {
      timer = setTimeout(() => {
        setDisplayedText(prev => 
          isDeleting 
            ? fullText.substring(0, prev.length - 1) 
            : fullText.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopIndex]);

  return (
    <div className="home-page">
            {/* 1. SECTION HERO AVEC IMAGE DE FOND UNIQUE ET REDIRECTION DEVIS INTERNE */}
      <section className="hero-section">

        {/* CONTENU TEXTUEL : Fixe et totalement au premier plan */}
        <div className="hero-content">
          <div className="hero-badges-clean-layout">
            <span className="hero-tagline">VOTRE PARTENAIRE DE CONFIANCE</span>
            <span className="hero-location">● BASÉ À TOUMODI</span>
          </div>
          
          <h1 className="hero-main-title">
            Moaye Service : Votre partenaire de confiance en Ingénierie Agro-pastorale et BTP en Côte d'Ivoire.
          </h1>
          
          <div className="hero-text-wrapper">
            <p className="hero-text animate-typing">
              {displayedText}
              <span className="typing-cursor">|</span>
            </p>
          </div>
          
          {/* AIGUILLAGE STRICT : Ce bouton cible désormais l'itinéraire de votre nouveau document */}
          <div className="hero-cta-zone">
            <Link to="/demande-devis" className="btn-green-devis-hero">
               Demander un devis
            </Link>
          </div>
        </div>

      </section>
      {/* 2. BANDEAU DE VALEURS / PILIERS AVEC DÉFILEMENT INFINI */}
      <div className="features-bar">
        <div className="features-track">
          <span>SOLUTIONS INTÉGRÉES — </span>
          <span>QUALITÉ TECHNIQUE — </span>
          <span>SUIVI RIGOUREUX — </span>
          <span>DÉVELOPPEMENT DURABLE — </span>
          
          <span>SOLUTIONS INTÉGRÉES — </span>
          <span>QUALITÉ TECHNIQUE — </span>
          <span>SUIVI RIGOUREUX — </span>
          <span>DÉVELOPPEMENT DURABLE — </span>
        </div>
      </div>

      {/* SECTION PRESENTATION DE LA VISION DE SIMEON */}
      <section className="farm-presentation-section">
        <div className="farm-center-header">
          <h2>L'Excellence Technique à <span className="handwritten-green">Toumodi</span></h2>
          <p className="farm-big-intro">
            Nous pilotons un écosystème avicole moderne de 40 000 pondeuses, développons l'ingénierie aquacole et cultivons nos terres avec une rigueur absolue.
          </p>
          <span className="farm-sub-tag">MOAYE SERVICE MULTISERVICES</span>
        </div>

        {/* BLOC 1 : NOTRE IDENTITÉ (Image à GAUCHE, Texte à DROITE) */}
        <div className="farm-flex-container mb-24">
          <div className="farm-right-image">
            <img src={yaSimeonImg} alt="M. Ya Esse Simeon - Moaye Service" className="farm-pic-style" />
          </div>
          <div className="farm-left-content">
            <h3>Notre Approche Prestation</h3>
            <p>
              Sous la direction stratégique de <strong>M. Ya Esse Simeon</strong>, Moaye Service s'impose comme un acteur majeur du développement rural en Côte d'Ivoire. Nous fusionnons l'ingénierie agropastorale moderne et les réalités du terrain pour concevoir des structures viables, performantes et créatrices de valeur pour toutes les communautés rurales.
            </p>
            <a 
              href="https://wa.me." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="farm-link-btn"
            >
              Découvrir notre vision ➔
            </a>
          </div>
        </div>

        {/* BLOC 2 : NOTRE MÉTHODOLOGIE (Texte à GAUCHE, Image à DROITE) */}
        <div className="farm-flex-container">
          <div className="farm-left-content">
            <h3>Rigueur et Gestion de Projet</h3>
            <p>
              La réussite de vos infrastructures repose sur un processus de suivi technique et opérationnel millimétré. Qu'il s'agisse de bâtiments scolaires ou administratifs conformes aux exigences de type <strong>PAPSE</strong>, notre bureau d'études valide des plannings prévisionnels stricts (Gantt) et soumet des rapports d'étape réguliers.
            </p>
            <a 
              href="https://wa.me." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="farm-link-btn"
            >
              Consulter nos engagements ➔
            </a>
          </div>
          <div className="farm-right-image">
            <img src={gervaisonImg} alt="Élevage Avicole Moaye Service" className="farm-pic-style" />
          </div>
        </div>
      </section>
            {/* 4. SECTION : NOS DOMAINES D'EXPERTISE */}
      <section className="expertise-section">
        <div className="expertise-header">
          <h2>Nos Domaines d'Expertise</h2>
          <p className="expertise-subtitle">Une double compétence unique pour répondre à vos besoins stratégiques.</p>
        </div>

        <div className="expertise-grid">
          
          {/* Bloc 1 : Études et Conception */}
          <div className="expertise-card">
            <h3>Volet Études et Conception</h3>
            <p>Rédaction de plans d'affaires (Business plans), études de marché et mise en œuvre globale de projets agro-industriels.</p>
            <button className="btn-know-more">
              En savoir plus
            </button>
          </div>

          {/* Bloc 2 : Technique et Production */}
          <div className="expertise-card">
            <h3>Volet Technique et Production</h3>
            <p>Développement de fermes (notamment aquacoles et piscicoles), construction d'ouvrages hydro-agricoles et formulation d'aliments pour le bétail.</p>
            <button className="btn-know-more">
              En savoir plus
            </button>
          </div>

          {/* Bloc 3 : Formation et Conseil */}
          <div className="expertise-card">
            <h3>Volet Formation et Conseil</h3>
            <p>Encadrement et formation pratique des acteurs locaux (pisciculteurs, éleveurs, coopératives villageoises) aux bonnes pratiques de gestion.</p>
            <button className="btn-know-more">
              En savoir plus
            </button>
          </div>

        </div>
      </section>
            {/* 5. SECTION : NOS PROJETS RÉALISÉS */}
      <section className="projects-section" id="projets">
        <div className="projects-header">
          <span className="projects-badge">— RÉALISATIONS DE TERRAIN</span>
          <h2>Nos Projets Réalisés</h2>
          <p className="projects-subtitle">
            Découvrez nos interventions concrètes alliant ingénierie rigoureuse et impact communautaire durable.
          </p>
        </div>

        <div className="projects-grid">
          
          {/* Projet 1 : BTP / PAPSE */}
          <div className="project-card">
            <div className="project-img-wrapper">
              {/* Image en ligne fiable et haute définition pour les infrastructures scolaires */}
              <img 
                src="https://unsplash.com" 
                alt="Infrastructures scolaires PAPSE" 
                className="project-img" 
              />
              <span className="project-tag">BTP & ARCHITECTURE</span>
            </div>
            <div className="project-content">
              <h3>Infrastructures Scolaires (Type PAPSE)</h3>
              <p>
                Construction et réhabilitation complète de bâtiments scolaires et administratifs en zone rurale, respectant scrupuleusement les normes de sécurité et les délais contractuels.
              </p>
              <a 
                href="https://wa.me." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-link"
              >
                Voir la fiche technique →
              </a>
            </div>
          </div>

          {/* Projet 2 : Ferme Avicole de Toumodi */}
          <div className="project-card">
            <div className="project-img-wrapper">
              {/* Image en ligne fiable et haute définition pour le poulailler */}
              <img 
                src="https://unsplash.com" 
                alt="Ferme avicole Moaye Service" 
                className="project-img" 
              />
              <span className="project-tag">INGÉNIERIE AGROPASTORALE</span>
            </div>
            <div className="project-content">
              <h3>Complexe Avicole de Toumodi</h3>
              <p>
                Conception globale et suivi-encadrement d'un site moderne hébergeant plus de 40 000 poules pondeuses, avec intégration d'un système optimisé de formulation d'aliments.
              </p>
              <a 
                href="https://wa.me." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-link"
              >
                Voir la fiche technique →
              </a>
            </div>
          </div>

        </div>
      </section>
    
            {/* SECTION EXCLUSIVE : GALERIE DE TERRAIN INTERACTIVE */}
      <section className="gallery-section">
        <div className="gallery-header">
          <span className="gallery-badge">— IMAGES RÉELLES DE NOS CHANTIERS</span>
          <h2>Moaye Service en Action</h2>
          <p className="gallery-subtitle">
            Aperçu en images de nos projets de construction BTP, d'aménagements agropastoraux et de suivi technique sur le terrain.
          </p>
        </div>

        {/* Le conteneur du carrousel de la galerie */}
        <div className="gallery-carousel-wrapper">
          <div className="gallery-track-scroll">
            
            {/* Image Galerie 1 : Poulailler/Chantier */}
            <div className="gallery-item-card">
              <img 
                src="https://unsplash.com" 
                alt="Chantier BTP Moaye Service" 
              />
              <div className="gallery-item-info">
                <h4>Infrastructures BTP</h4>
                <p>Suivi des maçonneries et fondations</p>
              </div>
            </div>

            {/* Image Galerie 2 : Aménagement Agricole */}
            <div className="gallery-item-card">
              <img 
                src="https://unsplash.com" 
                alt="Aménagement de parcelles" 
              />
              <div className="gallery-item-info">
                <h4>Aménagement Rural</h4>
                <p>Préparation et traçage des sols</p>
              </div>
            </div>

            {/* Image Galerie 3 : Élevage Technique */}
            <div className="gallery-item-card">
              <img 
                src="https://unsplash.com" 
                alt="Bâtiment Avicole Toumodi" 
              />
              <div className="gallery-item-info">
                <h4>Élevage Avicole</h4>
                <p>Structures de ponte modernisées</p>
              </div>
            </div>

            {/* Image Galerie 4 : Bassins / Hors-sol */}
            <div className="gallery-item-card">
              <img 
                src="https://unsplash.com" 
                alt="Ingénierie Aquacole" 
              />
              <div className="gallery-item-info">
                <h4>Ingénierie Aquacole</h4>
                <p>Suivi des cages et hors-sol</p>
              </div>
            </div>

          </div>
        </div>

        {/* Bouton pour proposer au client d'envoyer son propre cahier des charges par photo */}
        <div className="gallery-cta-box">
          <p>Vous avez un projet similaire à nous soumettre ?</p>
          <a 
            href="https://wa.me." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="gallery-whatsapp-btn"
          >
            📸 Partager mes photos sur WhatsApp
          </a>
        </div>
      </section>



      
      {/* 6. SECTION : PARTENAIRES OFFICIELS (Validée par le client) */}
      <section className="partners-section">
        <div className="partners-header">
          <span className="partners-top-badge">— ALLIANCES STRATÉGIQUES</span>
          <h3>Les structures qui nous ont fait confiance</h3>
          <p>Organisations internationales et programmes étatiques associés à nos réalisations de terrain.</p>
        </div>
        
        {/* Grille contenant les 6 structures officielles du client */}
        <div className="partners-grid-flow">
          <div className="partner-logo-card">IRC</div>
          <div className="partner-logo-card">GIZ</div>
          <div className="partner-logo-card">PAPC</div>
          <div className="partner-logo-card">SOCODEVI</div>
          <div className="partner-logo-card">PNUD-CI</div>
          <div className="partner-logo-card">PAPSE</div>
        </div>
      </section>
            {/* 8. FOOTER RESTRUCTURÉ ET ÉPURÉ (UX SIMPLE) */}
      <footer className="moaye-simple-footer">
        <div className="footer-simple-container">
          
          {/* Bloc Marque à gauche */}
          <div className="footer-simple-brand">
            <h3>Moaye <span>Service</span></h3>
            <p>Ingénierie Agro-pastorale & BTP ● Toumodi</p>
          </div>

          {/* Coordonnées au centre de l'attention */}
          <div className="footer-simple-contacts">
            <p className="footer-phone-highlight">🟢 (225) 05-65-64-08-05</p>
            <p><a href="mailto:contact@moaye-service.com">contact@moaye-service.com</a></p>
          </div>

          {/* Menu de navigation discret à droite */}
          <div className="footer-simple-nav">
            <a href="#accueil">Accueil</a>
            <a href="#services">Services</a>
            <a href="#projets">Projets</a>
            <a href="#contact">Contact</a>
          </div>

        </div>

        {/* Ligne de copyright fine en bas */}
        <div className="footer-simple-bottom">
          <p>&copy; {new Date().getFullYear()} Moaye Service. Tous droits réservés. Piloté par M. Ya Esse Simeon.</p>
        </div>
      </footer>


    </div>
  );
}
