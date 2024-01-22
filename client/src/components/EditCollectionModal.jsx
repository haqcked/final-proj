import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Swal from 'sweetalert2';


function EditCollectionModal({ show, onHide, fetchCollections, item, onSave }) {
  const [editedItem, setEditedItem] = useState({ ...item });

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:4000/collections/${editedItem.id}`, editedItem);
      fetchCollections();
      onSave();
      Swal.fire('Updated!', 'Your collection has been updated.', 'success');
    } catch (error) {
      console.error('Error updating collection:', error);
      Swal.fire('Error!', 'Something went wrong while updating the collection.', 'error');
    } finally {
      onHide();
    }
  };

  const handleInputChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
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
          Edit Collection
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter title'
              name='title'
              value={editedItem.title}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formDescription'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Enter description'
              name='description'
              value={editedItem.description}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSaveEdit}>
          Save
        </Button>
        <Button variant="outline-secondary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditCollectionModal;
