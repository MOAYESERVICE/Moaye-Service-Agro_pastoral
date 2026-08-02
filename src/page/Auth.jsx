import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

// 🌟 CONFIGURATION DYNAMIQUE CLOUD AUTOMATIQUE : Aligné sur votre tunnel ngrok actif
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://ngrok-free.dev';

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', codeSecret: '', nom: '', type: '', tel: '', vill: '', sec: '', srv: '', vol: '' });
  const [pref, setPref] = useState({ f: '🇨🇮', c: '+225' });
  const [open, setOpen] = useState(false);

  const val = (f, v) => setForm(p => ({ ...p, [f]: v }));

  const pays = [
    { c: "+225", n: "Côte d'Ivoire", f: "🇨🇮" },
    { c: "+223", n: "Mali", f: "🇲🇱" },
    { c: "+226", n: "Burkina Faso", f: "🇧🇫" },
    { c: "+221", n: "Sénégal", f: "🇸🇳" },
    { c: "+224", n: "Guinée", f: "🇬🇳" },
    { c: "+227", n: "Niger", f: "🇳🇪" },
    { c: "+228", n: "Togo", f: "🇹🇬" },
    { c: "+229", n: "Bénin", f: "🇧🇯" },
    { c: "+237", n: "Cameroun", f: "🇨🇲" },
    { c: "+241", n: "Gabon", f: "🇬🇦" },
    { c: "+242", n: "Congo-Brazzaville", f: "🇨🇬" },
    { c: "+243", n: "RDC (Congo)", f: "🇨🇩" },
    { c: "+33", n: "France", f: "🇫🇷" },
    { c: "+32", n: "Belgique", f: "🇧🇪" },
    { c: "+41", n: "Suisse", f: "🇨🇭" },
    { c: "+1", n: "États-Unis / Canada", f: "🇺🇸" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.codeSecret.length !== 4) return alert("Le mot de passe doit contenir 4 chiffres.");

    try {
      if (mode === 'register') {
        // ☁️ Envoi sécurisé via la variable API globale
        const response = await fetch(`${API_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: form.nom,
            clientType: form.type,
            phone: `${pref.c} ${form.tel}`,
            location: form.vill,
            sector: form.sec,
            services: form.srv,
            projectSize: form.vol,
            email: form.email,
            password: form.codeSecret
          })
        });

        const data = await response.json();
        if (data.success) {
          alert("Compte créé avec succès ! Connectez-vous.");
          setMode('login');
        } else {
          alert(data.message || "Erreur lors de l'inscription.");
        }

      } else {
        // ☁️ Connexion sécurisée via la variable API globale
        const response = await fetch(`${API_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, password: form.codeSecret })
        });

        const data = await response.json();
        if (data.success) {
          localStorage.setItem('session_moaye_client', 'true');
          localStorage.setItem('client_email', form.email);
          navigate('/espace-client'); 
        } else {
          alert(data.message || "Identifiants incorrects.");
        }
      }
    } catch (err) {
      alert("Erreur : Impossible de joindre le serveur de base de données Moaye Service Cloud.");
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card-box" style={{ maxWidth: mode === 'register' ? '600px' : '420px' }}>

        <h2>{mode === 'login' ? 'Espace Connexion' : 'Créer un compte'}</h2>
        <p className="auth-subtitle">Moaye Service — Plateforme Agropastorale & BTP</p>

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <>
              <div className="auth-input-group"><label>Nom / Entreprise*</label>
                <input type="text" placeholder="Nom ou Entreprise" value={form.nom} onChange={e => val('nom', e.target.value)} required />
              </div>

              <div className="auth-input-group"><label>Type de client *</label>
                <div className="auth-radio-custom-grid">
                  {['Producteur / Éleveur', 'Coopérative', 'Fournisseur', 'Partenaire'].map(t => (
                    <label key={t} className={`auth-radio-label-box ${form.type === t ? 'checked' : ''}`}>
                      <input type="radio" name="t" checked={form.type === t} onChange={() => val('type', t)} required /><span>{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="auth-input-group" style={{ position: 'relative' }}><label>Contact téléphonique *</label>
                <div className="auth-phone-custom-container">
                  <div className="auth-phone-prefix-trigger" onClick={() => setOpen(!open)}>
                    <span style={{ fontSize: '1.2rem' }}>{pref.f}</span>
                    <strong style={{ marginLeft: '4px' }}>{pref.c}</strong>
                    <span style={{ fontSize: '0.7rem', marginLeft: '2px' }}>▼</span>
                  </div>
                  <input type="tel" placeholder="Numéro de téléphone" value={form.tel} onChange={e => val('tel', e.target.value.replace(/\D/g, ''))} required />
                  
                  {open && (
                    <div className="moaye-countries-card-dropdown">
                      {pays.map(p => (
                        <div key={p.c} className="moaye-country-option-row" onClick={() => { setPref({ f: p.f, c: p.c }); setOpen(false); }}>
                          <span style={{ fontSize: '1.2rem', marginRight: '10px' }}>{p.f}</span>
                          <span style={{ flex: 1, textAlign: 'left', fontWeight: '500' }}>{p.n}</span>
                          <strong style={{ color: '#114314' }}>{p.c}</strong>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="auth-input-group"><label>Localisation de la ferme *</label>
                <input type="text" placeholder="Ville ou Région" value={form.vill} onChange={e => val('vill', e.target.value)} required />
              </div>

              <div className="auth-input-group"><label>Secteur principal *</label>
                <div className="auth-radio-custom-grid">
                  {['Agriculture', 'Élevage', 'Nutrition', 'Formation'].map(s => (
                    <label key={s} className={`auth-radio-label-box ${form.sec === s ? 'checked' : ''}`}>
                      <input type="radio" name="s" checked={form.sec === s} onChange={() => val('sec', s)} required /><span>{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="auth-input-group"><label>Services demandés *</label>
                <textarea rows="2" placeholder="Ex: achat de provende, suivi technique..." value={form.srv} onChange={e => val('srv', e.target.value)} required />
              </div>

              <div className="auth-input-group"><label>Taille du projet *</label>
                <input type="text" placeholder="Nombre de têtes, superficie..." value={form.vol} onChange={e => val('vol', e.target.value)} required />
              </div>
            </>
          )}

          <div className="auth-input-group"><label>Adresse E-mail *</label>
            <input type="email" placeholder="Ex: nom@mail.com" value={form.email} onChange={e => val('email', e.target.value)} required />
          </div>

          <div className="auth-input-group"><label>Mot de passe (4 chiffres) *</label>
            <input type="text" maxLength="4" pattern="[0-9]{4}" inputMode="numeric" placeholder="••••" value={form.codeSecret} onChange={e => val('codeSecret', e.target.value.replace(/\D/g, ''))} required />
          </div>

          <button type="submit" className="btn-auth-main">{mode === 'login' ? 'SE CONNECTER' : 'S\'INSCRIRE'}</button>
        </form>

        <div className="auth-switch-link">
          <p>{mode === 'login' ? "Nouveau ?" : "Membre ?"} <span onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? "Créer un compte ici" : "Se connecter ici"}</span></p>
        </div>
      </div>
    </div>
  );
}
