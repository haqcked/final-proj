import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import MyCollections from './myCollections/MyCollections';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import Collections from './homeCollections/Collections';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('collections');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/?email=${currentUser?.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data[0]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const storedState = localStorage.getItem('activeTab');
    setActiveTab(storedState || 'collections');
    fetchData();
     // eslint-disable-next-line
  }, [currentUser]);

  const handleTabSelect = (key) => {
    if (key === 'myCollections' && !currentUser) {
      navigate('/login');
    } else {
      setActiveTab(key);
      localStorage.setItem('activeTab', key);
    }
  };

  return (
    <div className='container my-3'>
      <Tabs
        id="collection-tabs"
        activeKey={activeTab}
        onSelect={handleTabSelect}
        className="mb-3"
      >
        <Tab eventKey="collections" title="All Collections">
          <Collections userData={userData} />
        </Tab>
        <Tab eventKey="myCollections" title="My Collections">
          {currentUser && <MyCollections userData={userData} />}
        </Tab>
        {userData && userData.admin && (
          <Tab eventKey="adminDashboard" title="Admin Dashboard">
            <AdminDashboard />
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default Home;
