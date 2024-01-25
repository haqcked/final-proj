import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import Switch from 'react-switch';
import formatDate from './FormatDate';
import handleStatusToggle from './/HandleStatusToggle';
import handleDeleteAll from './HandleDeleteAll';
import handleStatusToggleAll from './HandleStatusToggleAll';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLockOpen, faLock, faTrashCan } from "@fortawesome/free-solid-svg-icons"


function AdminDashboard() {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVERURL}/accounts`)
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])

  const handleRowSelect = (id) => {
    const isSelected = selectedRows.includes(id);
    setSelectedRows((prev) => {
      const updatedState = isSelected
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id];
      console.log(updatedState);
      return updatedState;
    });
  };

  const isSelected = (id) => {
    return selectedRows.includes(id);
  };

  const selectAllRows = () => {
    setSelectedRows((prev) => {
      if (prev.length === data.length) {
        return [];
      } else {
        const allIds = data.map((userdata) => userdata.id);
        console.log([...prev, ...allIds]);
        return [...prev, ...allIds];
      }
    });
  };

  return (
    <div className='container'>
      <div className='d-flex vh-100 justify-content-center align-items-start pt-5'>
        <div className='w-100 bg-white rounded p-3 shadow p-3 mb-5 bg-body rounded'>
          <h2 className='text-center mt-4'>User Accounts</h2>
          <hr className="mt-5 mx-5" />
          <div className='p-4'>
            <button className='btn btn-danger mx-2' onClick={ () => handleDeleteAll(selectedRows) }> <FontAwesomeIcon icon={faTrashCan} /></button>
            <button className='btn btn-primary' onClick={ () => handleStatusToggleAll(selectedRows, data) }><FontAwesomeIcon icon={faLock} /> / <FontAwesomeIcon icon={faLockOpen} /></button>
          </div>
          <table className='table'>
          <thead style={{ position: 'sticky', top: '0', zIndex: '1', background: 'white' }}>
              <tr>
                <th>
                  <input className="form-check-input" type="checkbox" onChange={selectAllRows} />
              </th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Last Login</th>
                <th>Created</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((userdata, index) => {
                return <tr key={index}>
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={() => handleRowSelect(userdata.id)}
                      checked={isSelected(userdata.id)}
                    />
                  </td>
                  <td className="text-left">{userdata.id}</td>
                  <td className="text-left">{userdata.name.charAt(0).toUpperCase() + userdata.name.slice(1)}</td>
                  <td className="text-left">{userdata.email}</td>
                  <td className="text-left">{formatDate(userdata.login, true)}</td>
                  <td className="text-left">{formatDate(userdata.created_at)}</td>
                  <td className="d-flex align-items-center" style={{ minHeight: '55px' }}>
                    <Switch
                      onChange={() => handleStatusToggle(userdata.id, userdata.status)}
                      checked={userdata.status === true}
                      offColor='#DC3545'
                      onColor='#28A745'
                    />
                    <span style={{ marginLeft: '5px' }}>
                      {userdata.status === true ? 'Active' : userdata.status === false ? 'Blocked' : ''}
                    </span>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;
