import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Collections = ({ userData }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/collections')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const filteredCollections = loading ? [] : data.filter(item => item.account_id === userData?.id);

  return (
    <div className='row d-flex justify-content-center align-items-start'>
      {filteredCollections.length > 0 ? (
        filteredCollections.map(item => (
          <Card key={item.id} style={{ width: '18rem', height: '20rem' }} className='my-5 m-3'>
            <Card.Img className='mt-3' variant="top" src="/folderImg.png" />
            <Card.Body>
              <Card.Title>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</Card.Title>
              <Card.Text className='text-muted text-truncate'>
                {item.description}
              </Card.Text>
              <Button variant="primary">Open</Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div className='text-center m-5'>
          <h4>Add a collection now</h4>
        </div>
      )}
    </div>
  );
};

export default Collections;
