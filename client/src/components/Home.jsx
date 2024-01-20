import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Collections from './Collections';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/', { params: { email: currentUser.email } })
      .then(res => setUserData(res.data[0]))
      .catch(err => console.log(err));
  }, [currentUser.email]);

  return (
    <>
      <div className='text-center m-4'>Welcome to your collection</div>
      <div className='container bg-light rounded-4'>
        <Collections userData={userData} />
      </div>
    </>
  );
};

export default Home;
