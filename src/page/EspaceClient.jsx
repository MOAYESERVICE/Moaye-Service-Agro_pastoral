import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, ShieldCheck, FileText, LogOut, Plus, Download, Send, Wallet } from 'lucide-react';
import './EspaceClient.css';

export default function EspaceClient() {
  const navigate = useNavigate();
  
  // Solution : On charge d'abord la mémoire locale pour éviter l'écran blanc au rechargement
  const [client, setClient] = useState(() => {
    const sauvegarde = localStorage.getItem('moaye_profil_complet');
    return sauvegarde ? JSON.parse(sauvegarde) : { nom: "Koffi", type: "Producteur / Éleveur", vill: "TOUMODI", tel: "+225 05 65 64 08 06", date: "31/07/2026" };
  });

  const [commandes, setCommandes] = useState([
    { id: "MY-2026-01", axe: "🐣 Génie Avicole", detail: "Installation bâtiment technique de 10 000 pondeuses", budget: "8 500 000 F CFA", statut: "En cours d'exécution", statusCode: "in-progress", progression: 65, etape: "Gros Œuvre & Maçonnerie" },
    { id: "MY-2026-02", axe: "🏗️ BTP & Génie Civil", detail: "Construction d'un magasin de stockage de provende", budget: "4 200 000 F CFA", statut: "Validé & Chiffré", statusCode: "validated", progression: 30, etape: "Fondations & Implantation" }
  ]);

  const [livrables] = useState([
    { id: 1, nom: "Business_Plan_Rentabilite_Pondeuses_Signe.pdf", path: "/docs/business_plan.pdf" },
    { id: 2, nom: "Plan_Architectural_Entrepot_BTP_Certifie.pdf", path: "/docs/plan_architectural.pdf" }
  ]);
  
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bureau', text: "Bonjour, comment pouvons-nous vous aider aujourd'hui ?", time: "10:30" }
  ]);

  // Synchronisation automatique si les données changent
  useEffect(() => {
    const profilStocke = localStorage.getItem('moaye_profil_complet');
    if (profilStocke) {
      const data = JSON.parse(profilStocke);
      setClient(data);
    }
  }, []);

  const handleDeconnexion = () => { localStorage.clear(); navigate('/'); window.location.reload(); };

  const handleSendMessage = (e) => {
    e.preventDefault(); if (!message.trim()) return;
    setChatMessages([...chatMessages, { id: Date.now(), sender: 'client', text: message, time: "Maintenant" }]);
    setMessage('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bureau', text: "Message reçu par notre ingénieur de zone.", time: "Maintenant" }]);
    }, 1000);
  };

  return (
    <div className="client-dashboard-wrapper"><div className="client-dashboard-container">
      <header className="dashboard-header-line">
        <div className="dashboard-welcome-txt">
          <span className="dashboard-badge-status"><ShieldCheck size={12} /> COMPTE ACTIF</span>
          <h2>Espace Client — <span className="client-name-highlight">{client.nom}</span></h2>
          <p className="dashboard-sub"><strong>{client.type}</strong> ● <strong>{client.vill}</strong></p>
        </div>
        <button className="dashboard-logout-btn" onClick={handleDeconnexion}><LogOut size={16} /> Déconnexion</button>
      </header>

      <div className="dashboard-stats-grid">
        <div className="stat-compact-card"><Briefcase size={20} /><div className="stat-card-texts"><span>{commandes.length} Projets</span><p>Fiches actives</p></div></div>
        <div className="stat-compact-card"><Wallet size={20} /><div className="stat-card-texts"><span>Suivi Budget</span><p>Chiffrages Moaye</p></div></div>
        <div className="stat-compact-card"><FileText size={20} /><div className="stat-card-texts"><span>Contact</span><p>{client.tel}</p></div></div>
      </div>

      <div className="dashboard-orders-section">
        <div className="orders-section-header"><h3>Avancement des infrastructures</h3><button onClick={() => navigate('/demande-devis')}><Plus size={16} /> Nouveau projet</button></div>
        <div className="moaye-orders-cards-list">{commandes.map((cmd) => (
          <div key={cmd.id} className="moaye-order-item-card">
            <div className="order-card-main-row">
              <div className="order-info-block"><span>{cmd.id}</span><h4>{cmd.axe}</h4><p>{cmd.detail}</p></div>
              <div className="order-financial-block"><span>Budget</span><strong>{cmd.budget}</strong></div>
              <div className="order-status-block"><span className={`status-pill-badge status-${cmd.statusCode}`}>{cmd.statut}</span></div>
            </div>
            <div className="order-card-progress-zone"><div className="progress-text-line"><span>Étape : {cmd.etape}</span><span>{cmd.progression}%</span></div>
            <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: `${cmd.progression}%` }}></div></div></div>
          </div>
        ))}</div>
      </div>

      <div className="dashboard-twocolumn-grid">
        <div className="dashboard-docs-section">
          <h3>Livrables & Certifications</h3>
          <div className="dashboard-docs-list">{livrables.map((doc) => (
            <div key={doc.id} className="document-download-row"><span>{doc.nom}</span><a href={doc.path} download={doc.nom} className="doc-download-btn"><Download size={14} /> PDF</a></div>
          ))}</div>
        </div>

        <div className="dashboard-support-section">
          <h3>Liaison Bureau d'Études</h3>
          <div className="moaye-chat-box" style={{height: "120px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "5px", padding: "10px", background: "#f1f5f9"}}>
            {chatMessages.map(msg => <div key={msg.id} style={{alignSelf: msg.sender === 'client' ? 'flex-end' : 'flex-start', background: msg.sender === 'client' ? '#114314' : '#cbd5e1', color: msg.sender === 'client' ? 'white' : 'black', padding: '6px', borderRadius: '6px', fontSize: '12px'}}>{msg.text}</div>)}
          </div>
          <form onSubmit={handleSendMessage} className="support-form-box">
            <input type="text" placeholder="Posez votre question..." value={message} onChange={(e) => setMessage(e.target.value)} required />
            <button type="submit"><Send size={14} /></button>
          </form>
        </div>
      </div>
    </div></div>
  );
}
