// Dashboard.jsx (Modificado para ser clicável)

import React from 'react';
import './Dashboard.css';

// Dentro do seu arquivo Dashboard.jsx

// ... outros imports

// Dentro do seu arquivo Dashboard.jsx

export default function Dashboard({ userEmail, onLogout, onNavigate }) {
  
  // GARANTA QUE SEU MENU SEJA EXATAMENTE ESTE:
  const menuItems = [
    { title: 'Clientes', icon: 'fa-users', target: 'add_client' },
    { title: 'Eventos', icon: 'fa-calendar-alt', target: 'events' },
    { title: 'Cupons', icon: 'fa-ticket-alt', target: 'coupons' },
    { title: 'Setores', icon: 'fa-chart-pie', target: 'sectors' },
    // A linha abaixo é a mais importante. O target deve ser 'lots'
    { title: 'Lotes', icon: 'fa-layer-group', target: 'lots' },
    { title: 'Perfil', icon: 'fa-user-cog', target: 'profile' },
    { title: 'Configurações', icon: 'fa-cogs', target: 'settings' },
    { title: 'Vendas', icon: 'fa-cash-register', target: 'sales' }
  ];
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Bem-vindo, {userEmail}!</h1>
        <button onClick={onLogout} className="logout-button">
          Sair <i className="fas fa-sign-out-alt"></i>
        </button>
      </header>
      <main className="dashboard-content">
        <p><b>Vamos trabalhar?</b></p>
        <div className="dashboard-grid">
          {menuItems.map((item) => (
            // 3. Adicionamos o evento onClick. Ele chama a função onNavigate
            //    passando o 'target' do item clicado (ex: 'add_client')
            <div
              className="dashboard-card"
              key={item.title}
              onClick={() => onNavigate(item.target)}
            >
              <i className={`fas ${item.icon}`}></i>
              <h2>{item.title}</h2>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}