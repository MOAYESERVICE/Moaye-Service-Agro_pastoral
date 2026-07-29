// src/page/Elevage.jsx
import { Link } from 'react-router-dom';

export default function Elevage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Page Production Élevage</h1>
      <p>Gestion des bovins et des volailles.</p>
      
      {/* Ce lien permet de revenir en arrière */}
      <Link to="/" style={{ color: 'green', textDecoration: 'underline' }}>
        Retour au Tableau de bord
      </Link>
    </div>
  );
}
