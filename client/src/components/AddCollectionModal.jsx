import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import CollectionValidation from '../validations/CollectionValidation';


const AddCollectionModal = ({ show, handleClose, userData, fetchCollections }) => {
  const initialCollectionData = {
    title: '',
    description: '',
  };
  const [newCollectionData, setNewCollectionData] = useState(initialCollectionData);

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setNewCollectionData(prev => ({...prev, [e.target.name]: e.target.value}))
  };

  const resetForm = () => {
    setNewCollectionData(initialCollectionData);
    setErrors({});
  };

  const handleSubmit = async () => {
    const validationErrors = CollectionValidation(newCollectionData);
    setErrors(validationErrors);

    if (
      validationErrors.title === "" &&
      validationErrors.description === ""
    ) {
      try {
        await axios.post('http://localhost:4000/collections', {
          title: newCollectionData.title,
          description: newCollectionData.description,
          account_id: userData.id,
        });
        await fetchCollections();
        resetForm();
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCloseModal = () => {
    resetForm();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Collection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter title'
              name='title'
              value={newCollectionData.title}
              onChange={handleInput}
            />
            {errors.title && <span className='text-danger'>{errors.title}</span>}

          </Form.Group>
          <Form.Group className='mb-3' controlId='formDescription'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Enter description'
              name='description'
              value={newCollectionData.description}
              onChange={handleInput}
            />
            {errors.description && <span className='text-danger'>{errors.description}</span>}

          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          Save Collection
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCollectionModal;
