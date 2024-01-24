import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ShowCollectionModal from './ShowCollectionModal';

const AllCollections = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('http://localhost:4000/collections');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCollections();
  }, []);

  const handleShowCollectionModal = (collection) => {
    setSelectedCollection(collection);
    setShowModal(true);
    console.log(collection)
  };

  const handleCloseCollectionModal = () => {
    setSelectedCollection(null);
    setShowModal(false);
  };

  return (
    <div className='row d-flex justify-content-center align-items-start'>
      {data.length > 0 ? (
        data.map((item) => (
          <Card key={item.id} style={{ width: '16rem', height: '21rem' }} className='mt-5 m-3 shadow'>
            <Card.Img className='mt-3' variant="top" src="/folderImg.png" />
            <Card.Body style={{ maxHeight: '14rem', overflow: 'hidden' }}>
              <Card.Title>
                {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                <p className='text-muted fs-6 fst-italic'>by User {item.account_id || 'Unknown'}</p>
              </Card.Title>
              <Card.Text className='text-muted text-truncate' style={{ maxHeight: '60px', overflow: 'hidden' }}>
                {item.description}
              </Card.Text>
              <Button variant="outline-primary" onClick={() => handleShowCollectionModal(item)}>
                Open
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div className='text-center m-5'>
          <h4>No collections available</h4>
        </div>
      )}
      {selectedCollection && (
        <ShowCollectionModal
          show={showModal}
          onHide={handleCloseCollectionModal}
          item={selectedCollection}
          // userData={userData}
        />
      )}
    </div>
  );
};

export default AllCollections;
