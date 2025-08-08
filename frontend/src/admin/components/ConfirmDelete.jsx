import React, { useEffect } from 'react';
import '../styles/ConfirmDelete.css';

const ConfirmDelete = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  itemType = "item", 
  itemName = "", 
  confirmText = "Delete",
  cancelText = "Cancel",
  title = "Confirm Delete",
  message = null,
  isLoading = false
}) => {
  const defaultMessage = itemName 
    ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
    : `Are you sure you want to delete this ${itemType}? This action cannot be undone.`;
  
  const displayMessage = message || defaultMessage;

  const handleConfirm = () => {
    if (!isLoading) {
      onConfirm();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && !isLoading) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLoading, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={!isLoading ? onClose : undefined}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
        </div>
        <p>{displayMessage}</p>
        <div className="modal-actions">
          <button 
            onClick={handleConfirm} 
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : confirmText}
          </button>
          <button 
            onClick={onClose} 
            className="btn-secondary"
            disabled={isLoading}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
