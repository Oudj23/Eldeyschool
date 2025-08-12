import React, { useState, useEffect } from 'react';
import Unit from '../Components/Unit/Unit';
import Lesson from '../Components/Lesson/Lesson';
import { jwtDecode } from 'jwt-decode';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
function Dashboard() {
  const [units, setUnits] = useState([]);
  const [expandedUnit, setExpandedUnit] = useState(null);
  const [lessons, setLessons] = useState({});
  const [userClasse, setUserClasse] = useState('');
    const navigate = useNavigate();
useEffect(() => {
  const token = localStorage.getItem('deyschooltoken');

  if (!token) {
    navigate('/connexion');
    return;
  }

  try {
    const decoded = jwtDecode(token);
    if (decoded.Role !== 'student') {
      navigate('/admin/student'); // Redirect admins to admin panel
    }
  } catch (error) {
    console.error('Invalid token');
    localStorage.removeItem('deyschooltoken');
    navigate('/connexion');
  }
}, [navigate]);


  const fetchUnits = async () => {
    try {
      const res = await fetch('https://eldeyschoolbackend.onrender.com/api/admin/get-units');
      const data = await res.json();
      setUnits(data.units);
    } catch (error) {
      console.error('Error fetching units:', error);
    }
  };

  const getUserFromToken = () => {
    try {
      const token = localStorage.getItem('deyschooltoken'); // or use cookies
      if (token) {
        const decoded = jwtDecode(token);
        setUserClasse(decoded.Classe); // Adjust based on your token structure
      } else {
        console.warn('Token not found');
      }
    } catch (err) {
      console.error('Failed to decode token:', err);
    }
  };

  const fetchLessonsForUnit = async (unitId) => {
    if (lessons[unitId]) {
      setExpandedUnit(expandedUnit === unitId ? null : unitId);
      return;
    }

    try {
      const res = await fetch(`https://eldeyschoolbackend.onrender.com/api/admin/get-lessons/${unitId}`);
      const data = await res.json();
      setLessons(prev => ({ ...prev, [unitId]: data.lessons }));
      setExpandedUnit(unitId);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  useEffect(() => {
    fetchUnits();
    getUserFromToken();
  }, []);

  const displayedUnits = userClasse
    ? units.filter(unit => unit.Levels?.split(',').includes(userClasse))
    : units;

  return (
    <div className='Dashboarde_Container'>

      <div className='Units-container'>
        {displayedUnits.length === 0 ? (
          <p className="no-units">No Unit</p>
        ) : (
          displayedUnits.map(unit => (
            <div key={unit._id} className="unit-with-lessons">
              <div onClick={() => fetchLessonsForUnit(unit._id)}>
                <Unit title={unit.Unitname} />
              </div>

              {expandedUnit === unit._id && (
                <div className="lessons-dropdown">
                  {lessons[unit._id]?.map(lesson => (
                    <Lesson
                      key={lesson._id}
                      title={lesson.LessonName}
                      path={lesson.Content}
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
