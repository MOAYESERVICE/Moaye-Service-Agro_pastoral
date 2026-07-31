import React, { useState, useEffect } from 'react';
import './Home.css';
// CORRECTION 1 : Importation obligatoire de Link pour éviter l'écran blanc
import { Link } from 'react-router-dom';

// Importation de vos photos locales
import heroImg from '../assets/hero.png'; 
import yaSimeonImg from '../assets/YaSimeon.png'; 
import pindadImg from '../assets/Pindad.png';
import gervaisonImg from '../assets/gervaison.png';
import batimentImg from '../assets/batiment.png';

export default function Home() {
  // CORRECTION 2 : Création du tableau d'images pour le carrousel de droite
  const imagesCarousel = [pindadImg, heroImg, gervaisonImg];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- MACHINE À ÉCRIRE (EFFET EN BOUCLE SUR LE PARAGRAPHE) ---
  const fullText = "Moaye Service vous accompagnera dans vos différents projets agropastoraux de la conception au suivi-encadrement, en passant par la recherche de parcelle et la mise en place de votre ferme.";
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);

  // --- LOGIQUE FILTRES DE LA PLÉTHORE D'IMAGES ---
  const [activeFilter, setActiveFilter] = useState('TOUT');

  // Catalogue complet des réalisations réelles de Moaye Service
  const realisationsCatalogue = [
    {
      id: 1,
      categorie: "BTP",
      titre: "Bâtiment Scolaire PAPSE",
      localisation: "Région Nord, Côte d'Ivoire",
      desc: "Construction de salles de classe durables et sécurisées conformes aux normes étatiques.",
      img: batimentImg
    },
    {
      id: 2,
      categorie: "AVICOLE",
      titre: "Complexe de 20 000 Pondeuses",
      localisation: "Ferme de Toumodi",
      desc: "Installation de parcs avicoles modernes et systèmes de provenderie intégrés.",
      img: gervaisonImg
    },
    {
      id: 3,
      categorie: "AQUACOLE",
      titre: "Bassins Piscicoles Hors-Sol",
      localisation: "Zone Centre, Côte d'Ivoire",
      desc: "Conception de dispositifs hydro-agricoles en circuit fermé pour l'aquaculture durable.",
      img: pindadImg
    },
    {
      id: 4,
      categorie: "BTP",
      titre: "Infrastructures Rurales",
      localisation: "Yamoussoukro",
      desc: "Aménagements de bâtiments techniques et entrepôts de stockage agricole.",
      img: heroImg
    }
  ];

  // Filtrage des cartes selon l'onglet sélectionné
  const projetsFilitres = activeFilter === 'TOUT' 
    ? realisationsCatalogue 
    : realisationsCatalogue.filter(p => p.categorie === activeFilter);

  // Animation automatique du carrousel de droite
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesCarousel.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [imagesCarousel.length]);

  // Animation de la machine à écrire
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
             <Link to="/notre-vision" className="farm-link-btn">
              Découvrir notre vision ➔
          </Link>
          </div>
           
        </div>

        {/* BLOC 2 : NOTRE MÉTHODOLOGIE (Texte à GAUCHE, Image à DROITE) */}
        <div className="farm-flex-container">
          <div className="farm-left-content">
            <h3>Rigueur et Gestion de Projet</h3>
            <p>
              La réussite de vos infrastructures repose sur un processus de suivi technique et opérationnel millimétré. Qu'il s'agisse de bâtiments scolaires ou administratifs conformes aux exigences de type <strong>PAPSE</strong>, notre bureau d'études valide des plannings prévisionnels stricts (Gantt) et soumet des rapports d'étape réguliers.
            </p>
           <Link to="/nos-engagements" className="farm-link-btn">
         Consulter nos engagements ➔
         </Link>


          </div>
          <div className="farm-right-image">
            <img src={gervaisonImg} alt="Élevage Avicole Moaye Service" className="farm-pic-style" />
          </div>
        </div>
      </section>
        
        {/* ===================================================
         SECTION 3 : NOS DOMAINES D'EXPERTISE (JSX EXACT)
         =================================================== */}
      <section className="expertise-section">
        <div className="expertise-header">
          <h2>Nos Domaines d'Expertise</h2>
          <p className="expertise-subtitle">Une double compétence unique pour répondre à vos besoins stratégiques.</p>
        </div>

        <div className="expertise-grid">
          
          {/* Bloc 1 : Études et Conception */}
          <div className="expertise-card">
            <h3> Études et Conception</h3>
            <p>Rédaction de plans d'affaires (Business plans), études de marché et mise en œuvre globale de projets agro-industriels.</p>
            {/* LIKAGE UNIQUE AVEC LE RESPECT DE VOTRE CLASSE CSS ORIGINALE */}
            <Link to="/nos-expertises" className="btn-know-more">
              En savoir plus
            </Link>
          </div>

          {/* Bloc 2 : Technique et Production */}
          <div className="expertise-card">
            <h3> Technique et Production</h3>
            <p>Développement de fermes (notamment aquacoles et piscicoles), construction d'ouvrages hydro-agricoles et formulation d'aliments pour le bétail.</p>
            <Link to="/nos-expertises" className="btn-know-more">
              En savoir plus
            </Link>
          </div>

          {/* Bloc 3 : Formation et Conseil */}
          <div className="expertise-card">
            <h3>Formation et Conseil</h3>
            <p>Encadrement et formation pratique des acteurs locaux (pisciculteurs, éleveurs, coopératives villageoises) aux bonnes pratiques de gestion.</p>
            <Link to="/nos-expertises" className="btn-know-more">
              En savoir plus
            </Link>
          </div>

        </div>
      </section>



             {/* ===================================================
         5. SECTION : NOS PROJETS RÉALISÉS (MIS À JOUR)
         =================================================== */}
      <section className="projects-section" id="projets">
        <div className="projects-header">
          <h2>Projets & Services Réalisés</h2>
          <p className="projects-subtitle">
            Découvrez nos interventions concrètes sous la direction de M. Ya Essé Siméon, alliant ingénierie rigoureuse et entrepreneuriat agricole durable en Côte d'Ivoire.
          </p>
        </div>

        <div className="projects-grid">
          
          {/* Projet 1 : Ferme Intégrée */}
          <div className="project-card">
            <div className="project-img-wrapper">
              <img 
                src={gervaisonImg} 
                alt="Ferme agropastorale intégrée Moaye Service" 
                className="project-img" 
              />
              <span className="project-tag">FERME INTÉGRÉE</span>
            </div>
            <div className="project-content">
              <h3>Ferme Agropastorale Intégrée</h3>
              <p>
                Conception et promotion d'écosystèmes agricoles combinant l'aviculture (40 000 pondeuses), le maraîchage, la pisciculture et l'élevage de caprins avec un système autonome de valorisation des déchets organiques.
              </p>
              <Link to="/nos-expertises" className="project-link">
                Voir la fiche technique →
              </Link>
            </div>
          </div>

          {/* Projet 2 : Accompagnement & Filières Laitières */}
          <div className="project-card">
            <div className="project-img-wrapper">
              <img 
                src={pindadImg} 
                alt="Projet laitier périurbain Moaye Service" 
                className="project-img" 
              />
              <span className="project-tag">ÉTUDES & FILIÈRES</span>
            </div>
            <div className="project-content">
              <h3>Accompagnement & Filière Laitière</h3>
              <p>
                Rédaction de plans d'affaires (business plans) et appui technique de pointe, illustré par notre Projet Laitier Périurbain mené en synergie avec le Centre Suisse de Recherches Scientifiques en Côte d'Ivoire.
              </p>
              <Link to="/nos-expertises" className="project-link">
                Voir la fiche technique →
              </Link>
            </div>
          </div>
        </div>
      </section>
               {/* ===================================================
         7. SECTION : LE MUR DE RÉALISATIONS (PLÉTHORE D'IMAGES FILTRABLES)
         =================================================== */}
      <section className="galerie-section-home" id="mur-realisations">
        <div className="galerie-header-home">
          <span className="galerie-meta-tag-home">NOTRE CATALOGUE OPÉRATIONNEL</span>
          <p className="galerie-subtitle-home">
            Explorez notre galerie de projets pour visualiser la diversité et la qualité de nos interventions sur le terrain en Côte d'Ivoire.
          </p>
        </div>

        {/* ONGLETS DE FILTRAGE ÉPURÉS */}
        <div className="galerie-filters-tabs">
          <button className={`filter-tab-btn ${activeFilter === 'TOUT' ? 'is-active' : ''}`} onClick={() => setActiveFilter('TOUT')}>Tout Voir</button>
          <button className={`filter-tab-btn ${activeFilter === 'BTP' ? 'is-active' : ''}`} onClick={() => setActiveFilter('BTP')}> BTP & Génie Civil</button>
          <button className={`filter-tab-btn ${activeFilter === 'AVICOLE' ? 'is-active' : ''}`} onClick={() => setActiveFilter('AVICOLE')}>Génie Avicole</button>
          <button className={`filter-tab-btn ${activeFilter === 'AQUACOLE' ? 'is-active' : ''}`} onClick={() => setActiveFilter('AQUACOLE')}>Ingénierie Aquacole</button>
        </div>

        {/* GRILLE PORTE-FOLIO DE PLÉTHORE D'IMAGES */}
        <div className="galerie-portfolio-grid">
          {projetsFilitres.map((projet) => (
            <div key={projet.id} className="portfolio-project-card">
              <div className="portfolio-card-img-wrapper">
                <img src={projet.img} alt={projet.titre} />
              </div>
              <div className="portfolio-card-content">
                <span className="portfolio-card-location">📍 {projet.localisation}</span>
                <h4>{projet.titre}</h4>
                <p>{projet.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

           {/* ===================================================
         8. FOOTER RESTRUCTURÉ ET ÉPURÉ (UX SIMPLE)
         =================================================== */}
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

          {/* Menu de navigation discret raccordé à vos pages internes */}
          <div className="footer-simple-nav">
            <Link to="/">Accueil</Link>
            <Link to="/nos-expertises">Services</Link>
            <Link to="/notre-vision">Projets</Link>
            <Link to="/nous-contacter">Contact</Link>
          </div>

        </div>

        {/* Ligne de copyright fine en bas avec signature développeur */}
        <div className="footer-simple-bottom">
          <p>&copy; {new Date().getFullYear()} Moaye Service. Tous droits réservés. Piloté par M. Ya Esse Simeon.</p>
          <p className="footer-dev-credit">
            Développé par <span className="dev-name-highlight">N'GORAN KOFFI MICHAEL</span>
          </p>
        </div>
      </footer>


    </div>
  );
}