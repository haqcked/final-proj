import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import EditCollectionModal from './EditCollectionModal';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"


function OpenCollectionModal({ show, onHide, fetchCollections, item, userData}) {
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
        Swal.fire({
          title: 'Deleted!',
          text: 'Your collection has been deleted.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
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
            <h3>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</h3>
            <p className='text-muted fs-6 fst-italic'>by {userData.name}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Description: {item.description}</p>
        {/* <hr className="mb-4" /> */}
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
        <Button variant="outline-primary" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="outline-danger" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrashCan} />
        </Button>
        {/* <Button variant="outline-danger" onClick={handleDelete}>
          Delete
        </Button> */}
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
