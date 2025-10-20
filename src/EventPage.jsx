// EventPage.jsx (Versão Completa)

import React, { useMemo } from 'react';
import './EventPage.css';

export default function EventPage({ event, sectors, lots, cart, setCart, onBackToAdmin, onNavigate }) {

  const handleQuantityChange = (lotId, quantity) => {
    quantity = Math.max(0, parseInt(quantity) || 0);

    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.lotId === lotId);
      if (quantity === 0) {
        return currentCart.filter(item => item.lotId !== lotId);
      }
      if (existingItem) {
        return currentCart.map(item => item.lotId === lotId ? { ...item, quantity } : item);
      } else {
        return [...currentCart, { lotId, quantity }];
      }
    });
  };

  const eventLots = lots.filter(lot => lot.eventId === event.id);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const lot = lots.find(l => l.id === item.lotId);
      return total + (lot.price * item.quantity);
    }, 0);
  }, [cart, lots]);

  const handleCheckout = () => {
    if (cart.length > 0) {
      onNavigate('pix_payment');
    } else {
      alert('Seu carrinho está vazio!');
    }
  };

  if (!event) return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Evento não encontrado!</h1>
      <button onClick={onBackToAdmin} className="back-button">Voltar</button>
    </div>
  );

  return (
    <div className="event-page-container">
      <div className="event-header">
        <img src="https://via.placeholder.com/1200x400.png?text=Banner+do+Evento" alt="Banner do Evento" className="event-banner" />
        <h1>{event.name}</h1>
        <p>{new Date(event.date).toLocaleDateString('pt-BR', { timeZone: 'UTC', dateStyle: 'full' })} - {event.location}</p>
        <button className="back-to-admin-button" onClick={onBackToAdmin}>Voltar para o Painel de Eventos</button>
      </div>
      <div className="event-body">
        <div className="ticket-selection">
          <h2>Escolha seus Ingressos</h2>
          {eventLots.length > 0 ? eventLots.map(lot => {
            const sector = sectors.find(s => s.id === lot.sectorId);
            const quantityInCart = cart.find(item => item.lotId === lot.id)?.quantity || 0;
            return (
              <div className="ticket-item card" key={lot.id}>
                <div className="ticket-details">
                  <h3>{lot.name} - {sector?.name || 'Setor Inválido'}</h3>
                  <p className="ticket-price">R$ {parseFloat(lot.price).toFixed(2)}</p>
                </div>
                <div className="ticket-quantity">
                  <label htmlFor={`qty-${lot.id}`}>Quantidade:</label>
                  <input id={`qty-${lot.id}`} type="number" min="0" value={quantityInCart} onChange={(e) => handleQuantityChange(lot.id, e.target.value)} />
                </div>
              </div>
            );
          }) : <p>Nenhum lote disponível para este evento.</p>}
        </div>
        <div className="cart-summary card">
          <h2>Resumo do Pedido</h2>
          {cart.length === 0 ? (<p>Seu carrinho está vazio.</p>) : (
            <>
              <ul>
                {cart.map(item => {
                  const lot = lots.find(l => l.id === item.lotId);
                  return <li key={item.lotId}>({item.quantity}x) {lot.name} <span>R$ {(lot.price * item.quantity).toFixed(2)}</span></li>
                })}
              </ul>
              <div className="cart-total"><strong>Total:</strong><span>R$ {cartTotal.toFixed(2)}</span></div>
              <button className="checkout-button" onClick={handleCheckout}>Finalizar Compra e Pagar com PIX</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}