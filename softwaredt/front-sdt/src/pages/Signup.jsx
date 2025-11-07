import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { storage } from '../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const Signup = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsUploading(true);
    try {
      const imageFile = data.photo[0];
      const imageRef = ref(storage, `images/${imageFile.name + v4()}`);
      const uploadTask = uploadBytesResumable(imageRef, imageFile);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Upload failed:', error.code, error.message, error.customData ? error.customData.serverResponse : 'No server response');
          setIsUploading(false);
        },
        async () => {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          const formData = {
            name: data.name,
            email: data.email,
            password: data.password,
            photo: imageUrl
          };

          const response = await axios.post('http://localhost:8080/api/user/register', formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          setIsUploading(false);
          navigate('/login');
        }
      );
    } catch (error) {
      console.error('Error in signup process:', error.code, error.message, error.customData ? error.customData.serverResponse : 'No server response');
      setIsUploading(false);
    }
  };

  return (
    <div className="container">
      <div className="flex flex-col md:flex-row gap-20">
        <div className="w-full md:w-1/2 p-6">
          <h1 className="heading">Quieres agendar una cita??</h1>
          <p className="text_para">Registrate como Cliente</p>
          <p>Tienes una Cuenta? <Link to="/login" className="text-blue-600">Log in</Link> instead</p>
        </div>

        <div className="w-full md:w-1/2 p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="mb-2">Primer Nombre</label>
              <input
                type="text"
                id="name"
                className="border-2 p-2 outline-none"
                placeholder="Enter name..."
                {...register('name', { required: 'This field is required' })}
              />
              {errors.name && <span className="text-red-600">{errors.name.message}</span>}
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="border-2 p-2 outline-none"
                placeholder="Enter email..."
                {...register('email',