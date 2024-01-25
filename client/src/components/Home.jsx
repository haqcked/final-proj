import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import MyCollections from './myCollections/MyCollections';
import AllCollections from './allCollections/AllCollections';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';


const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('allCollections');
  const navigate = useNavigate();

  useEffect(() => {
    const storedState = localStorage.getItem('activeTab');
    setActiveTab(storedState || 'allCollections');

    axios.get(`${process.env.REACT_APP_SERVERURL}/`, { params: { email: currentUser?.email } })
      .then(res => setUserData(res.data[0]))
      .catch(err => console.log(err));
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
          <Tab eventKey="allCollections" title="All Collections">
            <AllCollections userData={userData} />
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
