import React from 'react';
import './Lesson.css';
import LessonIcon from '../../assets/Admins_Icons/LessonIcon.png';
import { Link } from 'react-router-dom';

function Lesson({ title, path }) {
    return (
        <div className='Lesson'>
            <Link to={path} target="_blank" rel="noopener noreferrer" className="lesson-link">
            <img src={LessonIcon} alt="رمز الدرس" className='LessonIcon' />
                <h1 className='lesson_title'>{title}</h1>
                
            </Link>
        </div>
    );
}

export default Lesson;
