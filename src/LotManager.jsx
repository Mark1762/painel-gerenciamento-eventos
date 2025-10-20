import React, { useState } from 'react';
import './LotManager.css';

export default function LotManager({ onBack, events, sectors, lots, setLots }) {
  const [lotFormData, setLotFormData] = useState({ eventId: '', sectorId: '', name: '', price: '', quantity: '' });
  const [editingLotId, setEditingLotId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLotFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!lotFormData.eventId || !lotFormData.sectorId || !lotFormData.name || !lotFormData.price || !lotFormData.quantity) {
      alert('Todos os campos são obrigatórios!');
      return;
    }
    if (editingLotId) {
      setLots(lots.map(l => l.id === editingLotId ? { ...lotFormData, id: editingLotId } : l));
    } else {
      setLots([...lots, { ...lotFormData, id: Date.now() }]);
    }
    handleCancelEdit();
  };

  const handleEditClick = (lot) => {
    setEditingLotId(lot.id);
    setLotFormData(lot);
  };

  const handleDeleteLot = (lotId) => {
    if (!window.confirm('Tem certeza que deseja excluir este lote?')) return;
    setLots(lots.filter(l => l.id !== lotId));
  };

  const handleCancelEdit = () => {
    setEditingLotId(null);
    setLotFormData({ eventId: '', sectorId: '', name: '', price: '', quantity: '' });
  };

  const getEventName = (id) => events.find(e => e.id == id)?.name || 'Evento não encontrado';
  const getSectorName = (id) => sectors.find(s => s.id == id)?.name || 'Setor não encontrado';

  return (
    <div className="lot-manager-container">
      <header className="manager-header">
        <h1>Gerenciar Lotes</h1>
        <button onClick={onBack} className="back-button"><i className="fas fa-arrow-left"></i> Voltar</button>
      </header>
      <div className="form-section card">
        <h2>{editingLotId ? 'Editar Lote' : 'Adicionar Novo Lote'}</h2>
        <form onSubmit={handleFormSubmit} className="manager-form lot-form">
          <select name="eventId" value={lotFormData.eventId} onChange={handleInputChange} required>
            <option value="">Selecione um Evento</option>
            {events.map(event => (<option key={event.id} value={event.id}>{event.name}</option>))}
          </select>
          <select name="sectorId" value={lotFormData.sectorId} onChange={handleInputChange} required>
            <option value="">Selecione um Setor</option>
            {sectors.map(sector => (<option key={sector.id} value={sector.id}>{sector.name}</option>))}
          </select>
          <input type="text" name="name" value={lotFormData.name} onChange={handleInputChange} placeholder="Nome do Lote (ex: Lote 1)" required />
          <input type="number" name="price" value={lotFormData.price} onChange={handleInputChange} placeholder="Preço (R$)" required />
          <input type="number" name="quantity" value={lotFormData.quantity} onChange={handleInputChange} placeholder="Quantidade" required />
          <div className="form-buttons">
            <button type="submit" className="save-button">{editingLotId ? 'Atualizar' : 'Salvar'}</button>
            {editingLotId && <button type="button" className="cancel-button" onClick={handleCancelEdit}>Cancelar</button>}
          </div>
        </form>
      </div>
      <div className="list-section card">
        <h2>Lotes Cadastrados</h2>
        <div className="item-list">
          {lots.map(lot => (
            <div key={lot.id} className="item-card">
              <div className="item-details">
                <strong>{lot.name}</strong>
                <p>{getEventName(lot.eventId)} | {getSectorName(lot.sectorId)}</p>
                <p>Preço: R$ {lot.price} | Quantidade: {lot.quantity}</p>
              </div>
              <div className="item-actions">
                <button className="action-button edit-button" onClick={() => handleEditClick(lot)}><i className="fas fa-pencil-alt"></i></button>
                <button className="action-button delete-button" onClick={() => handleDeleteLot(lot.id)}><i className="fas fa-trash"></i></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}