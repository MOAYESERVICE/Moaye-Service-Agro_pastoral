import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

// Chargement direct de la page d'accueil pour une transition propre
import Home from './page/Home';

// Lazy loading des pages secondaires pour économiser la batterie du téléphone
const Auth = lazy(() => import('./page/Auth')); 
const ContactPage = lazy(() => import('./page/ContactPage'));
const DemandeDevis = lazy(() => import('./page/DemandeDevis'));
const ExpertisePage = lazy(() => import('./page/ExpertisePage'));
const VisionPage = lazy(() => import('./page/VisionPage'));
const EngagementsPage = lazy(() => import('./page/EngagementsPage'));
const SuccessPage = lazy(() => import('./page/SuccessPage'));
const EspaceClient = lazy(() => import('./page/EspaceClient'));
const CatalogueCommandes = lazy(() => import('./page/CatalogueCommandes'));

export default function App() {
  
  useEffect(() => {
    // Fonction finale pour effacer le loader de l'écran
    const effacerLoaderDefinitif = (htmlLoader) => {
      if (htmlLoader) {
        htmlLoader.style.opacity = '0'; // Transition douce en fondu transparent
        setTimeout(() => {
          if (htmlLoader) htmlLoader.remove(); // Supprime proprement de la mémoire du mobile
        }, 300);
      }
    };

    // Fonction qui lance le compte à rebours de sécurité une fois le site chargé
    const handleSiteLoaded = () => {
      const htmlLoader = document.getElementById('initial-html-loader');
      
      // 🌟 FORCE LE ROND À TOURNER PENDANT 1,5 SECONDE DE PLUS
      // Cela donne le temps au processeur du téléphone d'afficher les images en arrière-plan
      setTimeout(() => {
        effacerLoaderDefinitif(htmlLoader);
      }, 1500); 
    };

    // Vérification de l'état du navigateur
    if (document.readyState === 'complete') {
      handleSiteLoaded();
    } else {
      // Le rond tourne et attend que le réseau finisse, puis ajoute les 1,5s de sécurité
      window.addEventListener('load', handleSiteLoaded);
      return () => window.removeEventListener('load', handleSiteLoaded);
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        
        <Suspense fallback={
          <div className="page-lazy-spinner-box">
            <div className="moaye-mini-spinner"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/connexion" element={<Auth />} />
            <Route path="/nous-contacter" element={<ContactPage />} />
            <Route path="/demande-devis" element={<DemandeDevis />} />
            <Route path="/nos-expertises" element={<ExpertisePage />} />
            <Route path="/notre-vision" element={<VisionPage />} />
            <Route path="/nos-engagements" element={<EngagementsPage />} />
            <Route path="/confirmation-succes" element={<SuccessPage />} />
            <Route path="/catalogue-commandes" element={<CatalogueCommandes />} />
            <Route path="/espace-client" element={<EspaceClient />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
