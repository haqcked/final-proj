import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import EditCollectionModal from './EditCollectionModal';
import Swal from 'sweetalert2';


function OpenCollectionModal({ show, onHide, fetchCollections, item}) {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:4000/collections/${item.id}`);
        onHide();
        fetchCollections();
        Swal.fire('Deleted!', 'Your collection has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting collection:', error);
      Swal.fire('Error!', 'Something went wrong while deleting the collection.', 'error');
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSaveEdit = () => {
    setShowEditModal(false);
    onHide();
    fetchCollections();
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
        <Button variant="outline-primary" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="outline-danger" onClick={handleDelete}>
          Delete
        </Button>
        {/* <Button onClick={onHide}>Close</Button> */}
      </Modal.Footer>
      {showEditModal && (
          <EditCollectionModal
            show={showEditModal}
            onHide={handleCloseEditModal}
            fetchCollections={fetchCollections}
            item={item}
            onSave={handleSaveEdit}
          />
        )}
    </Modal>
  );
}

export default OpenCollectionModal;
