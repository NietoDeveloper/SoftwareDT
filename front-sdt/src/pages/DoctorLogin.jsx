import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/UserContext'; 

const DoctorIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
        <path d="M10 18h4"></path>
        <path d="M12 22a2 2 0 0 0 2-2v-3h-4v3a2 2 0 0 0 2 2z"></path>
        <path d="M8 15v-1a4 4 0 0 1 8 0v1"></path>
    </svg>
);

const Doctorlogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
   
    };

            </div>
        </div>
    );
};

export default Doctorlogin;