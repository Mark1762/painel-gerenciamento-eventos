import React, { useState } from 'react';
import './EventManager.css';

export default function EventManager({ onBack, events, setEvents, onNavigate }) { 
  const [eventFormData, setEventFormData] = useState({ name: '', date: '', location: '' });
  const [editingEventId, setEditingEventId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditClick = (eventToEdit) => {
    setEditingEventId(eventToEdit.id);
    setEventFormData(eventToEdit);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!eventFormData.name || !eventFormData.date || !eventFormData.location) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    if (editingEventId) {
      setEvents(events.map(event => event.id === editingEventId ? { ...event, ...eventFormData } : event));
    } else {
      setEvents([...events, { ...eventFormData, id: Date.now() }]);
    }
    handleCancelEdit();
  };

  const handleCancelEdit = () => {
    setEditingEventId(null);
    setEventFormData({ name: '', date: '', location: '' });
  };

  const handleDeleteEvent = (eventIdToDelete) => {
    if (!window.confirm('Tem certeza de que deseja excluir este evento?')) return;
    setEvents(events.filter(event => event.id !== eventIdToDelete));
  };
  
  return (
    <div className="event-manager-container">
      <header className="event-manager-header">
        <h1>Gerenciar Eventos</h1>
        <button onClick={onBack} className="back-button"><i className="fas fa-arrow-left"></i> Voltar ao Dashboard</button>
      </header>

      <div className="form-section card">
        <h2>{editingEventId ? 'Editar Evento' : 'Adicionar Novo Evento'}</h2>
        <form onSubmit={handleFormSubmit} className="event-form">
          <input type="text" name="name" value={eventFormData.name} onChange={handleInputChange} placeholder="Nome do Evento" />
          <input type="date" name="date" value={eventFormData.date} onChange={handleInputChange} />
          <input type="text" name="location" value={eventFormData.location} onChange={handleInputChange} placeholder="Local do Evento" />
          <div className="form-buttons">
            <button type="submit" className="save-button">{editingEventId ? 'Atualizar Evento' : 'Salvar Evento'}</button>
            {editingEventId && (<button type="button" className="cancel-button" onClick={handleCancelEdit}>Cancelar</button>)}
          </div>
        </form>
      </div>

      <div className="list-section card">
        <h2>Eventos Cadastrados</h2>
        <div className="event-list">
          {events.length > 0 ? (
            events.map(event => (
              <div key={event.id} className="event-item">
                <div>
                  <strong>{event.name}</strong>
                  <p>{new Date(event.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} - {event.location}</p>
                </div>
                <div className="event-actions">
                    <button className="action-button view-button" title="Ver Página Pública" onClick={() => onNavigate('public_event_view', event.id)}>
                        <i className="fas fa-eye"></i>
                    </button>
                    <button className="action-button edit-button" onClick={() => handleEditClick(event)}>
                        <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button className="action-button delete-button" onClick={() => handleDeleteEvent(event.id)}>
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum evento cadastrado ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}