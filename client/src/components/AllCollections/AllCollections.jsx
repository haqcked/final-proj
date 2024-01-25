import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ShowCollectionModal from './ShowCollectionModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import handleDelete from './HandleDelete';


const AllCollections = ({userData}) => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const fetchCollections = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/collections/`);
      setData(response.data);
    }
    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
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
          <Card key={item.id} style={{ width: '16rem', maxHeight: '22rem', minHeight: '22rem' }} className='mt-5 m-3 shadow'>
            <Card.Img className='mt-3' variant="top" src="/folderImg.png" />
            <Card.Body className='px-3 pb-0'>
              <Card.Title>
                {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                <p className='text-muted fs-6 fst-italic mb-1'>by User {item.account_id || 'Unknown'}</p>
              </Card.Title>
              <Card.Text>
                  <div className='text-muted text-wrap' style={{ maxHeight: '3.2rem', overflow: 'hidden' }}>
                    Description: {item.description}
                  </div>
                </Card.Text>
            </Card.Body>
            <Card.Body className='d-flex justify-content-end align-items-center p-0'>
              <Button
                variant="outline-primary me-1"
                onClick={() => handleShowCollectionModal(item)}
                title='View collection'>
                <FontAwesomeIcon icon={faEye} />
              </Button>
              {(currentUser && currentUser.email === 'admin@admin.com') || (userData && userData.admin) ? (
                <Button variant="outline-danger" onClick={() => handleDelete({ item, fetchCollections })}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </Button>
              ) : null}
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
          fetchCollections={fetchCollections}
        />
      )}
    </div>
  );
};

export default AllCollections;
