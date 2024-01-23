// Home.js
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import MyCollections from './myCollections/MyCollections';
import AllCollections from './AllCollections/AllCollections';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [showAllCollections, setShowAllCollections] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedState = localStorage.getItem('breadcrumbActiveState');
    setShowAllCollections(storedState === 'allCollections');

    axios.get('http://localhost:4000/', { params: { email: currentUser?.email } })
      .then(res => setUserData(res.data[0]))
      .catch(err => console.log(err));
  }, [currentUser]);

  const handleShowAllCollections = () => {
    setShowAllCollections(true);
    localStorage.setItem('breadcrumbActiveState', 'allCollections');
  };

  const handleShowMyCollections = () => {
    if (!currentUser) {
      navigate('/login');
      return null;
    }

    setShowAllCollections(false);
    localStorage.setItem('breadcrumbActiveState', 'myCollections');
  };

  return (
    <div>
      <div className='container my-3'>
        <Breadcrumb>
          <Breadcrumb.Item onClick={handleShowAllCollections} active={showAllCollections}>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={handleShowMyCollections} active={!showAllCollections}>
            My Collections
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className='container bg-light rounded-4'>
          {showAllCollections ? (
            <AllCollections />
          ) : (
            <MyCollections userData={userData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
