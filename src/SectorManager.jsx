import React, { useState } from 'react';
import './SectorManager.css';

export default function SectorManager({ onBack, sectors, setSectors }) {
  const [sectorFormData, setSectorFormData] = useState({ name: '', capacity: '' });
  const [editingSectorId, setEditingSectorId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSectorFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!sectorFormData.name || !sectorFormData.capacity) {
      alert('Nome e Capacidade são obrigatórios!');
      return;
    }
    if (editingSectorId) {
      setSectors(sectors.map(s => s.id === editingSectorId ? { ...sectorFormData, id: editingSectorId } : s));
    } else {
      setSectors([...sectors, { ...sectorFormData, id: Date.now() }]);
    }
    handleCancelEdit();
  };

  const handleEditClick = (sector) => {
    setEditingSectorId(sector.id);
    setSectorFormData(sector);
  };

  const handleDeleteSector = (sectorId) => {
    if (!window.confirm('Tem certeza que deseja excluir este setor?')) return;
    setSectors(sectors.filter(s => s.id !== sectorId));
  };
  
  const handleCancelEdit = () => {
    setEditingSectorId(null);
    setSectorFormData({ name: '', capacity: '' });
  };

  return (
    <div className="sector-manager-container">
      <header className="manager-header">
        <h1>Gerenciar Setores</h1>
        <button onClick={onBack} className="back-button">
          <i className="fas fa-arrow-left"></i> Voltar
        </button>
      </header>

      <div className="form-section card">
        <h2>{editingSectorId ? 'Editar Setor' : 'Adicionar Novo Setor'}</h2>
        <form onSubmit={handleFormSubmit} className="manager-form sector-form">
          <input type="text" name="name" value={sectorFormData.name} onChange={handleInputChange} placeholder="Nome do Setor (ex: Pista)" />
          <input type="number" name="capacity" value={sectorFormData.capacity} onChange={handleInputChange} placeholder="Capacidade Máxima" />
          <div className="form-buttons">
            <button type="submit" className="save-button">{editingSectorId ? 'Atualizar' : 'Salvar'}</button>
            {editingSectorId && <button type="button" className="cancel-button" onClick={handleCancelEdit}>Cancelar</button>}
          </div>
        </form>
      </div>

      {}
      <div className="list-section card">
        <h2>Setores Cadastrados</h2>
        <div className="item-list">
          {sectors.map(sector => (
            <div key={sector.id} className="item-card">
              <div className="item-details">
                <strong>{sector.name}</strong>
                <p>Capacidade: {sector.capacity} pessoas</p>
              </div>
              <div className="item-actions">
                <button className="action-button edit-button" onClick={() => handleEditClick(sector)}><i className="fas fa-pencil-alt"></i></button>
                <button className="action-button delete-button" onClick={() => handleDeleteSector(sector.id)}><i className="fas fa-trash"></i></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}