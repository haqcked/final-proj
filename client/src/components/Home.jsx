import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Collections from './Collections';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/')
      .then(res => setUserData(findAccountByEmail(currentUser.email, res.data)))
      .catch(err => console.log(err));
  }, [currentUser.email]);

  const findAccountByEmail = (email, data) => {
    return data.find(item => item.email === email);
  };

  return (
    <>
      <div className='text-center m-4'>Welcome to your collection</div>
      <div className='container bg-light rounded-4'>
        {/* <div>{userData ? userData.name : 'Loading...'}</div> */}
        <Collections userData={userData} />
      </div>
    </>
  );
};

export default Home;
