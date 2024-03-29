import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ShowCollectionModal({ show, onHide, item }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
          <h6 className='text-muted fs-6 fst-italic'>by User {item.account_id || 'Unknown'}</h6>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Description: {item.description}</h6>
        <ol>
          {item.custom_string1_name && (
            <li>{item.custom_string1_name.charAt(0).toUpperCase() + item.custom_string1_name.slice(1)}</li>
          )}
          {item.custom_string2_name && (
            <li>{item.custom_string2_name.charAt(0).toUpperCase() + item.custom_string2_name.slice(1)}</li>
          )}
          {item.custom_string3_name && (
            <li>{item.custom_string3_name.charAt(0).toUpperCase() + item.custom_string3_name.slice(1)}</li>
          )}
        </ol>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ShowCollectionModal;
