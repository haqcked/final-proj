import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';


function OpenCollectionModal({ show, onHide, fetchCollections, item}) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/collections/${item.id}`);
      onHide();
      fetchCollections();
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {item.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{item.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OpenCollectionModal;
