import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Unit.css';
import UnitImg from '../../assets/Admins_Icons/Chapter.png';
import { jwtDecode } from 'jwt-decode';

function Unit({ title, onEdit, onDelete }) {
  const token = localStorage.getItem('deyschooltoken');
  let isAdmin = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      isAdmin = decodedToken.Role === 'admin'; 
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  return (
    <div className='Unit'>
      <div className="unit-header">
        {isAdmin ? (
          <div className="unit-actions">
            <EditIcon onClick={onEdit} className="action-icon edit-icon" />
            <DeleteIcon onClick={onDelete} className="action-icon delete-icon" />
          </div>
        ) : (
          <div className='unit-actions'></div>
        )}

        <div className='unit-text'>
          <h1 className='Unit-title'>{title}</h1>
          <img src={UnitImg} className='UnitImg' alt="Unit" />
        </div>
      </div>
    </div>
  );
}

export default Unit;
