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
    // 🌟 FONCTION DE SUPPRESSION : S'exécute uniquement quand le site est 100% prêt
    const supprimerLoaderHtml = () => {
      const htmlLoader = document.getElementById('initial-html-loader');
      if (htmlLoader) {
        htmlLoader.style.opacity = '0'; // Disparition fluide en fondu
        setTimeout(() => {
          if (htmlLoader) htmlLoader.remove(); // Supprime définitivement de l'écran
        }, 250);
      }
    };

    // ⚡ VÉRIFICATION STRICTE DU CHARGEMENT
    if (document.readyState === 'complete') {
      // Si par chance le téléphone a déjà tout fini de charger (images incluses), on coupe
      supprimerLoaderHtml();
    } else {
      // 🌟 LE CŒUR DE VOTRE DEMANDE : On force le rond à tourner tant que l'événement "load" n'a pas dit que tout est prêt !
      window.addEventListener('load', supprimerLoaderHtml);
      return () => window.removeEventListener('load', supprimerLoaderHtml);
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
