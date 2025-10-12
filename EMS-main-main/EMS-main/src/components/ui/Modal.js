import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-window" role="dialog" aria-modal="true">
        <div className="modal-header">
        
          <button className="btn-close" onClick={onClose} >
          
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
