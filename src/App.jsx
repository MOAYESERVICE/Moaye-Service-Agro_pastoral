import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

// 🌟 CORRECTION FLASH : La page d'accueil est importée normalement pour éviter le 2ème rond
import Home from './page/Home';

// Les autres pages lourdes restent en "Lazy" pour garder le site ultra-rapide sur mobile
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
    // Supprime instantanément le premier rond d'attente HTML dès que la page d'accueil est prête
    const supprimerLoaderHtml = () => {
      const htmlLoader = document.getElementById('initial-html-loader');
      if (htmlLoader) {
        htmlLoader.style.opacity = '0';
        setTimeout(() => {
          if (htmlLoader) htmlLoader.remove();
        }, 200);
      }
    };
    
    // Libération immédiate de l'écran
    supprimerLoaderHtml();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        
        {/* Le Suspense gère désormais uniquement les transitions des pages secondaires */}
        <Suspense fallback={
          <div className="page-lazy-spinner-box">
            <div className="moaye-mini-spinner"></div>
          </div>
        }>
          <Routes>
            {/* L'accueil s'affiche directement sans déclencher le 2ème spinner */}
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
