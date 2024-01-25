import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AddCollectionModal from './AddCollectionModal';
import OpenCollectionModal from './OpenCollectionModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolderPlus, faEye } from "@fortawesome/free-solid-svg-icons"


const Collections = ({ userData }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);

  const fetchCollections = async () => {
    try {
      if (userData?.id) {
        const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/collections/${userData.id}`);
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
        <h5>
          {data.length > 0
            ? `${userData.name.charAt(0).toUpperCase() + userData.name.slice(1)}'s Collections: ${data.length}`
            : 'No Collections'}
        </h5>
        <button
          className='btn btn-outline-primary'
          onClick={handleShowModal}
          title='Add a new collection'>
          <FontAwesomeIcon icon={faFolderPlus} />
        </button>
      </div>
      <div className='row d-flex justify-content-center align-items-start'>
        {data.length > 0 ? (
          data.map(item => (
            <Card key={item.id} style={{ width: '16rem', maxHeight: '22rem', minHeight: '22rem' }} className='mt-5 m-3 shadow'>
              <Card.Img className='mt-3' variant="top" src="/folderImg.png" />
              <Card.Body className='px-3 pb-0'>
                <Card.Title>
                  {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                  <p className='text-muted fs-6 fst-italic mb-1'>by {userData.name}</p>
                </Card.Title>
                <Card.Text>
                  <div className='text-muted text-wrap' style={{ maxHeight: '3.2rem', overflow: 'hidden' }}>
                    Description: {item.description}
                  </div>
                </Card.Text>
              </Card.Body>
              <Card.Body className='d-flex justify-content-end align-items-center p-0'>
                <Button
                  variant="outline-primary"
                  onClick={() => handleOpenCollectionModal(item)}
                  title='View collection'>
                  <FontAwesomeIcon icon={faEye} />
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div className='text-center m-5' >
            <h4 variant='link' className='text-primary' onClick={handleShowModal}>Add a collection now</h4>
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
