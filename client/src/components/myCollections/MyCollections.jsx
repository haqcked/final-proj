import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AddCollectionModal from './AddCollectionModal';
import OpenCollectionModal from './OpenCollectionModal';

const Collections = ({ userData }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);

  const fetchCollections = async () => {
    try {
      if (userData?.id) {
        const response = await axios.get(`http://localhost:4000/collections/${userData.id}`);
        setData(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [userData]);


  const handleShowModal = () => {
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
  };

  const handleOpenCollectionModal = (collection) => {
    setSelectedCollection(collection);
    setOpenCollectionModal(true);
    console.log(collection)
  };

  const handleCloseCollectionModal = () => {
    setSelectedCollection(null);
    setOpenCollectionModal(false);
  };

  return (
    <>
      <div className='d-flex justify-content-between align-items-center pt-3 me-4'>
        <p>
          {data.length > 0
            ? `${userData.name}'s Collections: ${data.length}`
            : 'No Collections'}
        </p>
        <button className='btn btn-primary' onClick={handleShowModal}>Add New</button>
      </div>
      <div className='row d-flex justify-content-center align-items-start'>
        {data.length > 0 ? (
          data.map(item => (
            <Card key={item.id} style={{ width: '18rem', height: '22rem' }} className='my-5 m-3'>
              <Card.Img className='mt-3' variant="top" src="/folderImg.png" />
              <Card.Body>
                <Card.Title>
                  {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                  <p className='text-muted small fst-italic'>by {userData.name}</p>
                </Card.Title>
                <Card.Text className='text-muted text-truncate'>
                  {item.description}
                </Card.Text>
                <Button variant="outline-primary" onClick={() => handleOpenCollectionModal(item)}>Open</Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div className='text-center m-5'>
            <h4>Add a collection now</h4>
          </div>
        )}
      </div>
      <AddCollectionModal
        show={modalShow}
        handleClose={handleCloseModal}
        userData={userData}
        fetchCollections={fetchCollections}
      />
      {selectedCollection && (
        <OpenCollectionModal
          show={openCollectionModal}
          onHide={handleCloseCollectionModal}
          userData={userData}
          item={selectedCollection}
          fetchCollections={fetchCollections}
        />
      )}
    </>
  );
};

export default Collections;
