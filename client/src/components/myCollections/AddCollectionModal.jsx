import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CollectionValidation from '../../validations/CollectionValidation';
import Swal from 'sweetalert2';

const AddCollectionModal = ({ show, handleClose, userData, fetchCollections }) => {
  const initialCollectionData = {
    title: '',
    description: '',
    custom_string1_state: false,
    custom_string1_name: '',
    custom_string2_state: false,
    custom_string2_name: '',
    custom_string3_state: false,
    custom_string3_name: '',
  };

  const [newCollectionData, setNewCollectionData] = useState(initialCollectionData);
  const [errors, setErrors] = useState({});
  const [characterCount, setCharacterCount] = useState(0);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setNewCollectionData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setNewCollectionData((prev) => ({ ...prev, [name]: value }));
    }

    if (name === 'description') {
      setCharacterCount(value.length);
    }
  };

  const resetForm = () => {
    setNewCollectionData(initialCollectionData);
    setErrors({});
    setCharacterCount(0);
  };

  const handleSubmit = async () => {
    const validationErrors = CollectionValidation(newCollectionData);
    setErrors(validationErrors);

    if (validationErrors.title === '' && validationErrors.description === '') {
      console.log(newCollectionData);
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/collections`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newCollectionData.title,
            description: newCollectionData.description,
            account_id: userData.id,
            custom_string1_state: newCollectionData.custom_string1_state,
            custom_string1_name: newCollectionData.custom_string1_name,
            custom_string2_state: newCollectionData.custom_string2_state,
            custom_string2_name: newCollectionData.custom_string2_name,
            custom_string3_state: newCollectionData.custom_string3_state,
            custom_string3_name: newCollectionData.custom_string3_name,
          }),
          credentials: 'include',
        });

        if (response.ok) {
          await fetchCollections();
          resetForm();
          handleClose();
          Swal.fire({
            icon: 'success',
            title: 'New collection added successful!',
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          console.error('Failed to add collection:', response.statusText);
        }
      } catch (error) {
        console.error(error);
        Swal.fire('Error!', 'Something went wrong while adding the collection.', 'error');
      }
    }
  };

  const handleCloseModal = () => {
    resetForm();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseModal} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Collection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              value={newCollectionData.title}
              onChange={handleInput}
            />
            {errors.title && <span className="text-danger">{errors.title}</span>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter description"
              name="description"
              value={newCollectionData.description}
              onChange={handleInput}
            />
            <div className="text-muted fw-lighter">{characterCount} / 255</div>
            {errors.description && <span className="text-danger">{errors.description}</span>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="customString1">
            <Form.Check
              type="checkbox"
              label="Add an item"
              name="custom_string1_state"
              checked={newCollectionData.custom_string1_state}
              onChange={handleInput}
            />

            {newCollectionData.custom_string1_state && (
              <Form.Control
                type="text"
                placeholder="Enter item"
                name="custom_string1_name"
                value={newCollectionData.custom_string1_name}
                onChange={handleInput}
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="customString2">
            <Form.Check
              type="checkbox"
              label="Add another item"
              name="custom_string2_state"
              checked={newCollectionData.custom_string2_state}
              onChange={handleInput}
            />

            {newCollectionData.custom_string2_state && (
              <Form.Control
                type="text"
                placeholder="Enter item"
                name="custom_string2_name"
                value={newCollectionData.custom_string2_name}
                onChange={handleInput}
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="customString3">
            <Form.Check
              type="checkbox"
              label="Add another item"
              name="custom_string3_state"
              checked={newCollectionData.custom_string3_state}
              onChange={handleInput}
            />

            {newCollectionData.custom_string3_state && (
              <Form.Control
                type="text"
                placeholder="Enter item"
                name="custom_string3_name"
                value={newCollectionData.custom_string3_name}
                onChange={handleInput}
              />
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={handleSubmit}>
          Save Collection
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCollectionModal;
