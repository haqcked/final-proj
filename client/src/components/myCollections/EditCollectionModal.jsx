import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

function EditCollectionModal({ show, onHide, fetchCollections, item, onSave }) {
  const [editedItem, setEditedItem] = useState({ ...item });

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/collections/${editedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // credentials: 'include',
        body: JSON.stringify(editedItem),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await response.json();
      fetchCollections();
      onSave();
      Swal.fire({
        title: 'Updated!',
        text: 'Your collection has been updated.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
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

  const handleCheckboxChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.checked });
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

          {/* Custom String Fields */}
          <Form.Group className="mb-3" controlId="customString1">
            <Form.Check
              type="checkbox"
              label="Custom String 1"
              name="custom_string1_state"
              checked={editedItem.custom_string1_state}
              onChange={handleCheckboxChange}
            />
            {editedItem.custom_string1_state && (
              <Form.Control
                type="text"
                placeholder="Enter custom string 1 name"
                name="custom_string1_name"
                value={editedItem.custom_string1_name}
                onChange={handleInputChange}
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="customString2">
            <Form.Check
              type="checkbox"
              label="Custom String 2"
              name="custom_string2_state"
              checked={editedItem.custom_string2_state}
              onChange={handleCheckboxChange}
            />
            {editedItem.custom_string2_state && (
              <Form.Control
                type="text"
                placeholder="Enter custom string 2 name"
                name="custom_string2_name"
                value={editedItem.custom_string2_name}
                onChange={handleInputChange}
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="customString3">
            <Form.Check
              type="checkbox"
              label="Custom String 3"
              name="custom_string3_state"
              checked={editedItem.custom_string3_state}
              onChange={handleCheckboxChange}
            />
            {editedItem.custom_string3_state && (
              <Form.Control
                type="text"
                placeholder="Enter custom string 3 name"
                name="custom_string3_name"
                value={editedItem.custom_string3_name}
                onChange={handleInputChange}
              />
            )}
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
