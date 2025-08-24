import React, { useState, useEffect } from 'react';
import './Add_Cours.css';
import Unit from '../../Components/Unit/Unit';
import Lesson from '../../Components/Lesson/Lesson'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
function Add_Cours() {
  const [addUnitOpen, setAddUnitOpen] = useState(false);
  const [addLessonOpen, setAddLessonOpen] = useState(false);
  const [unitName, setUnitName] = useState('');
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [expandedUnit, setExpandedUnit] = useState(null);
  const [lessons, setLessons] = useState({});
  const [lessonName, setLessonName] = useState('');
  const [lessonContent, setLessonContent] = useState(null); // can be file or string
  const [lessonType, setLessonType] = useState(''); // 'pdf' or 'youtube'
  const [selectedUnitId, setSelectedUnitId] = useState('');
  const [lessonYearFilter, setLessonYearFilter] = useState('');
  const [editUnitModal, setEditUnitModal] = useState(false);
  const [unitBeingEdited, setUnitBeingEdited] = useState(null); // holds { id, name, levels }
  const [editUnitName, setEditUnitName] = useState('');
  const [editUnitLevels, setEditUnitLevels] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('deyschooltoken');

    if (!token) {
      navigate('/connexion');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.Role !== 'admin') {
        navigate('/user/dashboard'); // Redirect students to their dashboard
      }
    } catch (error) {
      console.error('Invalid token');
      localStorage.removeItem('deyschooltoken');
      navigate('/connexion');
    }
  }, [navigate]);


  const toggleAddUnit = () => setAddUnitOpen(prev => !prev);
  const toggleAddLesson = () => setAddLessonOpen(prev => !prev);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedLevels(prev =>
      checked ? [...prev, value] : prev.filter(level => level !== value)
    );
  };

  const fetchUnits = async () => {
    try {
      const res = await fetch('https://eldeyschoolbackend.onrender.com/api/admin/get-units');
      const data = await res.json();
      setUnits(data.units);
    } catch (error) {
      console.error('Error fetching units:', error);
    }
  };

  const handleSubmitUnit = async () => {
    const trimmedName = unitName.trim();
    if (!trimmedName || selectedLevels.length === 0) {
      alert('Please enter a unit name and select at least one level.');
      return;
    }

    try {
      const res = await fetch('https://eldeyschoolbackend.onrender.com/api/admin/create-unit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Unitname: trimmedName, selectedLevels })
      });

      const data = await res.json();
      if (!res.ok) {
        console.error('Server responded with error:', data);
        alert(data.message || 'Failed to add unit');
        return;
      }

      setUnitName('');
      setSelectedLevels([]);
      setAddUnitOpen(false);
      fetchUnits();
    } catch (error) {
      console.error('Error submitting unit:', error);
    }
  };
  const handleDeleteUnit = async (unitId) => {
    if (!window.confirm('Are you sure you want to delete this unit?')) return;

    try {
      const response = await fetch(`https://eldeyschoolbackend.onrender.com/api/admin/units/${unitId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        fetchUnits(); // refresh unit list
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error('Error deleting unit:', err);
    }
  };

  const handleEditUnit = (unitId, oldName, oldLevels) => {
    setEditUnitModal(true);
    setUnitBeingEdited({ id: unitId });
    setEditUnitName(oldName);
    setEditUnitLevels(oldLevels);
  };
  const submitEditUnit = async () => {
    if (!editUnitName.trim() || editUnitLevels.length === 0) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`https://eldeyschoolbackend.onrender.com/api/admin/units/${unitBeingEdited.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Unitname: editUnitName.trim(),
          selectedLevels: editUnitLevels
        })
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        fetchUnits();
        setEditUnitModal(false);
      } else {
        console.error(data.message);
        alert('Failed to update unit.');
      }
    } catch (err) {
      console.error('Error updating unit:', err);
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
      console.log("Lessons fetched for unit:", unitId, data); // ✅ Add this

      setLessons(prev => ({ ...prev, [unitId]: data.lessons }));
      setExpandedUnit(unitId);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };


  const handleLessonSubmit = async (e) => {
    e.preventDefault();

    if (!lessonName || !lessonType || !selectedUnitId) {
      alert('Fill all lesson fields.');
      return;
    }

    const formData = new FormData();
    formData.append('Name', lessonName);
    formData.append('UnitId', selectedUnitId);
    formData.append('type', lessonType);

    if (lessonType === 'pdf' && lessonContent instanceof File) {
      formData.append('content', lessonContent); // PDF file
    } else if (lessonType === 'youtube' && typeof lessonContent === 'string') {
      formData.append('content', lessonContent); // YouTube link
    } else {
      alert('Invalid content for selected lesson type.');
      return;
    }

    try {
      const res = await fetch('https://eldeyschoolbackend.onrender.com/api/admin/create-lesson', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error('Server error');
      const data = await res.json();
      console.log(data);

      // Reset fields after successful submission
      setLessonName('');
      setLessonContent(lessonType === 'pdf' ? null : '');;
      setLessonType('');
      setSelectedUnitId('');
      setAddLessonOpen(false);
      fetchLessonsForUnit(selectedUnitId);
    } catch (error) {
      console.error('Error adding lesson:', error);
      alert('Failed to add lesson. Check server or inputs.');
    }
  };


  useEffect(() => {
    fetchUnits();
  }, []);

  const displayedUnits = selectedYear
    ? units.filter(unit => unit.Levels?.split(',').includes(selectedYear))
    : units;

  return (
    <div className='Add_Course_Container'>
      {editUnitModal && (
        <div className="modal-overlay" style={{ zIndex: 2 }}>
          <div className="addunitform animated-form">
            <h2>Edit Unit</h2>
            <input
              type="text"
              placeholder="Unit title"
              className="form-input"
              value={editUnitName}
              onChange={(e) => setEditUnitName(e.target.value)}
            />

            <div className="checkbox-group">
              {["1AS", "2S", "2M", "2MT", "3S", "3M", "3MT"].map((level) => (
                <label key={level}>
                  <input
                    type="checkbox"
                    value={level}
                    checked={editUnitLevels.includes(level)}
                    onChange={(e) => {
                      const { value, checked } = e.target;
                      setEditUnitLevels((prev) =>
                        checked ? [...prev, value] : prev.filter((lvl) => lvl !== value)
                      );
                    }}
                  />
                  {level}
                </label>
              ))}
            </div>

            <div className="form-buttons">
              <button className="submit-button" onClick={submitEditUnit}>
                Save
              </button>
              <button className="cancel-button" onClick={() => setEditUnitModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Unit Modal */}
      {addUnitOpen && (
        <div className="modal-overlay">
          <div className="addunitform animated-form">
            <h2>Add New Unit</h2>
            <input
              type="text"
              name="Unitname"
              placeholder="Unit title"
              className="form-input"
              value={unitName}
              onChange={e => setUnitName(e.target.value)}
            />
            <div className="checkbox-group">
              {["1AS", "2S", "2M", "2MT", "3S", "3M", "3MT"].map(level => (
                <label key={level}>
                  <input
                    type="checkbox"
                    value={level}
                    checked={selectedLevels.includes(level)}
                    onChange={handleCheckboxChange}
                  /> {level}
                </label>
              ))}
            </div>
            <div className="form-buttons">
              <button className="submit-button" onClick={handleSubmitUnit}>Submit</button>
              <button className="cancel-button" onClick={toggleAddUnit}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Lesson Modal */}
      {addLessonOpen && (
        <div className="modal-overlay">
          <div className="addunitform animated-form">
            <h2>Add Lesson</h2>
            <form onSubmit={handleLessonSubmit}>
              <input
                type="text"
                name="Name"
                placeholder="Lesson name"
                className="form-input"
                value={lessonName}
                onChange={e => setLessonName(e.target.value)}
              />

              <select
                className="form-input"
                value={lessonType}
                onChange={e => setLessonType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="pdf">PDF</option>
                <option value="youtube">YouTube Video</option>
              </select>

              {lessonType === 'pdf' ? (
                <input
                  type="file"
                  accept=".pdf"
                  className="form-input"
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) setLessonContent(file);
                  }}
                />
              ) : (
                <input
                  type="text"
                  placeholder="YouTube video link"
                  className="form-input"
                  value={typeof lessonContent === 'string' ? lessonContent : ''}
                  onChange={e => setLessonContent(e.target.value)}
                />
              )}
              <select
                className="form-input"
                value={lessonYearFilter}
                onChange={(e) => {
                  setLessonYearFilter(e.target.value);
                  setSelectedUnitId('');
                }}
              >
                <option value="">Select Class</option>
                <option value="1AS">1AS</option>
                <option value="2S">2S</option>
                <option value="2M">2M</option>
                <option value="2MT">2MT</option>
                <option value="3S">3S</option>
                <option value="3M">3M</option>
                <option value="3MT">3MT</option>
              </select>

              <select
                className="form-input"
                value={selectedUnitId}
                onChange={(e) => setSelectedUnitId(e.target.value)}
                disabled={!lessonYearFilter}
              >
                <option value="">{lessonYearFilter ? "Select Unit" : "Choose Class First"}</option>
                {units
                  .filter(unit => unit.Levels?.split(',').includes(lessonYearFilter))
                  .map(unit => (
                    <option key={unit._id} value={unit._id}>
                      {unit.Unitname}
                    </option>
                  ))}
              </select>


              <div className="form-buttons">
                <button className="submit-button" type="submit">Add</button>
                <button className="cancel-button" type="button" onClick={toggleAddLesson}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Top Controls */}
      <div className='Actions-btns-container'>
        <div className='left-buttons'>
          <button className='text-action' onClick={toggleAddUnit}>
            {addUnitOpen ? 'Close Unit Form ✖' : 'Add Unit +'}
          </button>
          <button className='text-action' onClick={toggleAddLesson}>
            {addLessonOpen ? 'Close Lesson Form ✖' : 'Add Lesson +'}
          </button>
        </div>

        <select
          className='select'
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">All</option>
          <option value="1AS">1AS</option>
          <option value="2S">2S</option>
          <option value="2M">2M</option>
          <option value="2MT">2MT</option>
          <option value="3S">3S</option>
          <option value="3M">3M</option>
          <option value="3MT">3MT</option>
        </select>
      </div>

      {/* Units and Lessons */}
      <div className='Units-container'>
        {displayedUnits.length === 0 ? (
          <p className="no-units">No Unit</p>
        ) : (
          displayedUnits.map(unit => (
            <div key={unit._id} className="unit-with-lessons">

              <div onClick={() => fetchLessonsForUnit(unit._id)}>
                <Unit title={unit.Unitname} onEdit={() => handleEditUnit(unit._id, unit.Unitname, unit.Levels.split(','))} onDelete={() => handleDeleteUnit(unit._id)} />
              </div>

              {expandedUnit === unit._id && (
                <div className="lessons-dropdown">
                  {lessons[unit._id].map(lesson => (
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

export default Add_Cours;
